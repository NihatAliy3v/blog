import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

type AuthContextType = {
  isLoggedIn: boolean;
  login: (data: { accessToken: string; refreshToken: string }) => void;
  user: JwtPayload | null|undefined;
};

type ChildrenType = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<ChildrenType> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<JwtPayload | null|undefined>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      setIsLoggedIn(true);
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);
  const login = (data: { accessToken: string; refreshToken: string }) => {
    setIsLoggedIn(true);
    localStorage.setItem("access-token", data?.accessToken);
    const decoded = jwtDecode(data.accessToken);
    setUser(decoded);
    navigate("/");
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, user }}>
      {children}
    </AuthContext.Provider>
  );
};
