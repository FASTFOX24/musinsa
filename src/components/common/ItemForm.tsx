import React from "react";
import { usePriceFormat } from "@/hooks/usePriceFormat";
import { ImageUpload } from "./ImageUpload";
import { SeasonTags } from "./SeasonTags";
import {
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  CancelButton,
  SubmitButton,
} from "./FormComponents";

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

interface ItemFormProps {
  initialData?: Partial<ItemFormData>;
  onSubmit: (data: ItemFormData) => void;
  onCancel: () => void;
  submitButtonText: string;
  loadingText: string;
  isLoading: boolean;
}

export const ItemForm: React.FC<ItemFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
  submitButtonText,
  loadingText,
  isLoading,
}) => {
  const [brand, setBrand] = React.useState(initialData.brand || "");
  const [description, setDescription] = React.useState(initialData.description || "");
  const [images, setImages] = React.useState<string[]>(initialData.images || []);
  const [seasons, setSeasons] = React.useState({
    spring: false,
    summer: false,
    autumn: false,
    winter: false,
    ...initialData.seasons,
  });

  const { value: price, handleChange: handlePriceChange } = usePriceFormat(initialData.price || "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (images.length >= 4) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImages((prev) => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSeasonChange = (season: keyof typeof seasons) => {
    setSeasons((prev) => ({
      ...prev,
      [season]: !prev[season],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0 || !Object.values(seasons).some(Boolean)) return;

    onSubmit({
      brand,
      price,
      description,
      images,
      seasons,
    });
  };

  const isSubmitDisabled = isLoading || images.length === 0 || !Object.values(seasons).some(Boolean);

  return (
    <Form onSubmit={handleSubmit}>
      <ImageUpload
        images={images}
        onImageUpload={handleImageUpload}
        onRemoveImage={handleRemoveImage}
      />

      <SeasonTags
        seasons={seasons}
        onSeasonChange={handleSeasonChange}
      />

      <FormGroup>
        <Label htmlFor="brand">브랜드</Label>
        <Input
          id="brand"
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="브랜드를 입력하세요"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="price">가격</Label>
        <Input
          id="price"
          type="text"
          value={price}
          onChange={(e) => handlePriceChange(e.target.value)}
          placeholder="가격을 입력하세요"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="description">상세 정보</Label>
        <TextArea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="상세 정보를 입력하세요"
          rows={4}
        />
      </FormGroup>

      <ButtonGroup>
        <CancelButton type="button" onClick={onCancel}>
          취소
        </CancelButton>
        <SubmitButton type="submit" disabled={isSubmitDisabled}>
          {isLoading ? loadingText : submitButtonText}
        </SubmitButton>
      </ButtonGroup>
    </Form>
  );
};
