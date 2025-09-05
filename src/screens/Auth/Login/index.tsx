import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useAlertSuccess } from "@/hooks/useSuccess";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { alertSuccessLogin } = useAlertSuccess();

  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = "Campo obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email inválido";
    if (!password.trim()) newErrors.password = "Campo obrigatório";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    //Sucesso
    alertSuccessLogin();
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-sm border-none shadow-none bg-gray-100">
          <CardHeader className="flex flex-col items-center">
            <img src="/OrganizationTechLogo.png" alt="OrganizationTech Logo" />
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-3">
              {/* Input Email */}
              <div className="relative flex flex-col">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-500">
                    <User size={18} />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Insira seu email"
                    className={`pl-10 h-12 text-base ${
                      errors.email ? "border-red-500 fade-in-5" : ""
                    }`}
                  />
                </div>
                {errors.email && (
                  <span
                    className={`text-red-500 text-sm mt-1 transition-all duration-300 ease-in-out transform ${
                      errors.email
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                  >
                    {errors.email || "Campo oculto"}
                  </span>
                )}
              </div>

              {/* Input Senha */}
              <div className="relative flex flex-col">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-500">
                    <Lock size={18} />
                  </span>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Insira sua senha"
                    className={`pl-10 h-12 text-base ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <span
                    className={`text-red-500 text-sm mt-1 transition-all duration-300 ease-in-out ${
                      errors.password
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                  >
                    {errors.password || "Campo oculto"}
                  </span>
                )}
              </div>

              {/* Link esqueceu sua senha */}
              <div className="flex justify-end">
                <a
                  onClick={() => navigate("/recoverpass")}
                  className="text-sm text-teal-500 hover:text-teal-700 font-semibold cursor-pointer"
                >
                  Esqueceu sua senha?
                </a>
              </div>

              {/* Botão de login */}
              <Button
                type="submit"
                className="w-full h-12 text-lg bg-teal-500 hover:bg-teal-600 text-white"
              >
                Entrar
              </Button>

              {/* Crie sua conta */}
              <div className="flex justify-center">
                <a
                  onClick={() => navigate("/register")}
                  className="text-sm text-teal-500 hover:text-teal-700 font-medium cursor-pointer"
                >
                  Crie sua conta!
                </a>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>

      {/* Coluna azul */}
      <div
        className="w-full bg-gradient-to-b hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, rgba(18,48,115,0.772), #2563eb)",
        }}
      />
    </div>
  );
}
