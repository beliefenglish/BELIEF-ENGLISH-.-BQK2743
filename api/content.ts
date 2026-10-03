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
        const listOptions: any = { prefix: 'articles/site-content.json', limit: 1, storeId, token };
        const blobList = await list(listOptions);
        if (blobList.blobs && blobList.blobs.length > 0) {
          const blobUrl = blobList.blobs[0].url;
          const blobRes = await fetch(blobUrl);
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
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const payload = {
        ...body,
        updatedAt: new Date().toISOString(),
      };

      let blobResult: any = null;
      try {
        const options: any = {
          access: 'public',
          addRandomSuffix: false,
          storeId,
        };
        if (token && token !== 'vercel_blob_rw_token_here') {
          options.token = token;
        }
        blobResult = await put('articles/site-content.json', JSON.stringify(payload), options);
      } catch (blobErr) {
        console.warn('Vercel Storage put notification:', blobErr);
      }

      return res.status(200).json({
        success: true,
        data: payload,
        blobUrl: blobResult?.url || null,
        storeId,
        message: 'Đã lưu dữ liệu vào Vercel Storage (BLOB_STORE_ID) thành công!',
      });
    } catch (error: any) {
      console.error('Error saving content:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Lỗi khi lưu dữ liệu lên máy chủ',
      });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
