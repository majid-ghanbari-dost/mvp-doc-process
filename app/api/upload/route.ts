import { NextResponse } from 'next/server';

// NOTE: This route only reads the file and returns its meta info.
// It doesn't persist the file because Vercel serverless functions have ephemeral storage.
// For real storage, connect to S3, Supabase Storage, or Vercel Blob.
export const runtime = 'nodejs'; // ensure running in Node.js environment

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'هیچ فایلی دریافت نشد.' }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const size = arrayBuffer.byteLength;

    return NextResponse.json({
      name: file.name,
      size,
      type: file.type || ''
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Upload failed' }, { status: 500 });
  }
}
