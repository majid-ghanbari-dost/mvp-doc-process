"use client";
import { useState } from "react";

export default function Home() {
  const [fileInfo, setFileInfo] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = e.target.file.files[0];
    formData.append("file", fileInput);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setFileInfo(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">آپلود فایل</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" name="file" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          آپلود
        </button>
      </form>

      {fileInfo && (
        <div className="mt-6 p-4 border rounded">
          <p>نام فایل: {fileInfo.name}</p>
          <p>حجم فایل: {fileInfo.size} بایت</p>
          <p>نوع فایل: {fileInfo.type}</p>
        </div>
      )}
    </div>
  );
}
