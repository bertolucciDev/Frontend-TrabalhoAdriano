import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("opacity-100");
      }, index * 200);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-900 to-blue-500 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 shadow-md fixed w-full z-10">
        <div className="flex items-center gap-2">
          <img src="/OrganizationTechLogo.png" alt="OrganizationTech Logo" className="h-10 w-10" />
          <span className="font-bold text-xl">OrganizationTech</span>
        </div>
        <div className="flex gap-6">
          <a href="#sobre" className="hover:text-teal-400 transition-colors">Sobre</a>
          <a href="#contato" className="hover:text-teal-400 transition-colors">Contato</a>
          <Button onClick={() => navigate("/login")} className="bg-teal-500 hover:bg-teal-600">Entrar</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-32 md:pt-40 fade-in opacity-0 min-h-[80vh]">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Bem-vindo ao OrganizationTech</h1>
        <p className="text-lg md:text-2xl mb-6 max-w-3xl">
          Aqui você pode escrever o que é o OrganizationTech, qual o propósito do projeto,
          suas funcionalidades e porque ele é útil para os usuários.
        </p>
        <Button onClick={() => navigate("/login")} className="bg-teal-500 hover:bg-teal-600">
          Entrar
        </Button>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-20 px-6 bg-gray-100 text-gray-800 fade-in opacity-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Sobre o OrganizationTech</h2>
        <p className="max-w-4xl mx-auto text-center text-lg">
          Aqui você pode detalhar a ideia do projeto, suas funcionalidades principais,
          e como ele facilita o gerenciamento de usuários, recuperação de senha e controle administrativo.
        </p>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-20 px-6 bg-blue-500 text-white text-center fade-in opacity-0">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Contato</h2>
        <p className="mb-6 max-w-2xl mx-auto">Deixe seu email ou telefone para entrar em contato conosco.</p>
        <Button className="bg-teal-500 hover:bg-teal-600">Enviar Mensagem</Button>
      </section>

      {/* Rodapé */}
      <footer className="py-6 text-center text-gray-300 fade-in opacity-0">
        &copy; {new Date().getFullYear()} OrganizationTech. Todos os direitos reservados.
      </footer>
    </div>
  );
}
