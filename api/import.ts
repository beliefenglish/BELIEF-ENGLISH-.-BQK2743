export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  return res.status(200).json({
    success: true,
    data: payload,
    message: 'Đã phục hồi dữ liệu từ file JSON thành công!',
  });
}
