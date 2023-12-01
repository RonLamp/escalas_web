//import React, { useState } from "react";
//import { Container, Profile, Welcome, UserName } from "./styles";
import { Container } from "./styles";
//import Toogle from "../Toogle";
//import { useTheme } from "../../../hooks/theme";
//import { useAuth } from "../../../hooks/auth";

const Header: React.FC = () => {
  /*  const { theme, toogleTheme } = useTheme();
   //const { logged } = useAuth();
 
   const [darkTheme, setDarkTheme] = useState<boolean>(
     () => theme.title === "dark"
   );
 
   const handleChengeTheme = () => {
     setDarkTheme(!darkTheme);
     toogleTheme();
   }; */


  return (
    <Container>
      {/*       <Toogle
        labelLeft="Light"
        labelRight="Dark"
        checked={darkTheme}
        handleChange={handleChengeTheme}
      /> */}
      {/*       <Profile>
        <Welcome>Olá, </Welcome>
        <UserName>{logged.name}</UserName>
      </Profile> */}
    </Container>
  );
};

export default Header;
