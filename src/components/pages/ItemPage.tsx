"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import { PageLayout } from "@/components/common/PageLayout";
import { ItemForm } from "@/components/common/ItemForm";
import { dataUrlToBlob, guessExtFromDataUrl } from "@/utils/image";

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
  const session = useSession();
  const supabase = supabaseBrowserClient();
  
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
    const fetchItemData = async () => {
      if (pageMode !== 'edit' || !itemId || !session?.user) {
        return;
      }

      setIsLoadingData(true);
      try {
        const { data, error } = await supabase
          .from('items')
          .select('*')
          .eq('id', itemId)
          .eq('user_id', session.user.id)
          .single();

        if (error) throw error;

        if (data) {
          setInitialData({
            brand: data.brand || '',
            price: data.price || '',
            description: data.description || '',
            images: data.images || [],
            seasons: data.seasons || {
              spring: false,
              summer: false,
              autumn: false,
              winter: false
            }
          });
        } else {
          alert('아이템을 찾을 수 없습니다.');
          router.push('/');
        }
      } catch (error: any) {
        console.error('아이템 데이터 로딩 실패:', error);
        alert('아이템을 불러오는데 실패했습니다.');
        router.push('/');
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchItemData();
  }, [pageMode, itemId, session, supabase, router]);

  const handleSubmit = async (data: ItemFormData) => {
    setLoading(true);
    try {
      if (!session?.user) {
        alert("로그인이 필요합니다.");
        router.push("/");
        return;
      }

      if (pageMode === 'add') {
        // 1) 이미지 업로드 (dataURL -> Blob 변환 후 Storage 업로드)
        const uploadedImageUrls: string[] = [];
        for (let i = 0; i < data.images.length; i++) {
          const dataUrl = data.images[i];
          const blob = dataUrlToBlob(dataUrl);
          const fileExt = guessExtFromDataUrl(dataUrl) || 'png';
          const filePath = `${session.user.id}/${Date.now()}-${i}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from('item-images')
            .upload(filePath, blob, { upsert: false, contentType: blob.type || `image/${fileExt}` });
          if (uploadError) throw uploadError;

          const { data: publicUrlData } = supabase.storage.from('item-images').getPublicUrl(filePath);
          uploadedImageUrls.push(publicUrlData.publicUrl);
        }

        // 2) DB insert
        const seasons = data.seasons;
        const { data: inserted, error: insertError } = await supabase
          .from('items')
          .insert({
            user_id: session.user.id,
            brand: data.brand,
            price: data.price,
            description: data.description,
            images: uploadedImageUrls,
            seasons: seasons,
          })
          .select('id')
          .single();
        
        if (insertError) throw insertError;
        if (!inserted || !inserted.id) {
          throw new Error('아이템 저장 후 ID를 가져오지 못했습니다.');
        }

        // 저장 성공 시 상세 페이지로 이동
        router.push(`/item/detail/${inserted.id}`);
      } else {
        // 수정 모드
        if (!itemId) {
          throw new Error('아이템 ID가 없습니다.');
        }

        // 이미지 처리: dataURL인 경우 새로 업로드, URL인 경우 그대로 사용
        const finalImageUrls: string[] = [];
        for (let i = 0; i < data.images.length; i++) {
          const image = data.images[i];
          
          // dataURL인 경우 (새로 추가된 이미지)
          if (image.startsWith('data:')) {
            const blob = dataUrlToBlob(image);
            const fileExt = guessExtFromDataUrl(image) || 'png';
            const filePath = `${session.user.id}/${Date.now()}-${i}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
              .from('item-images')
              .upload(filePath, blob, { upsert: false, contentType: blob.type || `image/${fileExt}` });
            
            if (uploadError) throw uploadError;
            
            const { data: publicUrlData } = supabase.storage.from('item-images').getPublicUrl(filePath);
            finalImageUrls.push(publicUrlData.publicUrl);
          } else {
            // 기존 URL인 경우 그대로 사용
            finalImageUrls.push(image);
          }
        }

        // DB 업데이트
        const { error: updateError } = await supabase
          .from('items')
          .update({
            brand: data.brand,
            price: data.price,
            description: data.description,
            images: finalImageUrls,
            seasons: data.seasons,
          })
          .eq('id', itemId)
          .eq('user_id', session.user.id);

        if (updateError) throw updateError;

        // 수정 성공 시 상세 페이지로 이동
        router.push(`/item/detail/${itemId}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`저장 중 오류가 발생했습니다. 다시 시도해주세요.\n${err?.message || ''}`);
    } finally {
      setLoading(false);
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

 
