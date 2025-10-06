import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { User, Lock, Eye, EyeOff, Mail } from "lucide-react";
import { useAlertWarning } from "@/hooks/useWarning";
import { useAlertSuccess } from "@/hooks/useSuccess";
import { createUserSchema } from "@/schemas/auth/create";
import { register } from "@/services/auth/register";
import Swal from "sweetalert2";
import { verifyEmailCode } from "@/services/auth/verify-email-code";
import { verifyEmailToken } from "@/services/auth/verify-email-token";

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { alertWarningTerms } = useAlertWarning();
  const { alertSuccessRegister } = useAlertSuccess();

  // States do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [verified, setVerified] = useState(false);

  // Limpa campo de confirmação caso senha fique menor que 6 caracteres
  useEffect(() => {
    if (password.length < 6) {
      setConfirmPassword("");
      setShowConfirmPassword(false);
    }
  }, [password]);

  // Verifica se veio token/code pelo link do email
  useEffect(() => {
    const token = searchParams.get("token");
    const code = searchParams.get("code");

    if (token && code && !verified) {
      (async () => {
        try {
          // Chama backend para verificar código e token
          await verifyEmailCode({ code });
          await verifyEmailToken({ token });

          setVerified(true); // evita re-execução
          await Swal.fire({
            icon: "success",
            title: "Conta verificada!",
            text: "Seu e-mail foi confirmado com sucesso. Você já pode fazer login.",
          });

          // Redireciona para login
          navigate("/login");
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Token ou código inválido/expirado",
          });
        }
      })();
    }
  }, [searchParams, navigate, verified]);

  // Função de registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      createUserSchema.parse({ name, email, password, confirmPassword });

      if (!acceptTerms) {
        alertWarningTerms();
        return;
      }

      await register({ data: { name, email, password, confirmPassword } });

      // Pede código de verificação
      const { value: verificationCode } = await Swal.fire({
        title: "Confirme seu e-mail",
        input: "text",
        inputLabel: "Insira o código enviado para seu e-mail",
        inputPlaceholder: "Código de verificação",
        showCancelButton: true,
        confirmButtonText: "Verificar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
          if (!value) return "Você precisa inserir o código!";
        },
      });

      if (!verificationCode) return;

      // Chama backend para verificar o código
      await verifyEmailCode({ code: verificationCode });

      // Sucesso
      alertSuccessRegister();
      navigate("/login");
    } catch (err: any) {
      if (err.response?.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Código inválido ou expirado",
        });
      } else if (err.errors) {
        const zodErrors: any = {};
        err.errors.forEach((e: any) => {
          if (e.path[0]) zodErrors[e.path[0]] = e.message;
        });
        setErrors(zodErrors);
      } else if (err.response?.data?.message) {
        setErrors({ email: err.response.data.message });
      } else {
        setErrors({ email: "Erro ao registrar usuário." });
      }
    }
  };

  return (
    <div className="flex h-dvh">
      {/* Coluna principal */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-sm border-none shadow-none bg-gray-100">
          <CardHeader className="flex flex-col items-center">
            <img
              className="max-w-2xs"
              src="/OrganizationTechLogo.png"
              alt="OrganizationTech Logo"
            />
          </CardHeader>

          <form onSubmit={handleRegister}>
            <CardContent className="space-y-3">
              {/* Nome */}
              <div className="relative flex flex-col">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-500">
                    <User size={18} />
                  </span>
                  <Input
                    type="text"
                    placeholder="Insira seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`pl-10 h-12 text-base ${errors.name ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1">{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="relative flex flex-col">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-500">
                    <Mail size={18} />
                  </span>
                  <Input
                    type="email"
                    placeholder="Insira seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 h-12 text-base ${errors.email ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">{errors.email}</span>
                )}
              </div>

              {/* Senha */}
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

              {/* Confirmação de Senha */}
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
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`pl-10 h-12 text-base ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
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

              {/* Checkbox Aceite */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  id="terms"
                />
                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
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

              <Button
                type="submit"
                className="w-full h-12 text-lg bg-teal-500 hover:bg-teal-600 text-white"
              >
                Registrar
              </Button>

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
