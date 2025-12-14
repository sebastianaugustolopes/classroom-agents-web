import { ArrowRight, Clock, MessageSquare, Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useRooms } from "@/http/use-rooms";
import { dayjs } from "@/lib/dayjs";

export function RoomList() {
  const { data, isLoading } = useRooms();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-12 backdrop-blur-xl">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="text-sm text-zinc-400">Carregando salas...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-dashed border-zinc-800/50 bg-zinc-900/30 p-12 backdrop-blur-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 ring-1 ring-blue-500/20">
          <Sparkles className="h-8 w-8 text-blue-400" />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="font-semibold text-lg text-zinc-300">Nenhuma sala criada</h3>
          <p className="max-w-md text-sm text-zinc-500">
            Crie sua primeira sala para começar a fazer perguntas e receber respostas da IA.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((room) => {
        return (
          <Link
            key={room.id}
            to={`/room/${room.id}`}
            className="group block overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-800/30 p-4 transition-all hover:border-blue-500/30 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <h3 className="font-medium text-base text-white transition-colors group-hover:text-blue-300">
                  {room.name}
                </h3>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/50 bg-zinc-800/50 px-2.5 py-1 text-xs text-zinc-400">
                    <Clock className="h-3 w-3" />
                    {dayjs(room.createdAt).toNow()}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs text-blue-300">
                    <MessageSquare className="h-3 w-3" />
                    {room.questionsCount} {room.questionsCount === 1 ? 'pergunta' : 'perguntas'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 transition-all group-hover:text-blue-400">
                <span>Entrar</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}