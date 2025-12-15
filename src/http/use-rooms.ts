import { useQuery } from "@tanstack/react-query";
import type { GetRoomsResponse } from "./types/get-room-response";

const API_URL = import.meta.env.VITE_API_URL;

export function useRooms() {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/rooms`);

      if (!response.ok) {
        throw new Error("Erro ao buscar salas");
      }

      const result: GetRoomsResponse = await response.json();
      return result;
    },
  });
}
