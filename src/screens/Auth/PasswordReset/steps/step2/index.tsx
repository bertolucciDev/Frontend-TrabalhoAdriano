// src/screens/Auth/ResetPassword/index.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useAlertSuccess } from "@/hooks/useSuccess";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { alertSuccessRecoverPassword } = useAlertSuccess();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  // Limpa confirmação se senha ficar vazia
  useEffect(() => {
    if (!password || password.length < 6) {
      setConfirmPassword("");
      setShowConfirmPassword(false);
    }
  }, [password]);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { password?: string; confirmPassword?: string } = {};

    // Validação da senha
    if (!password.trim()) newErrors.password = "Campo obrigatório";
    else if (password.length < 6)
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";

    // Validação da confirmação somente se senha tiver >= 6 caracteres
    if (password.length >= 6) {
      if (!confirmPassword.trim()) newErrors.confirmPassword = "Campo obrigatório";
      else if (password !== confirmPassword)
        newErrors.confirmPassword = "Senhas não conferem";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Sucesso
    alertSuccessRecoverPassword();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-sm border-none shadow-none bg-gray-100">
          <CardHeader className="flex flex-col items-center">
            <img src="/OrganizationTechLogo.png" alt="OrganizationTech Logo" />
          </CardHeader>

          <form onSubmit={handleReset}>
            <CardContent className="space-y-3">
              {/* Campo Senha */}
              <div className="relative flex flex-col">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-500">
                    <Lock size={18} />
                  </span>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Insira sua nova senha"
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

              {/* Campo Confirmação */}
              <div
                className={`relative flex flex-col transition-all duration-300 ease-in-out mt-2 ${
                  password.length >= 6
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
                    placeholder="Confirme sua nova senha"
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

              <Button
                type="submit"
                className="w-full h-12 text-lg bg-teal-500 hover:bg-teal-600 text-white"
              >
                Redefinir Senha
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>

      <div
        className="w-full bg-gradient-to-b hidden md:block"
        style={{
          background: "linear-gradient(to bottom, rgba(18,48,115,0.772), #2563eb)",
        }}
      />
    </div>
  );
}
