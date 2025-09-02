import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useAlertWarning } from "@/hooks/use-warning";
import { useAlertSuccess } from "@/hooks/use-success";

export default function Register() {
  const navigate = useNavigate();
  const { alertWarningTerms } = useAlertWarning()
  const { alertSuccessRegister } = useAlertSuccess()

  // States do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // Limpa campo de confirmação caso senha fique vazia
  useEffect(() => {
    if (password === "") {
      setConfirmPassword("");
      setShowConfirmPassword(false);
    }
  }, [password]);

  // Validação e registro
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {};

    // Valida email
    if (!email.trim()) newErrors.email = "Campo obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email inválido";

    // Valida senha
    if (!password.trim()) newErrors.password = "Campo obrigatório";

    // Valida confirmação apenas se o campo estiver visível
    if (password.length > 0) {
      if (!confirmPassword.trim()) newErrors.confirmPassword = "Campo obrigatório";
      else if (password !== confirmPassword) newErrors.confirmPassword = "Senhas não conferem";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Valida aceite dos termos
    if (!acceptTerms) {
      alertWarningTerms()
      return;
    }

    // Sucesso
    alertSuccessRegister()
  };

  return (
    <div className="flex h-screen">
      {/* Coluna principal */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-sm border-none shadow-none bg-gray-100">
          <CardHeader className="flex flex-col items-center">
            <img src="/OrganizationTechLogo.png" alt="OrganizationTech Logo" />
          </CardHeader>

          <form onSubmit={handleRegister}>
            <CardContent className="space-y-3">
              {/* Campo Email */}
              <div className="relative flex flex-col">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-500">
                    <User size={18} />
                  </span>
                  <Input
                    type="email"
                    placeholder="Insira seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 h-12 text-base ${errors.email ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
              </div>

              {/* Campo Senha */}
              <div className="relative flex flex-col">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-500">
                    <Lock size={18} />
                  </span>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Insira sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 h-12 text-base ${errors.password ? "border-red-500" : ""}`}
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
                  <span className="text-red-500 text-sm mt-1">{errors.password}</span>
                )}
              </div>

              {/* Campo Confirmação de Senha com animação */}
              <div
                className={`relative flex flex-col transition-all duration-300 ease-in-out mt-2 ${
                  password.length > 0
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-500">
                    <Lock size={18} />
                  </span>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`pl-10 h-12 text-base ${errors.confirmPassword ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>
                )}
              </div>

              {/* Checkbox Aceite dos Termos */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  id="terms"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Aceito todos os{" "}
                  <a
                    href="/termos-de-uso"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 hover:text-teal-700 underline cursor-pointer"
                  >
                    termos de uso
                  </a>
                </label>
              </div>

              {/* Botão Registrar */}
              <Button
                type="submit"
                className="w-full h-12 text-lg bg-teal-500 hover:bg-teal-600 text-white"
              >
                Registrar
              </Button>

              {/* Link Voltar ao Login */}
              <div className="flex justify-center">
                <a
                  onClick={() => navigate("/login")}
                  className="text-sm text-teal-500 hover:text-teal-700 font-medium cursor-pointer"
                >
                  Já tem conta? Faça login!
                </a>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>

      {/* Coluna Azul */}
      <div
        className="w-full bg-gradient-to-b hidden md:block"
        style={{
          background: "linear-gradient(to bottom, rgba(18,48,115,0.772), #2563eb)",
        }}
      />
    </div>
  );
}
