import React, { useState } from "react";

import logoImg from "../../../assets/escala.svg";
import rightImg from "../../../assets/verifyEmail.svg"
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

const ChangePass: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleVerifyEmail = async () => {
    try {
      await api.post("/api/sendverifyemail", { email: email });
      alert("Email para verificação de e-mail enviado com Sucesso!");
      navigate("/");
    } catch (error: any) {
      alert("Erro na solicitação de Verificação de e-mail!");
      console.error(error);
      console.log(error.status);

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
            <SmallText>Vamos verificar seu e-mail</SmallText>
          </DividerText>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyEmail();
            }}
          >
            <p>EMAIL</p>
            <input
              required
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Verificar</button>
          </Form>
          <LinkContainer>
            <MenuItemLink to="/">Tenho outro email para logar</MenuItemLink>
          </LinkContainer>
        </SubContainerLeft>
        <SubContainerRight>
          <img
            src={rightImg}
            alt=""
          />
        </SubContainerRight>
      </LoginContainer>

    </Container >
  );
};

export default ChangePass;
