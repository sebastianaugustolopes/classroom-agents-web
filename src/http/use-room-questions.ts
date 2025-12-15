import { useQuery } from "@tanstack/react-query";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-response";

const API_URL = import.meta.env.VITE_API_URL;

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ["get-questions", roomId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/rooms/${roomId}/questions`);

      if (!response.ok) {
        throw new Error("Erro ao buscar perguntas da sala");
      }

      const result: GetRoomQuestionsResponse = await response.json();
      return result;
    },
  });
}
