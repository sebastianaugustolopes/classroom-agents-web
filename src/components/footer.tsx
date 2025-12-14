import { useState } from "react";
import {
  ChevronDown,
  Github,
  HelpCircle,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { Button } from "./ui/button";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Como funciona a plataforma?",
    answer:
      "Crie uma sala, grave seus áudios (aulas, reuniões, etc.), e através da API do Gemin, a IA transcreve automaticamente os áudios. Depois, você pode fazer perguntas sobre o conteúdo gravado e receber respostas inteligentes.",
  },
  {
    question: "Quais formatos de áudio são suportados?",
    answer:
      "A plataforma grava em formato WebM com qualidade otimizada. O áudio é capturado diretamente do seu microfone e processado automaticamente.",
  },
  {
    question: "Posso compartilhar minhas salas?",
    answer:
      "Sim! Cada sala possui um ID único que pode ser compartilhado. Outras pessoas podem acessar e fazer perguntas sobre o mesmo conteúdo gravado.",
  },
  {
    question: "A IA entende português?",
    answer:
      "Sim, a IA processa e responde perguntas em português e diversos outros idiomas.",
  },
  {
    question: "Há limite de tempo de gravação?",
    answer:
      "Infelizmente, sim. O projeto foi desenvolvido exclusivamente com o objetivo de estudo e apresentação no portfólio pessoal. É possível gravar conteúdos objetivos com duração aproximada de 25 segundos. O áudio é enviado em chunks de 5 segundos, permitindo um processamento contínuo e mais eficiente.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
          <HelpCircle className="h-4 w-4 text-violet-400" />
        </div>
        <h4 className="font-semibold text-sm text-zinc-300">
          Perguntas Frequentes
        </h4>
      </div>

      <div className="space-y-2">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm transition-all hover:border-zinc-700/50"
          >
            <Button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between gap-3 p-3 text-left transition-colors hover:bg-zinc-800/30"
            >
              <span className="text-sm font-medium text-zinc-300">
                {item.question}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </Button>

            <div
              className={`grid transition-all ${
                openIndex === index
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-zinc-800/50 p-3 pt-2">
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Footer with FAQ
export function FooterWithFAQ() {
  return (
    <footer className="relative border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* About project */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
                <span className="font-bold text-lg text-white">AI</span>
              </div>
              <h3 className="font-bold text-xl text-white">Audio Room</h3>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Projeto interativo voltado para estudos, com foco na implementação
              de IA Gemini para gerar resultados personalizados aos usuários.
            </p>
          </div>

          <div>
            <FAQSection />
          </div>

          {/* Social medias */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-zinc-300">Conecte-se</h4>
            <p className="text-sm text-zinc-400">
              Acompanhe as redes sociais
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all hover:border-violet-500/30 hover:bg-zinc-800"
              >
                <Github className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-violet-400" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all hover:border-blue-500/30 hover:bg-zinc-800"
              >
                <Linkedin className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-blue-400" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all hover:border-sky-500/30 hover:bg-zinc-800"
              >
                <Twitter className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-sky-400" />
              </a>
              <a
                href="mailto:contact@audioroom.com"
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 transition-all hover:border-emerald-500/30 hover:bg-zinc-800"
              >
                <Mail className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-emerald-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-zinc-800/50 pt-8">
          <div>
            <p className="text-aling text-sm text-zinc-500">
              © {new Date().getFullYear()} Audio Room. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
