import { Sparkles, MessageSquarePlus, Users } from "lucide-react";
import { CreateRoomForm } from "@/components/create-room-form";
import { RoomList } from "@/components/room-list";
import { ProjectFlowBadge } from "@/components/project-flow-badge";
import { FooterWithFAQ } from "@/components/footer";

export function CreateRoom() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-zinc-950 to-zinc-950">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-40 -left-40 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative px-4 py-6 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center sm:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 backdrop-blur-sm sm:mb-4 sm:px-4 sm:py-2">
            <Sparkles className="h-3 w-3 text-violet-400 sm:h-4 sm:w-4" />
            <span className="text-violet-300 text-xs font-medium sm:text-sm">
              Salas Interativas com IA
            </span>
          </div>
          <h1 className="mb-3 bg-gradient-to-r from-violet-200 via-white to-blue-200 bg-clip-text px-4 font-bold text-3xl text-transparent sm:mb-4 sm:text-4xl md:text-5xl">
            Crie sua Sala de Perguntas
          </h1>
          <div className="mb-12 text-center">
            {/* Badge */}
            <div className="mb-6">
              <ProjectFlowBadge />
            </div>
            <p className="mx-auto max-w-2xl px-4 text-lg text-zinc-400">
              Transforme seus áudios em conhecimento interativo. Grave,
              transcreva e dialogue com sua IA sobre qualquer conteúdo
            </p>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Creation form */}
          <div className="group relative overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6 backdrop-blur-xl transition-all hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10 sm:rounded-2xl sm:p-8">
            <div className="absolute -right-20 -top-20 h-32 w-32 rounded-full bg-violet-500/5 blur-3xl transition-all group-hover:bg-violet-500/10 sm:h-40 sm:w-40" />

            <div className="relative">
              <div className="mb-4 flex items-center gap-3 sm:mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 sm:h-12 sm:w-12 sm:rounded-xl">
                  <MessageSquarePlus className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg text-white sm:text-xl">
                    Nova Sala
                  </h2>
                  <p className="text-xs text-zinc-400 sm:text-sm">
                    Preencha os dados abaixo
                  </p>
                </div>
              </div>

              {/* CreateRoomForm component here */}
              <CreateRoomForm />
            </div>
          </div>

          {/* Room list */}
          <div className="overflow-hidden rounded-xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl sm:rounded-2xl">
            <div className="border-b border-zinc-800/50 bg-zinc-800/30 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 sm:h-10 sm:w-10">
                  <Users className="h-4 w-4 text-blue-400 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-base text-white sm:text-lg">
                    Salas Ativas
                  </h2>
                  <p className="text-xs text-zinc-400 sm:text-sm">
                    Entre em uma sala existente
                  </p>
                </div>
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-4 sm:max-h-[500px] sm:p-6">
              {/* RoomList component here */}
              <RoomList />
            </div>
          </div>
        </div>
      </div>
      <FooterWithFAQ/>
    </div>
  );
}
