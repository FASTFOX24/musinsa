"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import { extractStoragePathFromPublicUrl } from "@/utils/storage";
import { getActiveSeasonNames } from "@/utils/season";
import { getCategoryDisplayName, type CategoryKey } from "@/utils/category";
import * as S from "@/styles/ItemDetailPage.styles";
import { type ItemData } from "@/types/item";

export default function ItemDetail() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;
  const supabase = supabaseBrowserClient();
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchItemData = async () => {
      if (!itemId) return;

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("items")
          .select("*")
          .eq("id", itemId)
          .single();

        if (error) throw error;

        if (data) {
          setItemData({
            id: data.id,
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
  }, [itemId, supabase, router]);

  const handleEdit = () => {
    router.push(`/item/edit/${itemId}`);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!itemId) return;
    setIsDeleting(true);
    try {
      try {
        if (itemData?.images && itemData.images.length > 0) {
          const paths = itemData.images
            .map((url) => extractStoragePathFromPublicUrl(url, "item-images"))
            .filter((p): p is string => !!p);
          if (paths.length > 0) {
            await supabase.storage.from("item-images").remove(paths);
          }
        }
      } catch (e) {
        console.warn("이미지 삭제 중 경고:", e);
      }

      const { error } = await supabase.from("items").delete().eq("id", itemId);
      if (error) throw error;

      setShowDeleteConfirm(false);
      router.push("/list");
    } catch (err) {
      console.error("아이템 삭제 실패:", err);
      alert("아이템 삭제에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handlePreviousImage = () => {
    if (!itemData) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? itemData.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!itemData) return;
    setCurrentImageIndex((prev) =>
      prev === itemData.images.length - 1 ? 0 : prev + 1
    );
  };

  if (isLoading || !itemData) {
    return (
      <S.Container>
        <Header title="아이템 상세" leftContentType="back" />
        <S.MainContent>
          <S.LoadingText>로딩 중...</S.LoadingText>
        </S.MainContent>
      </S.Container>
    );
  }

  const activeSeasons = getActiveSeasonNames(itemData.seasons);

  return (
    <S.Container>
      <Header title="아이템 상세" leftContentType="back" />

      <S.MainContent>
        <S.ItemContainer>
          <S.ImageSection>
            <S.MainImageContainer>
              <S.ItemImage
                src={itemData.images[currentImageIndex]}
                alt={`이미지 ${currentImageIndex + 1}`}
              />
              {itemData.images.length > 1 && (
                <>
                  <S.PreviousButton onClick={handlePreviousImage}>
                    ‹
                  </S.PreviousButton>
                  <S.NextButton onClick={handleNextImage}>›</S.NextButton>
                </>
              )}
              <S.ImageCounter>
                {currentImageIndex + 1} / {itemData.images.length}
              </S.ImageCounter>
            </S.MainImageContainer>
          </S.ImageSection>

          <S.InfoSection>
            <S.ItemTitle>{itemData.name || itemData.brand}</S.ItemTitle>

            <S.InfoGroup>
              <S.InfoLabel>카테고리</S.InfoLabel>
              <S.SeasonTags>
                {itemData.category ? (
                  <S.SeasonTag>
                    {getCategoryDisplayName(itemData.category)}
                  </S.SeasonTag>
                ) : (
                  <></>
                )}
              </S.SeasonTags>
            </S.InfoGroup>

            <S.InfoGroup>
              <S.InfoLabel>계절 태그</S.InfoLabel>
              <S.SeasonTags>
                {activeSeasons.map((season) => (
                  <S.SeasonTag key={season}>{season}</S.SeasonTag>
                ))}
              </S.SeasonTags>
            </S.InfoGroup>

            <S.InfoGroup>
              <S.InfoLabel>브랜드</S.InfoLabel>
              <div>{itemData.brand}</div>
            </S.InfoGroup>

            <S.InfoGroup>
              <S.InfoLabel>가격</S.InfoLabel>
              <S.Price>{itemData.price}원</S.Price>
            </S.InfoGroup>

            <S.InfoGroup>
              <S.InfoLabel>상세 정보</S.InfoLabel>
              <S.Description>{itemData.description}</S.Description>
            </S.InfoGroup>

            <S.ButtonGroup>
              <S.EditButton onClick={handleEdit}>수정</S.EditButton>
              <S.DeleteButton onClick={handleDelete}>삭제</S.DeleteButton>
            </S.ButtonGroup>
          </S.InfoSection>
        </S.ItemContainer>

        {showDeleteConfirm && (
          <S.DeleteModal>
            <S.ModalContent>
              <S.ModalTitle>아이템 삭제</S.ModalTitle>
              <S.ModalMessage>
                정말로 이 아이템을 삭제하시겠습니까?
              </S.ModalMessage>
              <S.ModalButtons>
                <S.CancelButton onClick={cancelDelete}>취소</S.CancelButton>
                <S.ConfirmDeleteButton
                  onClick={confirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "삭제 중..." : "삭제"}
                </S.ConfirmDeleteButton>
              </S.ModalButtons>
            </S.ModalContent>
          </S.DeleteModal>
        )}
      </S.MainContent>
    </S.Container>
  );
}
