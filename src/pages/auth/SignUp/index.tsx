import React, { useState } from "react";

import logoImg from "../../../assets/escala.svg";
import rightImg from "../../../assets/SignUp.svg"
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
  Logo,
  DividerText,
  SmallText,
  Form,
  LinkContainer,
  MenuItemLink,
} from "../styles";
//import { useAuth } from "../../../hooks/auth";
import { api } from "../../../resources/api";


const SignUp: React.FC = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const signUp = async () => {
    //console.log({ email, password });
    try {
      const response = await api.post("/api/signup", { email, password });
      alert("Conta criada com sucesso!");
      console.log(response.data);
    } catch (error) {
      alert("Erro ao criar conta, tente mais tarde ou entre em contato com lamp@rc12.net");
      console.log(error);
    }
  }


  return (
    <Container>
      <LoginContainer>
        <SubContainerLeft>
          <Logo>
            <img src={logoImg} alt="Agenda Logo" />
          </Logo>
          <DividerText>
            <SmallText>Informe seu email e senha para criar uma conta</SmallText>
          </DividerText>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              signUp();
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
            <button
              type="submit"
            >Criar</button>
          </Form>
          <LinkContainer>
            <MenuItemLink to="/">Eu tenho conta.</MenuItemLink>
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
}

export default SignUp;
