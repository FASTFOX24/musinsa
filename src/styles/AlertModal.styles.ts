import styled from "styled-components";

export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  max-width: 380px;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  color: #333333;
  margin: 0 0 16px 0;
`;

export const ModalBody = styled.div`
  margin: 16px 0 24px 0;
`;

export const ModalText = styled.p`
  font-size: 16px;
  
  color: #333333;
  line-height: 1.6;
  margin: 0;
  text-align: center;
  white-space: pre-line;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const ConfirmButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: #111111;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #222222;
  }
`;

export const CancelButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #666666;
  padding: 10px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f8f8;
    border-color: #d5d5d5;
  }
`;

