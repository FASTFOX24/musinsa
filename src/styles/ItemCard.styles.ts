import styled from "styled-components";

export const CardContainer = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 0;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #f5f5f5;

  @media (min-width: 768px) {
    height: 220px;
  }
`;

export const ItemInfo = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SeasonTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const SeasonTag = styled.span`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: #f0f0f0;
  color: #666666;

  @media (min-width: 768px) {
    font-size: 13px;
    padding: 5px 10px;
  }
`;
