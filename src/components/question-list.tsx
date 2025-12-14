import { MessageSquareText, Loader2 } from 'lucide-react'
import { useRoomQuestions } from '@/http/use-room-questions'
import { QuestionItem } from './question-item'

interface QuestionListProps {
  roomId: string
}

export function QuestionList(props: QuestionListProps) {
  const { data, isLoading } = useRoomQuestions(props.roomId)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-8 backdrop-blur-xl sm:p-12">
        <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
        <p className="text-sm text-zinc-400">Carregando perguntas...</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-dashed border-zinc-800/50 bg-zinc-900/30 p-8 backdrop-blur-xl sm:p-12">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 ring-1 ring-violet-500/20 sm:h-16 sm:w-16">
          <MessageSquareText className="h-7 w-7 text-violet-400 sm:h-8 sm:w-8" />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="font-semibold text-base text-zinc-300 sm:text-lg">Nenhuma pergunta ainda</h3>
          <p className="mx-auto max-w-md text-sm text-zinc-500">
            Seja o primeiro a fazer uma pergunta nesta sala! A IA está pronta para responder.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {data.map((question) => {
        return <QuestionItem key={question.id} question={question} />
      })}
    </div>
  )
}