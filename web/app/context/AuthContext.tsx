import { useNavigate } from "@remix-run/react";
import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface SignInCredentials { 
    email: string;
    password: string;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): void;
    signUp(credentials: SignUpCredentials): void;
    user: string;
    isAuth: boolean;
    signOut: () => void;
}

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState("");
    const [credentials, setCredentials] = useState<SignInCredentials | null>(
        null,
    );
    const isAuth = !!user;
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("@btv-user");
        if (loggedInUser) {
        const { id, token } = JSON.parse(loggedInUser);
        setUser(id);
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        } else {
        setUser("");
        }
    }, [navigate]);

    useEffect(() => {
        if (credentials) {
          const signIn = async () => {
            try {
              const response = await api.post("users/login", credentials);
              const { token, user } = response.data;
              const { id } = user;
      
              localStorage.setItem("@btv-user", JSON.stringify({ id, token }));
      
              setCookie(undefined, "btvAuth.token", token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
              });
      
              api.defaults.headers["Authorization"] = `Bearer ${token}`;
      
              setUser(id);
      
              navigate("/home");
            } catch (err) {
              setUser("");
              console.error(err);
            } finally {
              setCredentials(null);
            }
          };
      
          signIn();
        }
      }, [credentials, navigate]);
      

      function signIn(credentials: SignInCredentials) {
        setCredentials(credentials);
      }

      useEffect(() => {
        if (credentials) {
          const signUp = async () => {
            try {
              const response = await api.post("users/signup", credentials);
              console.log(response, "Cadastro bem sucedido");
      
              navigate("/");
            } catch (err) {
              setUser("");
              console.error(err);
            } finally {
              setCredentials(null);
            }
          };
      
          signUp();
        }
      }, [credentials, navigate]);

      function signUp(credentials: SignUpCredentials) {
        setCredentials(credentials);
      }

      function signOut() {
        destroyCookie(undefined, "btvAuth.token");
        localStorage.removeItem("@btv-user");
        setUser("");
        navigate("/");
      }

      return (
        <AuthContext.Provider
          value={{
            signIn,
            signUp,
            isAuth,
            user,
            signOut,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
}