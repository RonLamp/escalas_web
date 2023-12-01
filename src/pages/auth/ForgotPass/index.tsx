import React, { useState } from "react";

import logoImg from "../../../assets/escala.svg";
import rightImg from "../../../assets/forgotPassw.svg"
import {
  Container,
  LoginContainer,
  SubContainerLeft,
  SubContainerRight,
  Logo, DividerText, SmallText,
  Form,
  LinkContainer,
  MenuItemLink,

} from "../styles";
import { api } from "../../../resources/api";
import { useNavigate } from "react-router-dom";

const ForgotPass: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleForgotPass = async () => {
    try {
      await api.post("/api/sendchangepassemail", { email: email });
      alert("Email para troca de senha enviado com Sucesso!");
    } catch (error: any) {
      console.log(`Erro na Verificação de e-mail ${error.response.status}`);
    }
  };

  return (
    <Container>
      <LoginContainer>
        <SubContainerLeft>
          <Logo>
            <img src={logoImg} alt="Agenda Logo" />
          </Logo>
          <DividerText>
            <SmallText>Solicite sua troca de senha por email</SmallText>
          </DividerText>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleForgotPass();
              navigate("/");
            }}
          >
            <p>EMAIL</p>
            <input
              required
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Solicitar</button>
          </Form>
          <LinkContainer>
            <MenuItemLink to="/">Me lembrei da senha</MenuItemLink>
          </LinkContainer>
        </SubContainerLeft>
        <SubContainerRight>
          <img
            src={rightImg}
            alt=""
          />
        </SubContainerRight>
      </LoginContainer>
    </Container>
  );
};

export default ForgotPass;
