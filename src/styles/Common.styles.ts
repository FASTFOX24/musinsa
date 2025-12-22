import styled from "styled-components";

// 공통 Form 스타일
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

// 공통 Input 스타일
export const Input = styled.input`
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background-color: #ffffff;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #111111;
  }

  &::placeholder {
    color: #999999;
  }
`;

export const TextArea = styled.textarea`
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background-color: #ffffff;
  transition: border-color 0.2s ease;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #111111;
  }

  &::placeholder {
    color: #999999;
  }
`;

// 공통 Button 스타일
export const PrimaryButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  background-color: #111111;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #222222;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #666666;
  padding: 12px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background-color: #ffffff;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
    border-color: #d5d5d5;
  }
`;

// 공통 Layout 스타일
export const Container = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 30px 20px;
  }

  @media (min-width: 1024px) {
    padding: 40px 20px;
  }
`;

// 공통 Grid 스타일
export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, minmax(0, 1fr));
  gap: 12px;

  @media (min-width: 768px) and (max-width: 1023px) {
    gap: 16px;
  }

  @media (min-width: 1024px) {
    gap: 20px;
  }
`;

// 공통 Flex 스타일
export const FlexContainer = styled.div<{ 
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  gap?: string;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
  gap: ${props => props.gap || '0'};
`;
