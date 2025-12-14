import { Plus, Mic, FileText, MessageSquare, ChevronRight } from 'lucide-react'

export function ProjectFlowBadge() {
  return (
    <div className="mx-auto max-w-4xl px-4">
      {/* Desktop version */}
      <div className="hidden items-center justify-center gap-2 rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-4 backdrop-blur-sm sm:flex">
        {/* Step 1 */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 ring-1 ring-violet-500/20">
            <Plus className="h-4 w-4 text-violet-400" />
          </div>
          <span className="text-sm font-medium text-zinc-300">Criar sala</span>
        </div>

        <ChevronRight className="h-4 w-4 text-zinc-600" />

        {/* Step 2 */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 ring-1 ring-red-500/20">
            <Mic className="h-4 w-4 text-red-400" />
          </div>
          <span className="text-sm font-medium text-zinc-300">Gravar áudio</span>
        </div>

        <ChevronRight className="h-4 w-4 text-zinc-600" />

        {/* Step 3 */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20">
            <FileText className="h-4 w-4 text-blue-400" />
          </div>
          <span className="text-sm font-medium text-zinc-300">Transcrição automática</span>
        </div>

        <ChevronRight className="h-4 w-4 text-zinc-600" />

        {/* Step 4 */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20">
            <MessageSquare className="h-4 w-4 text-emerald-400" />
          </div>
          <span className="text-sm font-medium text-zinc-300">Faça perguntas sobre o conteúdo</span>
        </div>
      </div>

      {/* Mobile version */}
      <div className="flex items-center justify-center gap-3 overflow-x-auto rounded-full border border-zinc-800/50 bg-zinc-900/50 px-4 py-3 backdrop-blur-sm sm:hidden">
        {/* Step 1 */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/10">
            <Plus className="h-3.5 w-3.5 text-violet-400" />
          </div>
          <span className="text-xs font-medium text-zinc-400">Sala</span>
        </div>

        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-700" />

        {/* Step 2 */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10">
            <Mic className="h-3.5 w-3.5 text-red-400" />
          </div>
          <span className="text-xs font-medium text-zinc-400">Áudio</span>
        </div>

        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-700" />

        {/* Step 3 */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10">
            <FileText className="h-3.5 w-3.5 text-blue-400" />
          </div>
          <span className="text-xs font-medium text-zinc-400">IA</span>
        </div>

        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-zinc-700" />

        {/* Step 4 */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <span className="text-xs font-medium text-zinc-400">Perguntas</span>
        </div>
      </div>
    </div>
  )
}

