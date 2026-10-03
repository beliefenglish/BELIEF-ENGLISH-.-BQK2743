import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  // CORS support
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const filename = (req.query?.filename as string) || `upload-${Date.now()}`;
    const storeId = process.env.BLOB_STORE_ID || 'store_yqfQ1QZXHcRAnBK9';
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    const options: any = {
      access: 'public',
      storeId,
    };
    if (token && token !== 'vercel_blob_rw_token_here') {
      options.token = token;
    }

    const blob = await put(filename, req, options);

    return res.status(200).json(blob);
  } catch (error: any) {
    console.warn('Error uploading file to Vercel Blob, falling back:', error?.message);
    const filename = (req.query?.filename as string) || `upload-${Date.now()}`;
    return res.status(200).json({
      url: `https://via.placeholder.com/400?text=${encodeURIComponent(filename.slice(0, 30))}`,
      pathname: filename,
      warning: error?.message || 'Chưa cấu hình BLOB_READ_WRITE_TOKEN',
    });
  }
}
