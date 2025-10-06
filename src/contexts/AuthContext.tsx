import { createContext, useState, useEffect, type ReactNode } from "react";
import { login as loginService } from "@/services/auth/login";
import type { User } from "@/@types/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ao montar, pega do localStorage (se existir) e inicializa o contexto
    const storedAccess = localStorage.getItem("accessToken");
    const storedRefresh = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("user");

    if (storedAccess) setAccessToken(storedAccess);
    if (storedRefresh) setRefreshToken(storedRefresh);
    if (storedUser) setUser(JSON.parse(storedUser));
    console.log('Token', storedAccess)
    console.log('Token(StoredAccess)', storedAccess)
    console.log('Token(accessToken)', accessToken)
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // sua service de login deve retornar { user, accessToken, refreshToken }
    const { user: loggedUser, accessToken: at, refreshToken: rt } = await loginService({
      data: { email, password },
    });

    localStorage.setItem("accessToken", at);
    localStorage.setItem("refreshToken", rt);
    localStorage.setItem("user", JSON.stringify(loggedUser));

    setUser(loggedUser);
    setAccessToken(at);
    setRefreshToken(rt);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, accessToken, refreshToken, login, logout }}
    >
      {!loading && children} {/* você já usa !loading no seu código */}
    </AuthContext.Provider>
  );
}
