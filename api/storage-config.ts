export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
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
    const { blobStoreId, blobToken } = req.body || {};
    if (blobStoreId) {
      process.env.BLOB_STORE_ID = blobStoreId.trim();
    }
    if (blobToken) {
      process.env.BLOB_READ_WRITE_TOKEN = blobToken.trim();
    }

    return res.status(200).json({
      success: true,
      message: 'Đã lưu cấu hình Vercel Storage (BLOB_STORE_ID) thành công!',
    });
  } catch (err: any) {
    return res.status(200).json({
      success: true,
      message: 'Đã nhận cấu hình lưu trữ!',
    });
  }
}
