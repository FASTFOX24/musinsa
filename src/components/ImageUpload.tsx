import React from "react";
import * as S from "@/styles/ImageUpload.styles";
import { type ImageUploadProps } from "@/types/component";

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImageUpload,
  onRemoveImage,
}) => {
  return (
    <S.FormGroup>
      <S.Label>
        이미지 (최대 4개) <S.Required>*</S.Required>
      </S.Label>
      <S.ImageUploadArea>
        <S.ImageInput
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={onImageUpload}
          disabled={images.length >= 4}
        />
        <S.ImageUploadButton 
          htmlFor={images.length >= 4 ? "" : "image-upload"}
          style={{ 
            cursor: images.length >= 4 ? 'not-allowed' : 'pointer',
            opacity: images.length >= 4 ? 0.5 : 1 
          }}
        >
          {images.length >= 4 ? "최대 4개까지 추가 가능" : "이미지 추가"}
        </S.ImageUploadButton>
      </S.ImageUploadArea>

      {images.length > 0 && (
        <S.ImageGrid>
          {images.map((image, index) => (
            <S.ImageContainer key={index}>
              {index === 0 && (
                <>
                  <S.RepresentativeBadge aria-label="대표 이미지">
                    대표
                  </S.RepresentativeBadge>
                  <S.RepresentativeHighlight />
                </>
              )}
              <S.ImagePreview src={image} alt={`이미지 ${index + 1}`} />
              <S.RemoveImageButton type="button" onClick={() => onRemoveImage(index)}>
                ×
              </S.RemoveImageButton>
            </S.ImageContainer>
          ))}
        </S.ImageGrid>
      )}
    </S.FormGroup>
  );
};

export default ImageUpload;

