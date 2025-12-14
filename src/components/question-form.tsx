import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useCreateQuestion } from '@/http/use-create-question'

const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, 'Pergunta é obrigatória')
    .min(10, 'Pergunta deve ter pelo menos 10 caracteres')
    .max(500, 'Pergunta deve ter menos de 500 caracteres'),
})

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>

interface QuestionFormProps {
  roomId: string
}

export function QuestionForm({ roomId }: QuestionFormProps) {
  const { mutateAsync: createQuestion } = useCreateQuestion(roomId)

  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: '',
    },
  })

  async function handleCreateQuestion(data: CreateQuestionFormData) {
    await createQuestion(data)
    form.reset()
  }

  const { isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Textarea
                    className="min-h-[120px] resize-none border-zinc-700 bg-zinc-800/50 pr-12 text-white placeholder-zinc-500 transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                    disabled={isSubmitting}
                    placeholder="Digite sua pergunta aqui... O que você gostaria de saber?"
                    {...field}
                  />
                  <div className="pointer-events-none absolute right-3 top-3">
                    <div className="rounded-lg bg-violet-500/10 p-2">
                      <Sparkles className="h-4 w-4 text-violet-400" />
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-400" />
            </FormItem>
          )}
        />

        <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-zinc-500">
            {form.watch('question')?.length || 0}/500 caracteres
          </p>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 font-medium text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                'Enviando...'
              ) : (
                <>
                  Enviar Pergunta
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          </Button>
        </div>
      </form>
    </Form>
  )
}