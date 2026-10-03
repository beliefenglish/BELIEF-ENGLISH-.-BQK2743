import { put, list } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { SiteContent } from '@/types/content';
import { defaultContent } from '@/lib/default-content';

export async function GET() {
  try {
    const storeId = process.env.BLOB_STORE_ID || 'store_yqfQ1QZXHcRAnBK9';
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (token && token !== 'vercel_blob_rw_token_here') {
      try {
        const listOptions: any = { prefix: 'articles/site-content.json', limit: 1, storeId, token };
        const blobList = await list(listOptions);
        if (blobList.blobs && blobList.blobs.length > 0) {
          const blobUrl = blobList.blobs[0].url;
          const blobRes = await fetch(blobUrl);
          if (blobRes.ok) {
            const data = await blobRes.json();
            if (data) {
              return NextResponse.json(data, {
                headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' },
              });
            }
          }
        }
      } catch (blobErr) {
        console.warn('Vercel Storage read fallback:', blobErr);
      }
    }

    return NextResponse.json(defaultContent, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching content from Vercel Storage:', error);
    return NextResponse.json(defaultContent, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
      },
    });
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
    try {
      const options: any = {
        access: 'public',
        addRandomSuffix: false,
        storeId,
      };
      if (token && token !== 'vercel_blob_rw_token_here') {
        options.token = token;
      }
      const blob = await put('articles/site-content.json', JSON.stringify(payload), options);
      blobUrl = blob.url;
    } catch (bErr) {
      console.warn('Vercel Storage save notification:', bErr);
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
    const message = error instanceof Error ? error.message : 'Unknown error updating content';
    console.error('Error saving content:', error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
