import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyles } from "./styles/GlobalStyles";
import { ThemeProvider } from "./hooks/theme";
import { AuthProvider } from "./hooks/auth";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//import Dark from "./styles/themes/Dark.ts";
//import Light from "./styles/themes/Light.ts";
//import { useTheme } from "./hooks/theme.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <DndProvider backend={HTML5Backend}>
          <AuthProvider>
            <GlobalStyles />
            <App />
          </AuthProvider>
        </DndProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);