import { ArrowLeft, Radio, Sparkles, MessageSquare, Mic } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRoomQuestions } from "@/http/use-room-questions";
import { QuestionForm } from "@/components/question-form";
import { QuestionList } from "@/components/question-list";
import { Button } from "@/components/ui/button";

type RoomParams = {
  roomId: string;
};

export function Room() {
  const params = useParams<RoomParams>();
  const [questionsCount, setQuestionsCount] = useState<number>(0);
  const { data: questions } = useRoomQuestions(params.roomId || "");

  useEffect(() => {
    if (questions) {
      setQuestionsCount(questions.length);
    }
  }, [questions]);

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 h-64 w-64 rounded-full bg-violet-500/5 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-1/4 -left-40 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-4 sm:py-8">
        {/* Header with navigation */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-4 flex flex-col items-stretch justify-between gap-3 sm:mb-6 sm:flex-row sm:items-center sm:gap-4">
            <Link to="/" className="order-1 sm:order-1">
              <Button
                variant="outline"
                className="group w-full border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-all hover:border-violet-500/30 hover:bg-zinc-800/80 sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Voltar ao Início
              </Button>
            </Link>

            <Link
              to={`/room/${params.roomId}/audio`}
              className="order-2 sm:order-2"
            >
              <Button className="group flex w-full items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/20 transition-all hover:shadow-xl hover:shadow-red-500/30 sm:w-auto">
                <Radio className="h-4 w-4 animate-pulse" />
                Gravar Áudio
              </Button>
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4 backdrop-blur-xl sm:rounded-2xl sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 sm:h-16 sm:w-16 sm:rounded-2xl">
                <Sparkles className="h-6 w-6 text-white sm:h-8 sm:w-8" />
              </div>
              <div className="flex-1">
                <h1 className="mb-2 bg-gradient-to-r from-violet-200 to-blue-200 bg-clip-text font-bold text-2xl text-transparent sm:text-3xl md:text-4xl">
                  Sala de Perguntas
                </h1>
                <p className="text-sm text-zinc-400 sm:text-base md:text-lg">
                  Faça perguntas e receba respostas inteligentes geradas por IA
                </p>
                <div className="mt-3 flex flex-wrap gap-2 sm:mt-4 sm:gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-xs text-violet-300 sm:px-3">
                    <Mic className="h-3 w-3" />Garve um áudio para transcreve-lo.
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs text-blue-300 sm:px-3">
                    <MessageSquare className="h-3 w-3" />
                    {questionsCount}{" "}
                    {questionsCount === 1 ? "pergunta" : "perguntas"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Question form */}
        <div className="mb-6 overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4 backdrop-blur-xl sm:mb-8 sm:rounded-2xl sm:p-6">
          <h2 className="mb-3 font-semibold text-base text-white sm:mb-4 sm:text-lg">
            Faça sua Pergunta
          </h2>
          {/* QuestionForm component here */}
          <QuestionForm roomId={params.roomId} />
        </div>

        {/* Question list */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="font-semibold text-lg text-white sm:text-xl">
            Perguntas Recentes
          </h2>

          {/* QuestionList component here */}
          <QuestionList roomId={params.roomId} />
        </div>
      </div>
    </div>
  );
}
