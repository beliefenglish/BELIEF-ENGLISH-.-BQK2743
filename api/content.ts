import { createClient } from '@supabase/supabase-js';
import { defaultContent } from '../lib/default-content';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
  if (url && key) {
    return createClient(url, key);
  }
  return null;
}

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

  const supabase = getSupabase();

  // GET: Fetch content from Supabase
  if (req.method === 'GET') {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('site_content')
          .select('data')
          .eq('id', 'belief_english')
          .single();

        if (!error && data && data.data) {
          return res.status(200).json(data.data);
        }
      }
      return res.status(200).json(defaultContent);
    } catch (err: any) {
      console.error('Lỗi đọc dữ liệu từ Supabase:', err);
      return res.status(500).json({ error: err.message || 'Lỗi đọc dữ liệu' });
    }
  }

  // POST: Save content to Supabase
  if (req.method === 'POST') {
    try {
      let bodyData = req.body;
      if (typeof bodyData === 'string') {
        try {
          bodyData = JSON.parse(bodyData);
        } catch {
          bodyData = {};
        }
      }

      if (supabase) {
        const { error } = await supabase
          .from('site_content')
          .upsert({
            id: 'belief_english',
            data: bodyData,
          });

        if (error) {
          console.error('Lỗi lưu vào Supabase:', error);
          return res.status(500).json({ error: error.message || 'Lỗi lưu dữ liệu' });
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Đã lưu dữ liệu vào Supabase thành công!',
      });
    } catch (error: any) {
      console.error('Lỗi ghi dữ liệu Supabase:', error);
      return res.status(500).json({ error: error.message || 'Lỗi lưu dữ liệu' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
