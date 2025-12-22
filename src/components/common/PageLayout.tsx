import React from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import { Container, MainContent } from "./FormComponents";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <Container>
      <Header title={title} leftContentType="back" />
      <MainContent>
        {children}
      </MainContent>
    </Container>
  );
};
