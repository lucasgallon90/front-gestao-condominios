import { createContext, useState, useEffect, useContext } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";
import { recoverUserInformation, signInRequest, registerUser } from "src/services/auth";
import api from "src/services/api";

const UserContext = createContext({});

export default function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const isAuthenticated = !!user;

  async function signIn({email, senha}) {
    const result = await signInRequest(email, senha);
    if (!result?.user) {
      return false;
    }
    setCookie(undefined, ["gc.token"], result?.token, {
      maxAge: 60 * 60 * 24, //24 horas
    });
    api.defaults.headers["Authorization"] = `Bearer ${result?.token}`;
    setUser(result?.user);
    return true;
  }

  async function register(params) {
    const result = await registerUser(params);
    if (!result?.userCreated) {
      return false;
    }
    setCookie(undefined, ["gc.token"], result?.token, {
      maxAge: 60 * 60 * 24, //24 horas
    });
    api.defaults.headers["Authorization"] = `Bearer ${result?.token}`;
    setUser(result?.userCreated);
    return true;
  }

  useEffect(() => {
    const { ["gc.token"]: token } = parseCookies();
    if (token) {
      recoverUserInformation(token).then((response) => {
        if (!response) {
          router.push("/login");
        } else {
          setUser(response.user);
          setCookie(undefined, "gc.token", response.refreshToken, {
            maxAge: 60 * 60 * 24, //24 horas
            path: "/",
          });
        }
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, signIn, register }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
