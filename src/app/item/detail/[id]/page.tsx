"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "@/components/Header";

interface ItemData {
  id: string;
  brand: string;
  price: string;
  description: string;
  images: string[];
  seasons: {
    spring: boolean;
    summer: boolean;
    autumn: boolean;
    winter: boolean;
  };
}

export default function ItemDetail() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // 임시 샘플 데이터 (실제로는 API에서 가져와야 함)
    const sampleData: ItemData = {
      id: itemId,
      brand: "나이키",
      price: "89,000",
      description: "편안한 착용감과 세련된 디자인의 운동화입니다. 일상복과 캐주얼룩 모두에 잘 어울립니다.",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
      ],
      seasons: {
        spring: true,
        summer: true,
        autumn: true,
        winter: false
      }
    };
    setItemData(sampleData);
  }, [itemId]);

  const handleEdit = () => {
    router.push(`/item/edit/${itemId}`);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    // TODO: 실제 삭제 로직 구현
    console.log("아이템 삭제:", itemId);
    router.push("/");
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

  if (!itemData) {
    return (
      <Container>
        <Header title="아이템 상세" />
        <MainContent>
          <LoadingText>로딩 중...</LoadingText>
        </MainContent>
      </Container>
    );
  }

  const activeSeasons = Object.entries(itemData.seasons)
    .filter(([_, isActive]) => isActive)
    .map(([season, _]) => {
      const seasonNames = { spring: "봄", summer: "여름", autumn: "가을", winter: "겨울" };
      return seasonNames[season as keyof typeof seasonNames];
    });

  return (
    <Container>
      <Header title="아이템 상세" />
      
      <MainContent>
        <ItemContainer>
          <ImageSection>
            <MainImageContainer>
              <ItemImage 
                src={itemData.images[currentImageIndex]} 
                alt={`이미지 ${currentImageIndex + 1}`} 
              />
              {itemData.images.length > 1 && (
                <>
                  <PreviousButton onClick={handlePreviousImage}>
                    ‹
                  </PreviousButton>
                  <NextButton onClick={handleNextImage}>
                    ›
                  </NextButton>
                </>
              )}
              <ImageCounter>
                {currentImageIndex + 1} / {itemData.images.length}
              </ImageCounter>
            </MainImageContainer>
          </ImageSection>

          <InfoSection>
            <ItemTitle>{itemData.brand}</ItemTitle>
            <Price>{itemData.price}원</Price>
            
            <InfoGroup>
              <InfoLabel>계절 태그</InfoLabel>
              <SeasonTags>
                {activeSeasons.map((season) => (
                  <SeasonTag key={season}>{season}</SeasonTag>
                ))}
              </SeasonTags>
            </InfoGroup>

            <InfoGroup>
              <InfoLabel>상세 정보</InfoLabel>
              <Description>{itemData.description}</Description>
            </InfoGroup>

            <ButtonGroup>
              <EditButton onClick={handleEdit}>수정</EditButton>
              <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
            </ButtonGroup>
          </InfoSection>
        </ItemContainer>

        {showDeleteConfirm && (
          <DeleteModal>
            <ModalContent>
              <ModalTitle>아이템 삭제</ModalTitle>
              <ModalMessage>정말로 이 아이템을 삭제하시겠습니까?</ModalMessage>
              <ModalButtons>
                <CancelButton onClick={cancelDelete}>취소</CancelButton>
                <ConfirmDeleteButton onClick={confirmDelete}>삭제</ConfirmDeleteButton>
              </ModalButtons>
            </ModalContent>
          </DeleteModal>
        )}
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 768px) {
    padding: 30px 20px;
  }

  @media (min-width: 1024px) {
    padding: 40px 20px;
  }
`;

const LoadingText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #666666;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 40px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
`;

const MainImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  min-height: 300px;
  background-color: #f5f5f5;

  @media (min-width: 768px) {
    min-height: 400px;
  }

  @media (min-width: 1024px) {
    min-height: 500px;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PreviousButton = styled.button`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const NextButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ItemTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333333;
  margin: 0;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #111111;
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333333;
`;

const SeasonTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const SeasonTag = styled.span`
  font-size: 14px;
  font-weight: 600;
  padding: 6px 12px;
  border: 1px solid #111111;
  border-radius: 16px;
  background-color: #111111;
  color: #ffffff;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666666;
  line-height: 1.6;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const EditButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #111111;
  padding: 12px 24px;
  border: 1px solid #111111;
  border-radius: 6px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f8f8;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const DeleteButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  background-color: #ff4444;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff3333;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 16px 0;
`;

const ModalMessage = styled.p`
  font-size: 14px;
  color: #666666;
  margin: 0 0 24px 0;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #666666;
  padding: 8px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const ConfirmDeleteButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #ff4444;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff3333;
  }
`;
