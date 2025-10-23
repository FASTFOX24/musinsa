import React from "react";
import {
  FormGroup,
  Label,
  Required,
  ImageUploadArea,
  ImageInput,
  ImageUploadButton,
  ImageGrid,
  ImageContainer,
  ImagePreview,
  RemoveImageButton,
} from "@/styles/ImageUpload.styles";

interface ImageUploadProps {
  images: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImageUpload,
  onRemoveImage,
}) => {
  return (
    <FormGroup>
      <Label>
        이미지 (최대 4개) <Required>*</Required>
      </Label>
      <ImageUploadArea>
        <ImageInput
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={onImageUpload}
          disabled={images.length >= 4}
        />
        <ImageUploadButton 
          htmlFor={images.length >= 4 ? "" : "image-upload"}
          style={{ 
            cursor: images.length >= 4 ? 'not-allowed' : 'pointer',
            opacity: images.length >= 4 ? 0.5 : 1 
          }}
        >
          {images.length >= 4 ? "최대 4개까지 추가 가능" : "이미지 추가"}
        </ImageUploadButton>
      </ImageUploadArea>

      {images.length > 0 && (
        <ImageGrid>
          {images.map((image, index) => (
            <ImageContainer key={index}>
              <ImagePreview src={image} alt={`이미지 ${index + 1}`} />
              <RemoveImageButton type="button" onClick={() => onRemoveImage(index)}>
                ×
              </RemoveImageButton>
            </ImageContainer>
          ))}
        </ImageGrid>
      )}
    </FormGroup>
  );
};

