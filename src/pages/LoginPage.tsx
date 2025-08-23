import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.trim() === "" || email.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Algo deu errado!",
        text: "Preencha todos os campos!",
        confirmButtonColor: "#14B8A6",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Login realizado com sucesso!",
      text: "Redirecionando!",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      navigate("/dashboard");
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-sm border-none shadow-none bg-gray-100">
          <CardHeader className="flex flex-col items-center">
            {/* Logo */}
            <div className="flex items-center justify-center">
              <img
                src="/OrganizationTechLogo.png"
                alt="OrganizationTech Logo"
              />
            </div>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {/* Input com ícone User */}
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">
                  <User size={18} />
                </span>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Insira Seu Email"
                  className="pl-10 h-12 text-base"
                />
              </div>

              {/* Input com ícone Lock e botão de olho */}
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500">
                  <Lock size={18} />
                </span>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Insira Sua Senha"
                  className="pl-10 pr-10 h-12 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Link esqueceu sua senha */}
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-teal-500 hover:text-teal-700 font-semibold"
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
              {/* Crie seu usuario */}
              <div className="flex justify-center">
                <a
                  onClick={() => navigate('/register')}
                  className="text-sm text-teal-500 hover:text-teal-700 font-medium cursor-pointer
                "
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
