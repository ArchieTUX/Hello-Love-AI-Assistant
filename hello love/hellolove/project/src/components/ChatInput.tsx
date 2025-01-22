import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';

interface ChatInputProps {
  onInputReceived: (text: string) => void;
  isListening: boolean;
  toggleListening: () => void;
}

export function ChatInput({ onInputReceived, isListening, toggleListening }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setErrorMessage('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');

      setTranscript(transcript);
      
      if (event.results[0].isFinal) {
        setMessage(transcript);
        setTranscript('');
      }
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
      setTranscript('');
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onInputReceived(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="p-4 border-t border-[#2F2F2F] bg-[#181818]">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full px-4 py-3 rounded-md border border-[#2F2F2F] bg-[#2F2F2F] text-white
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E50914]
                     transition-all"
          />
          {transcript && (
            <div className="absolute left-0 right-0 -top-12 bg-[#2F2F2F] p-2 rounded-md text-gray-300 text-sm">
              {transcript}
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="p-3 rounded-md bg-[#E50914] hover:bg-[#B20710] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim()}
        >
          <Send className="w-5 h-5 text-white" />
        </button>

        <button
          type="button"
          onClick={toggleListening}
          className={`p-3 rounded-md transition-all relative ${
            isListening
              ? 'bg-[#E50914] hover:bg-[#B20710]'
              : 'bg-[#2F2F2F] hover:bg-[#404040]'
          }`}
          title={isListening ? 'Stop listening' : 'Start listening'}
        >
          {isListening ? (
            <MicOff className="w-5 h-5 text-white" />
          ) : (
            <Mic className="w-5 h-5 text-white" />
          )}
          {isListening && (
            <>
              <span className="absolute inset-0 animate-ping rounded-md bg-[#E50914] opacity-75"></span>
              <span className="absolute -inset-4 animate-pulse">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-[#E50914] opacity-20"
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    className="text-[#E50914]"
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="283"
                    strokeDashoffset="100"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="283;0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </span>
            </>
          )}
        </button>
      </form>
      {errorMessage && (
        <p className="text-[#E50914] text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
}