import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  {
    /* Verifica que se o usuario colocou algum caracter no primeiro campo de senha */
  }
  const isConfirmDisbled = password.length === 0;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Campos obrigatórios",
        text: "Preencha todos os campos!",
        confirmButtonColor: "#14B8A6",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Senhas não conferem",
        text: "Digite a mesma senha nos dois campos!",
        confirmButtonColor: "#14B8A6",
      });
      return;
    }

    if (!acceptTerms) {
      Swal.fire({
        icon: "warning",
        title: "Aceite os termos",
        text: "Você precisa aceitar os termos de uso para continuar!",
        confirmButtonColor: "#14B8A6",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Conta criada com sucesso!",
      text: "Redirecionando para login...",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="flex h-screen">
      {/* Coluna esquerda com logo */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-sm border-none shadow-none bg-gray-100">
          <CardHeader className="flex flex-col items-center">
            <div className="flex items-center justify-center">
              <img
                src="/OrganizationTechLogo.png"
                alt="OrganizationTech Logo"
              />
            </div>
          </CardHeader>

          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              {/* Email */}
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">
                  <User size={18} />
                </span>
                <Input
                  type="email"
                  placeholder="Insira seu email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>

              {/* Senha */}
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">
                  <Lock size={18} />
                </span>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Insira sua senha"
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirmação de senha */}
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">
                  <Lock size={18} />
                </span>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`pl-10 h-12 text-base ${
                    isConfirmDisbled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isConfirmDisbled}
                />
                {isConfirmDisbled === false && (
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 text-gray-500"
                    disabled={isConfirmDisbled}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                )}
              </div>

              {/* Checkbox aceitar termos */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                />
                <label className="text-sm text-gray-700">
                  Aceito todos os termos
                </label>
              </div>

              {/* Botão registrar */}
              <Button
                type="submit"
                className="w-full h-12 text-lg bg-teal-500 hover:bg-teal-600 text-white"
              >
                Registrar
              </Button>

              {/* Voltar ao login */}
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
