import { Bot, Loader2, MessageSquare, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { dayjs } from '@/lib/dayjs'

interface Question {
  id: string
  question: string
  answer?: string | null
  createdAt: string
  isGeneratingAnswer?: boolean
}

interface QuestionItemProps {
  question: Question
}

export function QuestionItem({ question }: QuestionItemProps) {
  return (
    <Card className="group overflow-hidden border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl transition-all hover:border-violet-500/30 hover:bg-zinc-900/80">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-5">
          {/* Question */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 ring-1 ring-violet-500/20 sm:h-10 sm:w-10">
              <MessageSquare className="h-4 w-4 text-violet-400 sm:h-5 sm:w-5" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-xs text-violet-300 sm:text-sm">Pergunta</span>
                <span className="h-1 w-1 rounded-full bg-zinc-700" />
                <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <Clock className="h-3 w-3" />
                  {dayjs(question.createdAt).toNow()}
                </span>
              </div>
              <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-300">
                {question.question}
              </p>
            </div>
          </div>

          {/* Answer */}
          {(!!question.answer || question.isGeneratingAnswer) && (
            <div className="relative">
              <div className="absolute inset-0 -left-3 border-l-2 border-blue-500/20 sm:-left-4" />
              <div className="flex items-start gap-3 pl-3 sm:gap-4 sm:pl-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 ring-1 ring-blue-500/20 sm:h-10 sm:w-10">
                  <Bot className="h-4 w-4 text-blue-400 sm:h-5 sm:w-5" />
                </div>
                <div className="flex-1 space-y-2">
                  <span className="font-semibold text-xs text-blue-300 sm:text-sm">Resposta da IA</span>
                  <div className="text-zinc-300">
                    {question.isGeneratingAnswer ? (
                      <div className="flex items-center gap-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 sm:p-4">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-400 sm:h-5 sm:w-5" />
                        <div className="space-y-1">
                          <span className="block text-sm font-medium text-blue-300">
                            Gerando resposta...
                          </span>
                          <span className="block text-xs text-blue-400/70">
                            A IA está processando sua pergunta
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-zinc-800/50 bg-zinc-800/30 p-2 sm:p-4 mt-2">
                        <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-300">
                          {question.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status Badge */}
          {!question.answer && !question.isGeneratingAnswer && (
            <div className="flex justify-end">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300 sm:px-3">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                Aguardando resposta
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}