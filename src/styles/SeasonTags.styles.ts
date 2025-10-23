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

export const SeasonTagsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const SeasonTag = styled.button<{ $active: boolean }>`
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border: 1px solid ${(props) => (props.$active ? "#111111" : "#e5e5e5")};
  border-radius: 20px;
  background-color: ${(props) => (props.$active ? "#111111" : "#ffffff")};
  color: ${(props) => (props.$active ? "#ffffff" : "#666666")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #111111;
    background-color: ${(props) => (props.$active ? "#111111" : "#f8f8f8")};
  }
`;
