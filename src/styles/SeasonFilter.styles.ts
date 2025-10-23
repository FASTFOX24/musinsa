import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  padding: 12px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #d5d5d5;
    background-color: #f8f8f8;
  }

  &:focus {
    outline: none;
    border-color: #111111;
  }

  @media (min-width: 768px) {
    width: 220px;
    padding: 14px 18px;
  }
`;

export const DropdownText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333333;

  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

export const DropdownArrow = styled.span<{ $isOpen: boolean }>`
  font-size: 12px;
  color: #666666;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
`;

export const DropdownItem = styled.div<{ $isSelected: boolean }>`
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => (props.$isSelected ? "#111111" : "#666666")};
  background-color: ${(props) => (props.$isSelected ? "#f8f8f8" : "#ffffff")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #111111;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }

  @media (min-width: 768px) {
    padding: 14px 18px;
    font-size: 15px;
  }
`;
