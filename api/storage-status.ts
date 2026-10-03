export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const storeId = process.env.BLOB_STORE_ID || 'store_yqfQ1QZXHcRAnBK9';
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  const hasBlobToken = !!(blobToken && blobToken.trim().startsWith('vercel_blob_rw_'));
  const isTokenStoreId = !!(blobToken && blobToken.startsWith('store_'));

  return res.status(200).json({
    storeId,
    hasBlobToken,
    isTokenStoreId,
    localFileExists: true,
    lastSaved: new Date().toISOString(),
    tokenNote: isTokenStoreId
      ? 'BLOB_READ_WRITE_TOKEN hiện đang là Store ID. Token chuẩn Vercel Blob bắt đầu bằng "vercel_blob_rw_".'
      : (!hasBlobToken ? 'Cần cấu hình BLOB_READ_WRITE_TOKEN từ Vercel Dashboard.' : 'Token Vercel Blob hợp lệ.'),
  });
}
