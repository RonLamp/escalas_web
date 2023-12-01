import React from "react";

import rightImg from "../../../assets/errorPage404.svg"
import {
  Container,
  LoginContainer,
  ErrorContainer,
} from "../styles";

const ErrorPage: React.FC = () => {
  return (
    <Container>
      <LoginContainer>
        <ErrorContainer>
          <img src={rightImg} alt="Error Page 404" />
        </ErrorContainer>
      </LoginContainer>
    </Container>
  );
};

export default ErrorPage;
