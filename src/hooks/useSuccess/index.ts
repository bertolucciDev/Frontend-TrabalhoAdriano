import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

export function useAlertSuccess() {
  const navigate = useNavigate()

  function alertSuccessRegister() {
    Swal.fire({
      icon: "success",
      title: "Conta criada com sucesso!",
      text: "Redirecionando para login...",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => navigate("/login"));
  }

  function alertSuccessLogin() {
    Swal.fire({
      icon: "success",
      title: "Login realizado com sucesso!",
      text: "Redirecionando!",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      navigate("/dashboard");
    });
  }

  function alertSuccessRecoverPassword() {
    Swal.fire({
      icon: "success",
      title: "Senha recuperada com sucesso!",
      text: "Redirecionando para login...",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => navigate("/login"));
  }


  return { alertSuccessRegister, alertSuccessLogin, alertSuccessRecoverPassword};
}
