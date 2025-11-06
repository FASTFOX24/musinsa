"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function SampleImageUploader() {
  const supabase = createClientComponentClient();
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    setIsUploading(true);
    setMessage("");

    try {
      for (const file of Array.from(files)) {
        // ✅ 파일 이름을 안전한 형태로 변환
        const safeFileName = file.name
          .replace(/[^\w.-]/g, "_") // 영문, 숫자, ., - 외 모두 _
          .replace(/\s+/g, "_"); // 공백은 _ 로 대체

        const filePath = `sample/${Date.now()}-${safeFileName}`;

        const { error } = await supabase.storage
          .from("item-images")
          .upload(filePath, file, {
            contentType: file.type,
            upsert: false,
          });

        if (error) {
          console.error("Upload error:", error);
          setMessage(`❌ 업로드 실패: ${safeFileName}`);
        } else {
          setMessage((prev) => prev + `✅ 업로드 성공: ${safeFileName}\n`);
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("예기치 못한 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        disabled={isUploading}
      />
      {isUploading && <p>업로드 중입니다...</p>}
      {message && <pre>{message}</pre>}
    </div>
  );
}
