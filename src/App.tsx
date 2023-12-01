import Layout from "./components/layout/Layout";

import { AppRoutes } from "./routes/AppRoutes";
import { AuthRoutes } from "./routes/AuthRoutes";
import { AdmRoutes } from "./routes/AdmRoutes";
import { useAuth } from "./hooks/auth";

import { ThemeProvider } from "styled-components";
import { useTheme } from "./hooks/theme";

const App: React.FC = () => {
  const { theme } = useTheme();
  const { logged } = useAuth();
  const { level } = logged;

  return (
    <>
      <ThemeProvider theme={theme}>
        {logged.token ?
          (level === 2 ?
            <Layout>
              <AdmRoutes />
            </Layout> :

            <Layout>
              <AppRoutes />
            </Layout>
          )
          :
          <AuthRoutes />
        }
      </ThemeProvider>
    </>
  );
};
export default App;