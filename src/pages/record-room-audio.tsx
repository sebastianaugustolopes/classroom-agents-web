import { useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Mic,
  MicOff,
  Radio,
  ArrowLeft,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

type RoomParams = {
  roomId: string;
};

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<number | null>(null);

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append("file", audio, "audio.webm");

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    console.log(result);
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("Gravação iniciada!");
    };

    recorder.current.onstop = () => {
      console.log("Gravação encerrada/pausada");
    };

    recorder.current.start();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert("O seu navegador não suporta gravação");
      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      recorder.current?.stop();

      createRecorder(audio);
    }, 5000);
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 h-64 w-64 rounded-full bg-red-500/5 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute bottom-1/4 -left-40 h-64 w-64 rounded-full bg-pink-500/5 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        {/* Header */}
        <div className="border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl">
          <div className="mx-auto max-w-4xl px-4 py-4 sm:py-6">
            <Link to={`/room/${params.roomId}`}>
              <Button
                variant="outline"
                className="group border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-all hover:border-red-500/30 hover:bg-zinc-800/80"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Voltar para Sala
              </Button>
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
          <div className="w-full max-w-2xl space-y-8">
            {/* Main card */}
            <div className="overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-6 backdrop-blur-xl sm:p-10">
              {/* Card header */}
              <div className="mb-8 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 backdrop-blur-sm">
                  <Radio className="h-4 w-4 text-red-400" />
                  <span className="text-red-300 text-sm font-medium">
                    Gravação de Áudio
                  </span>
                </div>
                <h1 className="mb-3 bg-gradient-to-r from-red-200 via-pink-200 to-red-200 bg-clip-text font-bold text-3xl text-transparent sm:text-4xl">
                  Grave suas Perguntas
                </h1>
                <p className="text-base text-zinc-400 sm:text-lg">
                  Faça perguntas por áudio e receba respostas inteligentes da IA
                </p>
              </div>

              {/* Visual recording indicator */}
              <div className="mb-8 flex justify-center">
                <div
                  className={`relative flex h-32 w-32 items-center justify-center rounded-full transition-all sm:h-40 sm:w-40 ${
                    isRecording
                      ? "bg-gradient-to-br from-red-500/20 to-pink-500/20 ring-4 ring-red-500/30 animate-pulse"
                      : "bg-zinc-800/50 ring-2 ring-zinc-700/50"
                  }`}
                >
                  {isRecording ? (
                    <>
                      <Mic className="h-12 w-12 text-red-400 sm:h-16 sm:w-16" />
                      <div className="absolute inset-0 animate-ping rounded-full bg-red-500/20" />
                    </>
                  ) : (
                    <MicOff className="h-12 w-12 text-zinc-500 sm:h-16 sm:w-16" />
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="mb-8 text-center">
                {isRecording ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                      <p className="font-semibold text-lg text-red-300 sm:text-xl">
                        Gravando...
                      </p>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Sua voz está sendo capturada e enviada para análise
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="font-semibold text-lg text-zinc-400 sm:text-xl">
                      Gravação Pausada
                    </p>
                    <p className="text-sm text-zinc-500">
                      Clique no botão abaixo para começar a gravar
                    </p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="space-y-4">
                {isRecording ? (
                  <Button
                    onClick={stopRecording}
                    className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-zinc-700 to-zinc-600 px-6 py-4 font-semibold text-lg text-white shadow-lg shadow-zinc-900/50 transition-all hover:shadow-xl hover:shadow-zinc-900/70 sm:py-6"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <MicOff className="h-5 w-5 sm:h-6 sm:w-6" />
                      Pausar Gravação
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-600 to-zinc-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Button>
                ) : (
                  <Button
                    onClick={startRecording}
                    className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-pink-600 px-6 py-4 font-semibold text-lg text-white shadow-lg shadow-red-500/25 transition-all hover:shadow-xl hover:shadow-red-500/40 sm:py-6"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <Mic className="h-5 w-5 sm:h-6 sm:w-6" />
                      Iniciar Gravação
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Button>
                )}
              </div>
            </div>

            {/* Info card */}
            <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-4 backdrop-blur-xl sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-zinc-200 sm:text-base">
                    Como funciona?
                  </h3>
                  <ul className="space-y-1.5 text-xs text-zinc-400 sm:text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                      <span>
                        Clique em "Iniciar Gravação" e permita o acesso ao
                        microfone
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                      <span>
                        Grave o conteúdo que deseja analisar (aula, reunião,
                        palestra, etc.)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                      <span>
                        O áudio é enviado automaticamente a cada 5 segundos para
                        processamento
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                      <span>
                        A IA transcreverá seu áudio e ficará disponível para
                        responder perguntas
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                      <span>
                        Volte para a sala e faça perguntas sobre o conteúdo
                        gravado
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Compatibility warning */}
            {!isRecordingSupported && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 backdrop-blur-xl sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm text-red-300 sm:text-base">
                      Navegador não suportado
                    </h3>
                    <p className="text-xs text-red-400/80 sm:text-sm">
                      Seu navegador não suporta gravação de áudio. Por favor,
                      use Chrome, Firefox ou Edge.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
