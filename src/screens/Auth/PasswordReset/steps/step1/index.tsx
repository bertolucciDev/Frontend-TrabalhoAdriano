import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";
import Swal from "sweetalert2";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<{ code?: string }>({});
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    const newErrors: { code?: string } = {};
    if (!code.trim()) newErrors.code = "Campo obrigatório";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (code === "123123") {
      Swal.fire({
        icon: "success",
        title: "Código validado!",
        text: "Agora você pode redefinir sua senha.",
        confirmButtonColor: "#14B8A6",
      }).then(() => {
        navigate("/step2");
      });
    }else {
      Swal.fire({
        icon: "error",
        title: "Código invalidado!",
        confirmButtonColor: "#14B8A6"
      })
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-sm border-none shadow-none bg-gray-100">
          <CardHeader className="flex flex-col items-center">
            <img src="/OrganizationTechLogo.png" alt="OrganizationTech Logo" />
            <h2 className="mt-4 text-lg text-center font-semibold">
              Digite o código recebido no seu e-mail
            </h2>
          </CardHeader>

          <form onSubmit={handleVerify}>
            <CardContent className="space-y-3">
              <div className="relative flex flex-col">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-gray-500">
                    <KeyRound size={18} />
                  </span>
                  <Input
                    type="text"
                    placeholder="Insira o código"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`pl-10 h-12 text-base ${
                      errors.code ? "border-red-500" : ""
                    }`}
                  />
                </div>
                <span
                  className={`text-red-500 text-sm mt-1 transition-all duration-300 ease-in-out transform ${
                    errors.code
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  {errors.code || "Campo oculto"}
                </span>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg bg-teal-500 hover:bg-teal-600 text-white"
              >
                Verificar
              </Button>

              <div className="flex justify-center">
                <a
                  onClick={() => navigate("/recoverpass")}
                  className="text-sm text-teal-500 hover:text-teal-700 font-medium cursor-pointer"
                >
                  Voltar
                </a>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>

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
