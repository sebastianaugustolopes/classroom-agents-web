import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { Sparkles } from "lucide-react";
import { useCreateRoom } from "@/http/use-create-room";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const createRoomSchema = z.object({
  name: z.string().min(3, { message: "Inclua no mínimo 3 caracteres" }),
  description: z.string(),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRoom();

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function handleCreateRoom({ name, description }: CreateRoomFormData) {
    await createRoom({ name, description });

    createRoomForm.reset();
  }

  const { isSubmitting } = createRoomForm.formState;

  return (
    <Form {...createRoomForm}>
      <form
        className="flex flex-col gap-5"
        onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
      >
        <FormField
          control={createRoomForm.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-sm font-medium text-zinc-200">
                  Nome da sala
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="Digite o nome da sala..."
                    className="border-zinc-700 bg-zinc-800/50 text-white placeholder-zinc-500 transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            );
          }}
        />

        <FormField
          control={createRoomForm.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-sm font-medium text-zinc-200">
                  Descrição
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isSubmitting}
                    placeholder="Descreva o propósito da sala..."
                    className="min-h-[100px] resize-none border-zinc-700 bg-zinc-800/50 text-white placeholder-zinc-500 transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            );
          }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              "Criando sala..."
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Criar Sala
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
        </Button>
      </form>
    </Form>
  );
}