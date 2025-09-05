import Swal from "sweetalert2";

export function useAlertWarning() {
  function alertWarningTerms() {
    Swal.fire({
      icon: "warning",
      title: "Aceite os termos",
      text: "Você precisa aceitar os termos de uso para continuar!",
      confirmButtonColor: "#14B8A6",
    });
  }
  return {alertWarningTerms}
}
