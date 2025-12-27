
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

const VoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const toggleAssistant = async () => {
    if (isActive) {
      if (sessionRef.current) sessionRef.current.close();
      setIsActive(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log('Voice Assistant Connected');
            setIsActive(true);
          },
          onmessage: async (message) => {
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => [...prev, "🤖: " + message.serverContent!.outputTranscription!.text]);
            }
            // Logic to play audio would go here per API guidelines
          },
          onerror: (e) => console.error(e),
          onclose: () => setIsActive(false),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: 'Você é o assistente do app Serviços Locais+. Ajude o usuário a encontrar eletricistas, encanadores ou outros profissionais em Angola de forma amigável.',
          outputAudioTranscription: {},
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100 shadow-sm flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-teal-800">Assistente de Voz IA</h2>
        <p className="text-teal-600">Peça por um serviço usando sua voz</p>
      </div>

      <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer ${isActive ? 'bg-teal-500 scale-110 shadow-lg animate-pulse' : 'bg-white shadow-md'}`}
           onClick={toggleAssistant}>
        <span className="text-5xl">{isActive ? '⏹️' : '🎙️'}</span>
      </div>

      <div className="w-full bg-white rounded-lg p-4 h-48 overflow-y-auto border text-sm">
        {transcription.length === 0 ? (
          <p className="text-gray-400 italic">O assistente está pronto. Diga: "Preciso de um eletricista no Talatona"...</p>
        ) : (
          transcription.map((t, i) => <p key={i} className="mb-2">{t}</p>)
        )}
      </div>

      {isActive && (
        <div className="flex gap-2">
          <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-75"></span>
          <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-150"></span>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
