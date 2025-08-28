'use client';

import { useRef, useState } from 'react';

type UploadResult =
  | { name: string; size: number; type: string; url?: string }
  | { error: string };


export default function Page() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('');
  const [meta, setMeta] = useState<{name: string; size: number; type: string} | null>(null);
  const [error, setError] = useState<string>('');

  const onPick = () => inputRef.current?.click();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setStatus('');
    setError('');
    setMeta(null);
  };

  const onUpload = async () => {
    if (!file) {
      setError('فایلی انتخاب نشده است.');
      return;
    }
    try {
      setStatus('در حال آپلود...');
      setError('');
      setMeta(null);
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json: UploadResult = await res.json();
      if (!res.ok || 'error' in json) {
        setError((json as any).error || 'آپلود ناموفق بود.');
        setStatus('');
        return;
      }
      const data = json as {name: string; size: number; type: string};
      setMeta(data);
      setStatus('آپلود با موفقیت انجام شد.');
    } catch (e: any) {
      setError(e?.message || 'خطای ناشناخته رخ داد.');
      setStatus('');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>بارگذاری فایل</h1>
        <p className="muted">یک سند انتخاب کنید و روی دکمه‌ی آپلود بزنید. (نمونه‌ی ساده؛ فایل جایی ذخیره نمی‌شود.)</p>

        <input
          ref={inputRef}
          className="hidden-input"
          id="file"
          type="file"
          onChange={onChange}
        />

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={onPick} className="button">انتخاب فایل</button>
          <button onClick={onUpload} className="button">آپلود</button>
        </div>

        {file && (
          <div className="meta">
            <div><strong>فایل انتخاب‌شده:</strong> {file.name}</div>
            <div><small>{(file.size / 1024).toFixed(1)} کیلوبایت</small></div>
          </div>
        )}

        {status && <div className="status">{status}</div>}
        {error && <div className="status error">{error}</div>}
        {meta && (
          <div className="meta">
            <div><strong>نام:</strong> {meta.name}</div>
            <div><strong>نوع:</strong> {meta.type || '—'}</div>
            <div><strong>حجم:</strong> {(meta.size / 1024).toFixed(1)} کیلوبایت</div>
          </div>
        )}
      </div>
    </div>
  );
}
