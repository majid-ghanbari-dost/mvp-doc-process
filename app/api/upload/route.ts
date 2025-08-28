import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'nodejs'; // اجرای Node.js در Vercel

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'هیچ فایلی دریافت نشد.' }, { status: 400 });
    }

    // نام امن و یکتا
    const safeName = String(file.name).replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `uploads/${Date.now()}-${safeName}`;

    // ذخیره در Vercel Blob با دسترسی عمومی
    const saved = await put(key, file, { access: 'public' });

    return NextResponse.json({
      name: file.name,
      size: file.size,
      type: file.type || '',
      url: saved.url,     // لینک فایل
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'آپلود ناموفق بود.' }, { status: 500 });
  }
}
