"use client";

import { useState } from "react";

export default function UploadCvPage() {
  const [loading, setLoading] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setLoading(true);

      const ext = file.name.split(".").pop()?.toLowerCase() || "pdf";
      const safeExt = ["pdf", "doc", "docx"].includes(ext) ? ext : "pdf";
      const safeFileName = `cv-${Date.now()}.${safeExt}`;

      const safeFile = new File([file], safeFileName, {
        type: "application/octet-stream",
      });

      const formData = new FormData();
      formData.append("cv", safeFile, safeFileName);

      const res = await fetch("/api/upload-cv", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        window.location.href = "/thank-you";
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Upload failed. Please try again.");
        setLoading(false);
      }
    } catch (error: any) {
      alert(error.message || "Upload failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4">Upload your CV</h1>

        <p className="text-gray-600 mb-8">
          Choose your resume file and submit your application.
        </p>

        <label className="block border border-gray-300 rounded-lg px-6 py-4 cursor-pointer hover:bg-gray-100 transition">
          {loading ? "Uploading..." : "Choose CV file"}
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>
    </main>
  );
}
