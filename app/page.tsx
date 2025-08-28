// pages/api/upload.js

export const config = {
  api: {
    bodyParser: false, // چون فایل باینری می‌فرستیم
  },
};

import formidable from "formidable";
import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "فقط متد POST پشتیبانی می‌شود." });
  }

  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "مشکل در پردازش فایل." });
    }

    const file = files.file;

    if (!file) {
      return res.status(400).json({ error: "هیچ فایلی ارسال نشده است." });
    }

    // فعلاً فقط اطلاعات فایل را برمی‌گردانیم (بدون ذخیره روی دیسک سرور Vercel)
    res.status(200).json({
      name: file.originalFilename,
      size: file.size,
      type: file.mimetype,
    });
  });
}
