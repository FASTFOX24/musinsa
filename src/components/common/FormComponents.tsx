import styled from "styled-components";

// Form Components
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

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

// Button Components
export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  @media (max-width: 767px) {
    flex-direction: column;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    flex-direction: row;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const CancelButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #666666;
  padding: 12px 24px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background-color: #ffffff;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
    border-color: #d5d5d5;
  }

  @media (max-width: 767px) {
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    width: auto;
  }

  @media (min-width: 1024px) {
    width: auto;
  }
`;

export const SubmitButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  padding: 12px 24px;
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

  @media (max-width: 767px) {
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    width: auto;
  }

  @media (min-width: 1024px) {
    width: auto;
  }
`;

// Layout Components
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
  margin: 0 auto;
  width: 100%;
  margin-top: 60px;

  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 30px 20px;
  }

  @media (min-width: 1024px) {
    padding: 40px 20px;
  }
`;
