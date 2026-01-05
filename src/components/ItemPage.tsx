import { useState } from "react";
import { usePriceFormat } from "@/hooks/usePriceFormat";
import ImageUpload from "./ImageUpload";
import SeasonTags from "./SeasonTags";
import {
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  CancelButton,
  SubmitButton,
} from "../styles/ItmeForm.styles";
import * as SeasonTagStyles from "@/styles/SeasonTags.styles";
import {
  categoryKeys,
  categoryDisplayNameMap,
  type CategoryKey,
} from "@/utils/category";
import { type ItemFormData, type ItemFormProps } from "@/types/item";

const ItemPage: React.FC<ItemFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
  submitButtonText,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [brand, setBrand] = useState(initialData?.brand || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [category, setCategory] = useState<CategoryKey | "">(
    (initialData?.category as CategoryKey) || ""
  );
  const [seasons, setSeasons] = useState({
    spring: false,
    summer: false,
    autumn: false,
    winter: false,
    ...initialData?.seasons,
  });

  const { value: price, handleChange: handlePriceChange } = usePriceFormat(
    initialData?.price || ""
  );

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
    if (
      !name.trim() ||
      !category ||
      images.length === 0 ||
      !Object.values(seasons).some(Boolean)
    )
      return;

    onSubmit({
      name,
      brand,
      price,
      description,
      images,
      category,
      seasons,
    });
  };

  const isSubmitDisabled =
    !name.trim() ||
    !category ||
    images.length === 0 ||
    !Object.values(seasons).some(Boolean);

  return (
    <Form onSubmit={handleSubmit}>
      <ImageUpload
        images={images}
        onImageUpload={handleImageUpload}
        onRemoveImage={handleRemoveImage}
      />

      <FormGroup>
        <Label htmlFor="name">
          아이템 이름 <SeasonTagStyles.Required>*</SeasonTagStyles.Required>
        </Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="아이템 이름을 입력하세요"
        />
      </FormGroup>

      <SeasonTagStyles.FormGroup>
        <SeasonTagStyles.Label>
          카테고리 <SeasonTagStyles.Required>*</SeasonTagStyles.Required>
        </SeasonTagStyles.Label>
        <SeasonTagStyles.SeasonTagsContainer>
          {categoryKeys.map((categoryKey) => (
            <SeasonTagStyles.SeasonTag
              key={categoryKey}
              type="button"
              $active={category === categoryKey}
              onClick={() =>
                setCategory(category === categoryKey ? "" : categoryKey)
              }
            >
              {categoryDisplayNameMap[categoryKey]}
            </SeasonTagStyles.SeasonTag>
          ))}
        </SeasonTagStyles.SeasonTagsContainer>
      </SeasonTagStyles.FormGroup>

      <SeasonTags seasons={seasons} onSeasonChange={handleSeasonChange} />

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
        <SubmitButton type="submit" disabled={isSubmitDisabled}>
          {submitButtonText}
        </SubmitButton>
        <CancelButton type="button" onClick={onCancel}>
          취소
        </CancelButton>
      </ButtonGroup>
    </Form>
  );
};

export default ItemPage;
