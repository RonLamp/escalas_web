import React, { ReactNode, createContext, useState, useContext } from "react";
import { api } from "../resources/api";
import { useNavigate } from "react-router-dom";

export interface ILoggedProps {
  token: string;
  name: string;
  email: string;
  avatar_url: string;
  level: number;
  //customer_id: string;
  verified: boolean;
}

interface IAuthContext {
  logged: ILoggedProps;
  signIn(credentials: ICredential): void;
  signOut(): void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface ICredential {
  email: string;
  password: string;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const initialState: ILoggedProps = {
    token: "",
    name: "",
    email: "",
    avatar_url: "",
    level: 10,
    //customer_id: "",
    verified: false,
  };

  const [logged, setLogged] = useState<ILoggedProps>(() => {
    const isLogged = localStorage.getItem("@agenda:auth");
    if (!!isLogged) {
      return JSON.parse(isLogged);
    } else {
      return initialState;
    }
  });

  const signIn = async ({ email, password }: ICredential) => {
    //console.log(api);
    try {
      const response = await api.post("api/login", {
        email: email,
        password: password,
      });
      //console.log(response.data);
      const { token } = response.data;


      const { name, level, avatar_url, verified } =
        response.data.userInfo as ILoggedProps;
      if (!verified) {
        return alert("Email não foi verificado, por favor verifique-o!");
      }
      const logged_here = {
        token: token,
        name: name,
        email: email,
        level: level,
        avatar_url: avatar_url,
        //customer_id: customer_id,
        verified: verified
      };
      setLogged(logged_here);
      localStorage.setItem("@agenda:auth", JSON.stringify(logged_here));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          alert("Login ou senha inválidos. Por favor, tente novamente.");
        } else if (statusCode === 403) {
          alert("Acesso proibido. Verifique suas credenciais.");
        } else if (statusCode === 404) {
          alert("Endpoint não encontrado.");
        } else {
          alert("Ocorreu um erro na autenticação. Por favor, tente novamente.");
        }
        //console.log("Código de status:", statusCode);
        //console.log("Mensagem de erro:", error.message);
      } else {
        // Caso ocorra um erro que não seja uma resposta da API (por exemplo, falha de conexão)
        alert("Ocorreu um erro na comunicação com o servidor.");
        console.log("Erro:", error.message);
      }
    }
  };

  const signOut = () => {
    api.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("@agenda:auth");
    setLogged(initialState);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ logged, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
