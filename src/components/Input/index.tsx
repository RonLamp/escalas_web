import React from "react";

import { Container } from "./styles";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // customProp: string;
}

const Input: React.FC<IInputProps> = ({ ...rest }) => {
  return <Container {...rest} />;
};

export default Input;
