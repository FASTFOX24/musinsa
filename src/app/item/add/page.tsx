"use client";

import Header from "@/components/Header";
import ItemPage from "@/components/ItemPage";
import { useSession } from "@supabase/auth-helpers-react";
import * as S from "@/styles/Common.styles";
import { ItemFormData } from "@/types/item";
import { dataUrlToBlob, guessExtFromDataUrl } from "@/utils/image";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import { useRouter } from "next/navigation";

export default function AddItemPage() {
  const router = useRouter();
  const session = useSession();
  const supabase = supabaseBrowserClient();

  const handleSubmit = async (data: ItemFormData) => {
    try {
      if (!session?.user) {
        alert("로그인이 필요합니다.");
        router.push("/list");
        return;
      }
      const uploadedImageUrls: string[] = [];
      for (let i = 0; i < data.images.length; i++) {
        const dataUrl = data.images[i];
        const blob = dataUrlToBlob(dataUrl);
        const fileExt = guessExtFromDataUrl(dataUrl) || "png";
        const filePath = `${session.user.id}/${Date.now()}-${i}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("item-images")
          .upload(filePath, blob, {
            upsert: false,
            contentType: blob.type || `image/${fileExt}`,
          });
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("item-images")
          .getPublicUrl(filePath);
        uploadedImageUrls.push(publicUrlData.publicUrl);
      }

      const seasons = data.seasons;
      const { data: inserted, error: insertError } = await supabase
        .from("items")
        .insert({
          user_id: session.user.id,
          name: data.name,
          brand: data.brand,
          price: data.price,
          description: data.description,
          images: uploadedImageUrls,
          category: data.category,
          seasons: seasons,
        })
        .select("id")
        .single();

      if (insertError) throw insertError;
      if (!inserted || !inserted.id) {
        throw new Error("아이템 저장 후 ID를 가져오지 못했습니다.");
      }
      router.push(`/item/detail/${inserted.id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        alert(
          `저장 중 오류가 발생했습니다. 다시 시도해주세요.\n${err.message}`
        );
      } else {
        console.error("알 수 없는 에러 발생:", err);
        alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <S.Container>
      <Header title={"추가하기"} leftContentType="back" />
      <ItemPage
        onSubmit={handleSubmit}
        onCancel={() => router.push("/list")}
        submitButtonText={"추가하기"}
      />
    </S.Container>
  );
}
