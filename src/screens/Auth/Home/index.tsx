import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Users, Shield, Zap, Mail, Phone, MapPin } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Gerenciamento de Usuários",
      description: "Controle completo sobre usuários com perfis e permissões personalizadas."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Segurança Avançada",
      description: "Recuperação de senha segura e autenticação robusta para proteger seus dados."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Produtividade Máxima",
      description: "Ferramentas intuitivas para organizar e transformar sua eficiência diária."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
      {/* Enhanced Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-md shadow-xl fixed w-full z-50 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
            <img src="/public/favicon/OrganizationTechIcon.svg" alt="OrganizationTech" />
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            OrganizationTech
          </span>
        </div>
        <div className="flex items-center gap-8">
          <a href="#sobre" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium hover:scale-105">Sobre</a>
          <a href="#recursos" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium hover:scale-105">Recursos</a>
          <a href="#contato" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium hover:scale-105">Contato</a>
          <Button 
            onClick={() => navigate("/login")} 
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Entrar
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-32 md:pt-40 min-h-[80vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent leading-tight">
            Organization<span className="text-cyan-400">Tech</span>
          </h1>
          <h4 className="text-xl md:text-3xl font-light mb-8 max-w-4xl text-gray-300 leading-relaxed opacity-0 animate-fade-in delay-200">
            Organize, Controle e Transforme sua Produtividade com Tecnologia Inteligente
          </h4>
          <div className="opacity-0 animate-fade-in delay-300">
            <Button 
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-110 text-lg"
            >
              Comece Agora <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full animate-pulse delay-1000"></div>
      </section>

      {/* Recursos Section */}
      <section id="recursos" data-animate className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent opacity-0 animate-fade-in-up">
            Recursos Poderosos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" data-animate className="py-20 px-6 bg-gradient-to-b from-slate-800/50 to-blue-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent opacity-0 animate-fade-in-up">
            Sobre o OrganizationTech
          </h2>
          <p className="max-w-4xl mx-auto text-center text-xl text-gray-300 leading-relaxed opacity-0 animate-fade-in-up delay-200">
            Somos uma plataforma inovadora dedicada a revolucionar a forma como você gerencia sua produtividade. 
            Com foco em simplicidade, segurança e eficiência, oferecemos soluções completas para organização pessoal e profissional.
          </p>
          <div className="mt-8 text-center text-gray-400 opacity-0 animate-fade-in-up delay-300">
            <p className="text-lg">
              Transforme sua rotina com ferramentas inteligentes projetadas para maximizar seu potencial.
            </p>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" data-animate className="py-20 px-6 bg-gradient-to-b from-blue-900/50 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent opacity-0 animate-fade-in-up">
            Entre em Contato
          </h2>
          <p className="mb-12 text-xl text-gray-300 max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-200">
            Estamos prontos para ajudar você a alcançar novos níveis de produtividade. 
            Deixe sua mensagem e entraremos em contato em breve.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 opacity-0 animate-fade-in-up delay-300">
              <Mail className="w-8 h-8 text-cyan-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-400">contato@organizationtech.com</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 opacity-0 animate-fade-in-up delay-400">
              <Phone className="w-8 h-8 text-cyan-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Telefone</h3>
              <p className="text-gray-400">+55 (11) 99999-9999</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 opacity-0 animate-fade-in-up delay-500">
              <MapPin className="w-8 h-8 text-cyan-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Localização</h3>
              <p className="text-gray-400">São Paulo, Brasil</p>
            </div>
          </div>
          
          <div className="opacity-0 animate-fade-in-up delay-600">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg">
              Enviar Mensagem
            </Button>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer data-animate className="py-8 text-center text-gray-400 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="opacity-0 animate-fade-in-up">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} OrganizationTech. Todos os direitos reservados.
          </p>
          <p className="text-sm mt-2 text-gray-500">
            Transformando produtividade em realidade
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .delay-400 {
          animation-delay: 400ms;
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
        
        .delay-600 {
          animation-delay: 600ms;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}