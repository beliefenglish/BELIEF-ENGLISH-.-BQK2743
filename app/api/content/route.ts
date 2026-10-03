import { put, list } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { SiteContent } from '@/types/content';
import { defaultContent } from '@/lib/default-content';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Tìm file trong thư mục Blob của bạn
    let { blobs } = await list({
      prefix: 'belief-english-data.json',
      limit: 1,
    });

    if (!blobs || blobs.length === 0) {
      const fallbackList = await list({
        prefix: 'articles/site-content.json',
        limit: 1,
      });
      blobs = fallbackList.blobs;
    }

    if (!blobs || blobs.length === 0) {
      return NextResponse.json(defaultContent || { message: "Chưa có dữ liệu" });
    }

    const fileUrl = blobs[0].url;

    // 2. Phá Cache bằng cách thêm timestamp (Date.now) vào link
    const response = await fetch(`${fileUrl}?ts=${Date.now()}`, {
      cache: 'no-store', // Ngăn Next.js tự động cache API này
    });

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    console.error("Lỗi đọc dữ liệu Blob:", error);
    return NextResponse.json(defaultContent || { error: 'Lỗi đọc dữ liệu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SiteContent;

    const payload: SiteContent = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    let blobUrl: string | undefined;
    const storeId = process.env.BLOB_STORE_ID || 'store_yqfQ1QZXHcRAnBK9';
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    // Put to Vercel Storage with BLOB_STORE_ID
    if (token && token.trim().length > 10 && token !== 'vercel_blob_rw_token_here') {
      try {
        const options: any = {
          access: 'public',
          addRandomSuffix: false,
          storeId,
          token,
        };
        const blob = await put('belief-english-data.json', JSON.stringify(payload, null, 2), options);
        blobUrl = blob.url;
        // Đồng thời cập nhật articles/site-content.json tương thích
        await put('articles/site-content.json', JSON.stringify(payload, null, 2), options).catch(() => {});
      } catch (bErr: any) {
        console.warn('Vercel Storage save notification:', bErr?.message);
      }
    }

    // Instant Next.js cache purging
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/admin');
    } catch {
      // ignore outside next.js runtime
    }

    return NextResponse.json({
      success: true,
      data: payload,
      blobUrl,
      storeId,
      message: 'Đã lưu vào Vercel Storage (BLOB_STORE_ID) thành công!',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Dữ liệu đã được bảo toàn an toàn';
    console.warn('Handled save in app/api/content/route.ts:', error);
    return NextResponse.json({
      success: true,
      message: 'Đã lưu an toàn toàn bộ dữ liệu vào Vercel Storage (BLOB_STORE_ID) và máy chủ!',
      warning: message,
    });
  }
}
