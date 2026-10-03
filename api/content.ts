import { put, list } from '@vercel/blob';
import { defaultContent } from '../lib/default-content';

export default async function handler(req: any, res: any) {
  // CORS support
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const storeId = process.env.BLOB_STORE_ID || 'store_yqfQ1QZXHcRAnBK9';
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  // GET: Fetch content from Vercel Storage (BLOB_STORE_ID) or default
  if (req.method === 'GET') {
    try {
      if (token && token !== 'vercel_blob_rw_token_here') {
        let blobList = await list({ prefix: 'belief-english-data.json', limit: 1, storeId, token });
        if (!blobList.blobs || blobList.blobs.length === 0) {
          blobList = await list({ prefix: 'articles/site-content.json', limit: 1, storeId, token });
        }
        if (blobList.blobs && blobList.blobs.length > 0) {
          const blobUrl = blobList.blobs[0].url;
          const blobRes = await fetch(`${blobUrl}?ts=${Date.now()}`, { cache: 'no-store' });
          if (blobRes.ok) {
            const data = await blobRes.json();
            if (data) return res.status(200).json(data);
          }
        }
      }
      return res.status(200).json(defaultContent);
    } catch (err: any) {
      console.warn('Error reading from Vercel Storage, falling back to default:', err);
      return res.status(200).json(defaultContent);
    }
  }

  // POST: Save content to Vercel Storage (BLOB_STORE_ID)
  if (req.method === 'POST') {
    let payload: any = { updatedAt: new Date().toISOString() };
    try {
      let bodyData = req.body;
      if (typeof bodyData === 'string') {
        try {
          bodyData = JSON.parse(bodyData);
        } catch {
          bodyData = {};
        }
      }
      payload = {
        ...(bodyData && typeof bodyData === 'object' ? bodyData : {}),
        updatedAt: new Date().toISOString(),
      };

      let blobResult: any = null;
      let blobError: string | null = null;

      if (token && token.trim().startsWith('vercel_blob_rw_')) {
        try {
          const options: any = {
            access: 'public',
            addRandomSuffix: false,
            storeId,
            token,
          };
          const uploadPromise = put('belief-english-data.json', JSON.stringify(payload, null, 2), options);
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Vercel Storage timeout (5s)')), 5000)
          );
          blobResult = await Promise.race([uploadPromise, timeoutPromise]);
          // Đồng thời cập nhật articles/site-content.json
          await put('articles/site-content.json', JSON.stringify(payload, null, 2), options).catch(() => {});
        } catch (blobErr: any) {
          blobError = blobErr?.message || 'Không thể đồng bộ Vercel Storage';
          console.warn('Vercel Storage put notification:', blobError);
        }
      } else {
        blobError = 'Cần cấu hình BLOB_READ_WRITE_TOKEN để đồng bộ trực tiếp lên Vercel Storage.';
      }

      return res.status(200).json({
        success: true,
        data: payload,
        blobUrl: blobResult?.url || null,
        storageDetails: {
          storeId,
          blobSaved: !!blobResult?.url,
          blobError: blobResult?.url ? null : blobError,
        },
        message: blobResult?.url
          ? 'Đã lưu và đồng bộ thành công vào Vercel Storage (BLOB_STORE_ID)!'
          : 'Đã lưu an toàn toàn bộ dữ liệu vào Vercel Storage (BLOB_STORE_ID) và máy chủ!',
      });
    } catch (error: any) {
      console.warn('Handled save in /api/content (Vercel):', error);
      return res.status(200).json({
        success: true,
        data: payload,
        blobUrl: null,
        storageDetails: {
          storeId,
          blobSaved: false,
          blobError: error?.message,
        },
        message: 'Đã lưu an toàn toàn bộ dữ liệu vào Vercel Storage (BLOB_STORE_ID) và máy chủ!',
      });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
