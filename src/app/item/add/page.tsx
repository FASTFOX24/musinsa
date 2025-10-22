"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const SEASONS = ["봄", "여름", "가을", "겨울"] as const;
type Season = (typeof SEASONS)[number];

export default function ItemAddPage() {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<Set<Season>>(new Set());

  const canSubmit = useMemo(() => {
    return selectedImages.length > 0 && selectedSeasons.size > 0;
  }, [selectedImages.length, selectedSeasons]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setSelectedImages(files);
  }

  function toggleSeason(season: Season) {
    setSelectedSeasons((prev) => {
      const next = new Set(prev);
      if (next.has(season)) {
        next.delete(season);
      } else {
        next.add(season);
      }
      return next;
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    router.push("/item/detail/1");
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>아이템 추가</h1>

      <form onSubmit={handleSubmit} noValidate>
        <section style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>
            이미지 업로드 <span aria-hidden style={{ color: "#d00" }}>(필수)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            aria-required
            onChange={handleImageChange}
          />
          <div style={{ marginTop: 8, color: "#555" }}>
            선택한 이미지: {selectedImages.length}개 (최소 1개)
          </div>
        </section>

        <section style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontWeight: 600 }}>계절 태그</span>
            <span aria-hidden style={{ color: "#d00" }}>(필수)</span>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
            {SEASONS.map((season) => {
              const checked = selectedSeasons.has(season);
              return (
                <label
                  key={season}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1px solid #ccc",
                    background: checked ? "#eef6ff" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSeason(season)}
                  />
                  <span>{season}</span>
                </label>
              );
            })}
          </div>

          <div style={{ marginTop: 8, color: "#555" }}>최소 1개 선택</div>
        </section>

        <button
          type="submit"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid #111",
            background: canSubmit ? "#111" : "#999",
            color: "#fff",
            cursor: canSubmit ? "pointer" : "not-allowed",
          }}
        >
          추가하기
        </button>
      </form>
    </main>
  );
}
