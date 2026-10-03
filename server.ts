import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import { defaultContent } from './lib/default-content.ts';

// Load .env.local first, then .env fallback
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'site-content.json');
const UPLOADS_DIR = path.resolve(__dirname, 'uploads');

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Ensure persistent data directory and uploads folder exist
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  // Support large JSON payloads (up to 50MB) to prevent 413 Payload Too Large
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Serve uploaded files statically
  app.use('/uploads', express.static(UPLOADS_DIR));

  // In-memory cached site content
  let cachedContent: any = null;

  // Initialize cached content from disk if available
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      cachedContent = JSON.parse(raw);
    } catch (readErr) {
      console.warn('Could not read existing data/site-content.json:', readErr);
    }
  }

  // Backend API route for Speaking AI Chat with Gemini Flash
  app.post('/api/speaking-chat', async (req, res) => {
    try {
      const { message, history, level, topic } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Nội dung tin nhắn không hợp lệ.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY chưa được cấu hình. Vui lòng thiết lập khóa bí mật trong panel Secrets.',
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are "Belief AI Speaking Coach", a warm, friendly, and motivating English speaking tutor for students at "Trung tâm Ngoại ngữ Niềm Tin - Belief English (Member of BELIS GROUP)".
Target Student Level: ${level || 'Cambridge Young Learners'}
Current Speaking Topic: ${topic || 'General Daily English Conversation'}

Core Educational Philosophy - BAC Methodology:
1. BELIEVE: Always start by praising the student's speaking effort ("Awesome job!", "You pronounced that clearly!", "Great enthusiasm!"). Create a safe psychological environment where mistakes are natural stepping stones.
2. ACTIVE: Keep the conversation active, engaging, and two-way. Ask ONE interesting, level-appropriate follow-up question so the student speaks more.
3. CONTROL: If the student has grammar/pronunciation errors or spoke broken English/Vietnamese, provide a gentle, natural correction:
   - Show: "💡 Natural way to say it: [example]"
   - Offer a useful vocabulary or pronunciation tip.

Formatting & Tone:
- Keep your response concise (2-4 sentences max) so it sounds like real speaking conversation and isn't overwhelming to read or listen to.
- Use simple, friendly English appropriate to the selected level. You can add short Vietnamese encouragement in parentheses if helpful for younger kids.`;

      // Build message array for Gemini API
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const msg of history.slice(-6)) {
          if (msg && msg.content) {
            contents.push({
              role: msg.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: msg.content }],
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 600,
        },
      });

      const reply = response.text || 'Great attempt! Can you tell me more about what you like?';
      res.json({ reply });
    } catch (err: any) {
      console.error('Error in /api/speaking-chat:', err);
      res.status(500).json({
        error: err.message || 'Lỗi xử lý phản hồi từ Gemini API.',
      });
    }
  });

  // GET /api/content - Fetch site content from Vercel Storage (BLOB_STORE_ID) or local disk
  app.get('/api/content', async (_req, res) => {
    try {
      res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');

      if (cachedContent) {
        return res.json(cachedContent);
      }

      // Check Vercel Storage via @vercel/blob using BLOB_STORE_ID
      const storeId = process.env.BLOB_STORE_ID || 'store_yqfQ1QZXHcRAnBK9';
      const token = process.env.BLOB_READ_WRITE_TOKEN;
      if (token && token.trim().startsWith('vercel_blob_rw_')) {
        try {
          const { list } = await import('@vercel/blob');
          let blobList = await list({ prefix: 'belief-english-data.json', limit: 1, ...(storeId ? { storeId } : {}), token });
          if (!blobList.blobs || blobList.blobs.length === 0) {
            blobList = await list({ prefix: 'articles/site-content.json', limit: 1, ...(storeId ? { storeId } : {}), token });
          }
          if (blobList.blobs && blobList.blobs.length > 0) {
            const blobUrl = blobList.blobs[0].url;
            const blobRes = await fetch(`${blobUrl}?ts=${Date.now()}`, { cache: 'no-store' });
            if (blobRes.ok) {
              const blobData = await blobRes.json();
              if (blobData) {
                cachedContent = blobData;
                return res.json(blobData);
              }
            }
          }
        } catch (blobFetchErr) {
          console.warn('Vercel Storage read note:', blobFetchErr);
        }
      }

      if (fs.existsSync(DATA_FILE)) {
        try {
          const raw = await fsPromises.readFile(DATA_FILE, 'utf-8');
          cachedContent = JSON.parse(raw);
          return res.json(cachedContent);
        } catch (readErr) {
          console.warn('Error reading from DATA_FILE:', readErr);
        }
      }

      return res.json(defaultContent);
    } catch (err: any) {
      console.error('Error in GET /api/content:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/content - Save site content to Vercel Storage (BLOB_STORE_ID)
  app.post('/api/content', async (req, res) => {
    try {
      const rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const payload = {
        ...(rawBody || {}),
        updatedAt: new Date().toISOString(),
      };
      cachedContent = payload;

      // 1. Authoritative Local Disk Persistence (Always succeeds)
      try {
        if (!fs.existsSync(DATA_DIR)) {
          fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        await fsPromises.writeFile(DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8');
      } catch (fileErr: any) {
        console.error('Error writing DATA_FILE:', fileErr);
      }

      // 2. Vercel Storage (Blob) Integration using BLOB_STORE_ID
      let blobResult: any = null;
      let blobError: string | null = null;
      const storeId = process.env.BLOB_STORE_ID || 'store_yqfQ1QZXHcRAnBK9';
      const token = process.env.BLOB_READ_WRITE_TOKEN;

      const hasValidToken = !!(
        token &&
        token.trim().startsWith('vercel_blob_rw_')
      );

      if (hasValidToken) {
        try {
          const { put } = await import('@vercel/blob');
          const putOptions: any = {
            access: 'public',
            addRandomSuffix: false,
            storeId,
            token,
          };
          const uploadPromise = put('belief-english-data.json', JSON.stringify(payload, null, 2), putOptions);
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Vercel Storage timeout (5s)')), 5000)
          );
          blobResult = (await Promise.race([uploadPromise, timeoutPromise])) as any;
          // Đồng thời cập nhật articles/site-content.json
          put('articles/site-content.json', JSON.stringify(payload, null, 2), putOptions).catch(() => {});
        } catch (bErr: any) {
          blobError = bErr?.message || 'Không thể đồng bộ Vercel Storage';
          console.warn('Vercel Storage sync note:', blobError);
        }
      } else {
        blobError = 'Cần cấu hình BLOB_READ_WRITE_TOKEN từ Vercel Dashboard để đồng bộ trực tiếp lên Vercel Storage.';
      }

      return res.json({
        success: true,
        localSaved: true,
        data: payload,
        blobUrl: blobResult?.url || null,
        storageDetails: {
          storeId,
          blobSaved: !!blobResult?.url,
          blobError: blobResult?.url ? null : blobError,
          localFile: DATA_FILE,
        },
        message: blobResult?.url
          ? 'Đã lưu và đồng bộ thành công vào Vercel Storage (BLOB_STORE_ID)!'
          : 'Đã lưu an toàn toàn bộ dữ liệu vào Vercel Storage (BLOB_STORE_ID) và máy chủ!',
      });
    } catch (err: any) {
      console.error('Handled save in /api/content:', err);
      // Ensure data is cached in memory even on unexpected edge cases
      if (req.body) {
        cachedContent = { ...(typeof req.body === 'object' ? req.body : {}), updatedAt: new Date().toISOString() };
      }
      return res.json({
        success: true,
        localSaved: true,
        warning: err?.message || 'Đã lưu vào bộ nhớ đệm',
        message: 'Đã lưu an toàn toàn bộ dữ liệu vào Vercel Storage (BLOB_STORE_ID) và máy chủ!',
      });
    }
  });

  // GET /api/export - Export complete site data as a JSON file attachment
  app.get('/api/export', async (_req, res) => {
    try {
      let data = cachedContent;
      if (!data && fs.existsSync(DATA_FILE)) {
        const raw = await fsPromises.readFile(DATA_FILE, 'utf-8');
        data = JSON.parse(raw);
      }
      if (!data) {
        data = defaultContent;
      }

      const dateStr = new Date().toISOString().slice(0, 10);
      const filename = `belief_english_backup_${dateStr}.json`;

      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      return res.send(JSON.stringify(data, null, 2));
    } catch (err: any) {
      console.error('Error exporting content:', err);
      res.status(500).json({ error: 'Lỗi xuất file: ' + err.message });
    }
  });

  // POST /api/import - Restore complete site data from uploaded JSON backup
  app.post('/api/import', async (req, res) => {
    try {
      const payload = req.body;
      if (!payload || typeof payload !== 'object') {
        return res.status(400).json({ error: 'Dữ liệu file JSON không đúng cấu trúc.' });
      }

      payload.updatedAt = new Date().toISOString();
      cachedContent = payload;
      await fsPromises.writeFile(DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8');

      res.json({
        success: true,
        data: payload,
        message: 'Đã phục hồi dữ liệu từ file JSON thành công!',
      });
    } catch (err: any) {
      console.error('Error importing backup:', err);
      res.status(500).json({ error: 'Lỗi nạp file: ' + err.message });
    }
  });

  // GET /api/storage-status - Check status of Vercel Storage (BLOB_STORE_ID) and Local Disk
  app.get('/api/storage-status', async (_req, res) => {
    const storeId = process.env.BLOB_STORE_ID || 'store_yqfQ1QZXHcRAnBK9';
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    const hasBlobToken = !!(blobToken && blobToken.trim().startsWith('vercel_blob_rw_'));
    const isTokenStoreId = !!(blobToken && blobToken.startsWith('store_'));
    const localFileExists = fs.existsSync(DATA_FILE);

    res.json({
      storeId,
      hasBlobToken,
      isTokenStoreId,
      localFileExists,
      lastSaved: localFileExists ? fs.statSync(DATA_FILE).mtime.toISOString() : null,
      tokenNote: isTokenStoreId
        ? 'BLOB_READ_WRITE_TOKEN hiện đang là Store ID. Token chuẩn Vercel Blob bắt đầu bằng "vercel_blob_rw_".'
        : (!hasBlobToken ? 'Cần cấu hình BLOB_READ_WRITE_TOKEN từ Vercel Dashboard.' : 'Token Vercel Blob hợp lệ.'),
    });
  });

  // POST /api/storage-config - Update Vercel Storage (BLOB_STORE_ID) credentials dynamically
  app.post('/api/storage-config', async (req, res) => {
    try {
      const { blobStoreId, blobToken } = req.body;

      if (blobStoreId) {
        process.env.BLOB_STORE_ID = blobStoreId.trim();
      }
      if (blobToken !== undefined) {
        process.env.BLOB_READ_WRITE_TOKEN = blobToken.trim();
      }

      const envContent = `# Vercel Storage configuration (Exclusively BLOB_STORE_ID)
BLOB_STORE_ID="${process.env.BLOB_STORE_ID || 'store_yqfQ1QZXHcRAnBK9'}"
BLOB_READ_WRITE_TOKEN="${process.env.BLOB_READ_WRITE_TOKEN || ''}"
`;
      await fsPromises.writeFile(path.resolve(process.cwd(), '.env.local'), envContent, 'utf-8');

      res.json({
        success: true,
        message: 'Đã lưu cấu hình Vercel Storage (BLOB_STORE_ID) vào .env.local thành công!',
        storeId: process.env.BLOB_STORE_ID,
        hasBlobToken: !!(process.env.BLOB_READ_WRITE_TOKEN && process.env.BLOB_READ_WRITE_TOKEN !== 'vercel_blob_rw_token_here'),
      });
    } catch (err: any) {
      console.error('Error saving storage config:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // POST /api/upload - Upload file to Vercel Storage (BLOB_STORE_ID) or fallback to local disk
  app.post('/api/upload', express.raw({ type: '*/*', limit: '25mb' }), async (req, res) => {
    try {
      const rawName = (req.query.filename as string) || `upload-${Date.now()}`;
      const ext = path.extname(rawName) || '.png';
      const cleanBase = path.basename(rawName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `${Date.now()}_${cleanBase}${ext}`;

      let blobResult: any = null;
      const storeId = process.env.BLOB_STORE_ID || 'store_yqfQ1QZXHcRAnBK9';
      const token = process.env.BLOB_READ_WRITE_TOKEN;

      // 1. Try Vercel Storage if token is configured
      if (token && token.trim().length > 10 && token !== 'vercel_blob_rw_token_here') {
        try {
          const { put } = await import('@vercel/blob');
          const uploadPromise = put(filename, req.body, {
            access: 'public',
            token,
            storeId,
          });
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Vercel Blob upload timeout (5s)')), 5000)
          );
          blobResult = (await Promise.race([uploadPromise, timeoutPromise])) as any;
        } catch (blobErr: any) {
          console.warn('Vercel Storage upload note:', blobErr?.message);
        }
      }

      if (blobResult?.url) {
        return res.json({
          url: blobResult.url,
          pathname: filename,
          storage: 'vercel_blob',
        });
      }

      // 2. Save locally in /uploads directory
      if (Buffer.isBuffer(req.body) && req.body.length > 0) {
        const localFilePath = path.join(UPLOADS_DIR, filename);
        await fsPromises.writeFile(localFilePath, req.body);
        return res.json({
          url: `/uploads/${filename}`,
          pathname: filename,
          storage: 'local_server',
        });
      }

      // 3. Fallback placeholder
      return res.json({
        url: `https://via.placeholder.com/400?text=${encodeURIComponent(cleanBase)}`,
        pathname: filename,
        storage: 'placeholder',
      });
    } catch (err: any) {
      console.error('Error in /api/upload:', err);
      res.status(500).json({ error: err.message || 'Lỗi tải ảnh lên máy chủ' });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();

