import React, { useState } from "react";
import { useAuth } from "../../../hooks/auth";
import {
   Container,
   Header,
   LogImg,
   Title,
   MenuContainer,
   MenuItemLink,
   MenuItemButton,
   Profile,
   UserName,
   Welcome,
   ToggleContainer,
} from "./styles";
import logoImg from "../../../assets/escala.svg";
import {
   MdDashboard,
   //MdContactPage,
   MdExitToApp,
   MdPeopleAlt,
   //MdList,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Toogle from "../Toogle";
import { useTheme } from "../../../hooks/theme";


const Aside: React.FC = () => {
   const { signOut, logged } = useAuth();
   const navigate = useNavigate();
   const { level } = logged;

   const { theme, toogleTheme } = useTheme();
   //const { logged } = useAuth();

   const [darkTheme, setDarkTheme] = useState<boolean>(
      () => theme.title === "dark"
   );

   const handleChangeTheme = () => {
      setDarkTheme(!darkTheme);
      toogleTheme();
   };



   return (
      <Container>
         <Header>
            <LogImg src={logoImg} alt="Logo de Agenda" />
            <Title>Escalas</Title>
         </Header>

         <Profile>
            <Welcome>User, </Welcome>
            <UserName>{logged.name}</UserName>
         </Profile>

         <MenuContainer>

            {level === 0 && (
               <>

                  <MenuItemLink to="/"><MdDashboard />DashBoard</MenuItemLink>
                  <MenuItemLink to="/CadGroup"><MdPeopleAlt />Cad Grupos</MenuItemLink>
                  <MenuItemLink to="/CadProfiss"><MdPeopleAlt />Cad Profis</MenuItemLink>
                  <MenuItemLink to="/CadScale"><MdPeopleAlt />Cad Horários</MenuItemLink>
                  <MenuItemLink to="/CadProfGroup"><MdPeopleAlt />Prof./Grupo</MenuItemLink>
               </>
            )}

            {level === 1 && (
               <>
                  <MenuItemLink to="/"><MdDashboard />Dashboard</MenuItemLink>
                  <MenuItemLink to="/CadGroup"><MdPeopleAlt />Cad Grupos</MenuItemLink>
                  <MenuItemLink to="/CadProfiss"><MdPeopleAlt />Cad Profis</MenuItemLink>
                  <MenuItemLink to="/CadScale"><MdPeopleAlt />Cad Horários</MenuItemLink>
                  <MenuItemLink to="/CadProfGroup"><MdPeopleAlt />Prof./Grupo</MenuItemLink>
               </>
            )}

            {level === 2 && (
               <>
                  <MenuItemLink to="/"><MdDashboard />Dashboard</MenuItemLink>
                  <MenuItemLink to="/CadGroup"><MdPeopleAlt />Cad Grupos</MenuItemLink>
                  <MenuItemLink to="/CadProfiss"><MdPeopleAlt />Cad Profis</MenuItemLink>
                  <MenuItemLink to="/CadScale"><MdPeopleAlt />CadHorários</MenuItemLink>
                  <MenuItemLink to="/CadProfGroup"><MdPeopleAlt />Prof./Grupo</MenuItemLink>
               </>
            )}

         </MenuContainer>
         <MenuItemButton
            onClick={(e) => {
               e.preventDefault();
               signOut();
               navigate("/");
            }}
         >
            <MdExitToApp />
            Sair
         </MenuItemButton>
         <ToggleContainer>
            <Toogle
               labelLeft="Light"
               labelRight="Dark"
               checked={darkTheme}
               handleChange={handleChangeTheme}
            />
         </ToggleContainer>

      </Container>
   );
};

export default Aside;
