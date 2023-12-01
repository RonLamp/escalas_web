import React from "react";

import { Container } from "./styles";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // customProp: string;
}

const Button: React.FC<IButtonProps> = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>
}

export default Button;
