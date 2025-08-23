# Next.js Upload App (Minimal)

صفحه‌ی ساده برای آپلود فایل در Next.js (App Router). فایل واقعاً جایی ذخیره نمی‌شود؛ فقط اطلاعات متادیتا برگردانده می‌شود.

## اجرای محلی

```bash
npm install
npm run dev
# سپس به http://localhost:3000 بروید
```

## دیپلوی روی Vercel (قدم‌های سریع)

1. یک ریپازیتوری جدید در GitHub بسازید و این پروژه را پوش کنید.
2. به vercel.com بروید → New Project → Import Git Repository → ریپو را انتخاب کنید.
3. Framework را Next.js تشخیص می‌دهد. Build Command همان `next build` و Output همان `.next` است.
4. Deploy را بزنید.

> نکته: برای ذخیره‌ی واقعی فایل‌ها از سرویس‌هایی مثل Vercel Blob، AWS S3، Supabase Storage یا Cloudflare R2 استفاده کنید.
