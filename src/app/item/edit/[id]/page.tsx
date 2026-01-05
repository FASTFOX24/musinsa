"use client";

import Header from "@/components/Header";
import ItemPage from "@/components/ItemPage";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import * as S from "@/styles/Common.styles";
import { ItemFormData } from "@/types/item";
import { CategoryKey } from "@/utils/category";
import { dataUrlToBlob, guessExtFromDataUrl } from "@/utils/image";
import { useSession } from "@supabase/auth-helpers-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditItem() {
  const router = useRouter();
  const session = useSession();
  const supabase = supabaseBrowserClient();
  const params = useParams();
  const itemId = params.id as string;

  const [initialData, setInitialData] = useState<ItemFormData | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      setIsLoading(false);
      return;
    }
    const fetchItemData = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("items")
          .select("*")
          .eq("id", itemId)
          .eq("user_id", session.user.id)
          .single();

        if (error) throw error;

        if (data) {
          setInitialData({
            name: data.name || "",
            brand: data.brand || "",
            price: data.price || "",
            description: data.description || "",
            images: data.images || [],
            category: (data.category as CategoryKey) || "",
            seasons: data.seasons || {
              spring: false,
              summer: false,
              autumn: false,
              winter: false,
            },
          });
        } else {
          alert("아이템을 찾을 수 없습니다.");
          router.push("/list");
        }
      } catch (error: unknown) {
        console.error("아이템 데이터 로딩 실패:", error);
        alert("아이템을 불러오는데 실패했습니다.");
        router.push("/list");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemData();
  }, [itemId, session, supabase, router]);

  const handleSubmit = async (data: ItemFormData) => {
    try {
      if (!session?.user) {
        alert("로그인이 필요합니다.");
        router.push("/list");
        return;
      }

      if (!itemId) {
        throw new Error("아이템 ID가 없습니다.");
      }

      const finalImageUrls: string[] = [];
      for (let i = 0; i < data.images.length; i++) {
        const image = data.images[i];

        if (image.startsWith("data:")) {
          const blob = dataUrlToBlob(image);
          const fileExt = guessExtFromDataUrl(image) || "png";
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
          finalImageUrls.push(publicUrlData.publicUrl);
        } else {
          finalImageUrls.push(image);
        }
      }

      const { error: updateError } = await supabase
        .from("items")
        .update({
          name: data.name,
          brand: data.brand,
          price: data.price,
          description: data.description,
          images: finalImageUrls,
          category: data.category,
          seasons: data.seasons,
        })
        .eq("id", itemId)
        .eq("user_id", session.user.id);

      if (updateError) throw updateError;

      router.push(`/item/detail/${itemId}`);
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

  if (isLoading) {
    return (
      <S.Container>
        <Header title={"수정하기"} leftContentType="back" />
        <S.LoadingContainer>로딩 중...</S.LoadingContainer>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <Header title={"수정하기"} leftContentType="back" />
      <ItemPage
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/list")}
        submitButtonText={"수정하기"}
      />
    </S.Container>
  );
}
