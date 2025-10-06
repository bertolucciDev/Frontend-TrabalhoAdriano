import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "@/contexts/AuthContext";

export function useLogout() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // pega a função do contexto

  const handleLogout = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você será deslogado do sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, sair",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // limpa localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        // limpa contexto
        logout();

        // redireciona para login
        navigate("/login");
      }
    });
  };

  return handleLogout;
}
