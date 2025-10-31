import styled from "styled-components";

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333333;
`;

export const Required = styled.span`
  color: #ff4444;
  font-weight: 600;
`;

export const ImageUploadArea = styled.div`
  position: relative;
  display: inline-block;
`;

export const ImageInput = styled.input`
  position: absolute;
  left: -9999px;
  opacity: 0;
`;

export const ImageUploadButton = styled.label`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: #666666;
  padding: 12px 24px;
  border: 2px dashed #e5e5e5;
  border-radius: 6px;
  background-color: #fafafa;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #d5d5d5;
    background-color: #f5f5f5;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  min-height: 120px;

  @media (min-width: 768px) {
    aspect-ratio: 1;
    min-height: 150px;
  }

  @media (min-width: 1024px) {
    aspect-ratio: 1;
    min-height: 180px;
  }
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

export const RepresentativeBadge = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #111111 0%, #333333 100%);
  color: #ffffff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: -0.2px;
  padding: 6px 10px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  backdrop-filter: saturate(120%) blur(2px);
  pointer-events: none;
  user-select: none;
`;

export const RepresentativeHighlight = styled.div`
  position: absolute;
  inset: 0;
  border: 2px solid #111111;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4);
  pointer-events: none;
`;
