"use client";
import { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return alert("یک فایل انتخاب کن.");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("خطا در ارسال فایل.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 gap-4">
      <h1 className="text-2xl font-bold">آپلود فایل</h1>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {uploading ? "در حال آپلود..." : "آپلود"}
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded w-full max-w-md bg-gray-100 text-right">
          {result.error ? (
            <p className="text-red-600">خطا: {result.error}</p>
          ) : (
            <>
              <p><strong>نام فایل:</strong> {result.name}</p>
              <p><strong>حجم:</strong> {result.size} بایت</p>
              <p><strong>نوع:</strong> {result.type}</p>
            </>
          )}
        </div>
      )}
    </main>
  );
}
