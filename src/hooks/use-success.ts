import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

export function useAlertSuccess() {
  function alertSuccessLogin() {
    const navigate = useNavigate()

    Swal.fire({
      icon: "success",
      title: "Conta criada com sucesso!",
      text: "Redirecionando para login...",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => navigate("/login"));
  }

  return{alertSuccessLogin}
}
