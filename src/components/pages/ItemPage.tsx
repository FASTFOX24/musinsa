"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { PageLayout } from "@/components/common/PageLayout";
import { ItemForm } from "@/components/common/ItemForm";

interface ItemFormData {
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

type PageMode = 'add' | 'edit';

export default function ItemPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<ItemFormData | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // URL 경로에 따라 페이지 모드 결정
  const pageMode: PageMode = pathname.includes('/edit/') ? 'edit' : 'add';
  const itemId = pageMode === 'edit' ? params.id as string : null;

  // 페이지 제목 결정
  const pageTitle = pageMode === 'add' ? '아이템 추가' : '아이템 수정';

  // 데이터 로딩 (edit 모드일 때만)
  useEffect(() => {
    if (pageMode === 'edit' && itemId) {
      setIsLoadingData(true);
      
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

      // 실제 API 호출을 시뮬레이션
      setTimeout(() => {
        setInitialData({
          brand: sampleData.brand,
          price: sampleData.price,
          description: sampleData.description,
          images: sampleData.images,
          seasons: sampleData.seasons,
        });
        setIsLoadingData(false);
      }, 500);
    }
  }, [pageMode, itemId]);

  const handleSubmit = async (data: ItemFormData) => {
    setLoading(true);
    
    if (pageMode === 'add') {
      // TODO: 실제 아이템 추가 로직 구현
      console.log("아이템 추가:", data);
      
      // 임시로 1초 후 상세 페이지로 이동
      setTimeout(() => {
        router.push("/item/detail/1");
      }, 1000);
    } else {
      // TODO: 실제 아이템 수정 로직 구현
      console.log("아이템 수정:", {
        id: itemId,
        ...data,
      });
      
      // 임시로 1초 후 상세 페이지로 이동
      setTimeout(() => {
        router.push(`/item/detail/${itemId}`);
      }, 1000);
    }
  };

  const handleCancel = () => {
    if (pageMode === 'add') {
      router.push("/");
    } else {
      router.push(`/item/detail/${itemId}`);
    }
  };

  // 데이터 로딩 중일 때
  if (pageMode === 'edit' && isLoadingData) {
    return (
      <PageLayout title={pageTitle}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px',
          fontSize: '18px',
          color: '#666666'
        }}>
          로딩 중...
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={pageTitle}>
      <ItemForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitButtonText={pageMode === 'add' ? '추가하기' : '수정하기'}
        loadingText={pageMode === 'add' ? '추가 중...' : '수정 중...'}
        isLoading={loading}
      />
    </PageLayout>
  );
}
