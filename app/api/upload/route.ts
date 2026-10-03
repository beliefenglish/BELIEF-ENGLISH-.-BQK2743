import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: 'Tên tệp (filename) là bắt buộc trong query parameters.' },
        { status: 400 }
      );
    }

    if (!request.body) {
      return NextResponse.json(
        { error: 'Dữ liệu tệp tải lên không được để trống.' },
        { status: 400 }
      );
    }

    const storeId =
      process.env.BLOB_STORE_ID || process.env.beliefenglish_STORE_ID || 'store_yqfQ1QZXHcRAnBK9';
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    const options: any = {
      access: 'public',
      ...(storeId ? { storeId } : {}),
    };
    if (token && token !== 'vercel_blob_rw_token_here') {
      options.token = token;
    }

    const blob = await put(filename, request.body, options);

    return NextResponse.json(blob);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Lỗi không xác định khi upload lên Vercel Blob';
    console.error('Error uploading file to Vercel Blob:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
