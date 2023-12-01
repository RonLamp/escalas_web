import React, { ReactNode } from "react";
import { Grid } from "./styles";

import MainHeader from "../Header";
import Aside from "../Aside";
import Content from "../Content";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <Grid>
      <MainHeader />
      <Aside />
      <Content>{children}</Content>
    </Grid>
  );
};

export default Layout;
