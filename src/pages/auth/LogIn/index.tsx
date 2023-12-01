import React, { useState } from "react";

import logoImg from "../../../assets/escala.svg";
import rightImg from "../../../assets/g10.svg"
//--- imports para Login Social
// import googleLogo from "../../../assets/google.svg";
// import facebookLogo from "../../../assets/facebook.svg";
// import { getGoogleUrl } from "../../../resources/getGoogleUrl"
// import { useLocation } from "react-router-dom";
// import { MenuItemLinkA, LinkAContainer } from "./styles";

import {
  Container,
  LoginContainer,
  SubContainerLeft,
  SubContainerRight,
  Logo, DividerText, SmallText,
  Form, LinkContainer,
  MenuItemLink,
} from "../styles";
import { useAuth } from "../../../hooks/auth";
// import { api } from "../../../resources/api";


const LogIn: React.FC = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signIn } = useAuth();
  //---  Variaveis para Login Social
  // const location = useLocation();
  // const from = ((location.state as any)?.from.pathname as string) || "/profile";

  return (
    <Container>
      <LoginContainer>
        <SubContainerLeft>
          <Logo>
            <img src={logoImg} alt="Agenda Logo" />
          </Logo>
          <DividerText>
            <SmallText>Informe seu email e senha para logar</SmallText>
          </DividerText>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              signIn({ email, password });
            }}
          >
            <p>EMAIL</p>
            <input
              required
              type="email"
              placeholder="e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>SENHA</p>
            <input
              required
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Logar</button>
          </Form>
          <LinkContainer>
            <MenuItemLink to="/ForgotPass">Trocar a senha</MenuItemLink>
            <MenuItemLink to="/VerifyEmail">Verificar E-mail</MenuItemLink>
            {/*  <MenuItemLink to="/SignUp">Criar uma conta</MenuItemLink> */}
          </LinkContainer>
          {/* <LinkAContainer>
            <MenuItemLinkA href={getGoogleUrl(from)} role="button">
              <img
                src={googleLogo}
                alt=""
              />Google
            </MenuItemLinkA>
            <MenuItemLinkA href={getGoogleUrl(from)} role="button">
              <img
                src={facebookLogo}
                alt=""
              />
              Facebook</MenuItemLinkA>
          </LinkAContainer> */}
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

export default LogIn;
