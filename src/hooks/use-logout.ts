import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

export function useLogout() {
  const navigate = useNavigate();

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
    }).then(() => {
      // localStorage.removeItem("token");
      navigate("/login");
    });
  };

  return handleLogout;
}
