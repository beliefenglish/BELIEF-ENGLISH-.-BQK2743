import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(
  supabaseUrl!,
  supabaseKey!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('data')
      .eq('id', 'belief_english')
      .single();

    if (error || !data || !data.data) {
      return NextResponse.json({ message: 'Chưa có dữ liệu' });
    }

    return NextResponse.json(data.data);
  } catch (error: any) {
    console.error('Lỗi đọc dữ liệu từ Supabase:', error);
    return NextResponse.json({ error: error.message || 'Lỗi đọc dữ liệu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { error } = await supabase
      .from('site_content')
      .upsert({
        id: 'belief_english',
        data: body,
      });

    if (error) {
      console.error('Lỗi ghi dữ liệu vào Supabase:', error);
      return NextResponse.json({ error: error.message || 'Lỗi ghi dữ liệu' }, { status: 500 });
    }

    // Xóa cache giao diện
    revalidatePath('/', 'layout');
    revalidatePath('/admin');

    return NextResponse.json({
      success: true,
      message: 'Đã lưu dữ liệu vào Supabase thành công!',
    });
  } catch (error: any) {
    console.error('Lỗi lưu dữ liệu Supabase:', error);
    return NextResponse.json({ error: error.message || 'Lỗi lưu dữ liệu' }, { status: 500 });
  }
}
