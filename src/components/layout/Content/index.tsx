import React, { ReactNode } from "react";
import { Container } from "./styles";

interface IContentProps {
  children: ReactNode;
}

const Content: React.FC<IContentProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Content;
