import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: 70px auto 0;
  width: 100%;
`;

export const LoadingText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #666666;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 40px;
  }
`;

export const ImageSection = styled.div`
  flex: 1;
`;

export const MainImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  min-height: 300px;
  background-color: #f5f5f5;

`;

export const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PreviousButton = styled.button`
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

export const NextButton = styled.button`
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

export const ImageCounter = styled.div`
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

export const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ItemTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333333;
  margin: 0;
`;

export const Price = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #111111;
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333333;
`;

export const SeasonTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const SeasonTag = styled.span`
  font-size: 14px;
  font-weight: 600;
  padding: 6px 12px;
  border: 1px solid #111111;
  border-radius: 16px;
  background-color: #111111;
  color: #ffffff;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #666666;
  line-height: 1.6;
  margin: 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const EditButton = styled.button`
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

export const DeleteButton = styled.button`
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

export const DeleteModal = styled.div`
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

export const ModalContent = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 16px 0;
`;

export const ModalMessage = styled.p`
  font-size: 14px;
  color: #666666;
  margin: 0 0 24px 0;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const CancelButton = styled.button`
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

export const ConfirmDeleteButton = styled.button`
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

