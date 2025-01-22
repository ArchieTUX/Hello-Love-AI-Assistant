import React from 'react';
import { Message } from '../types';
import { MessageCircle, Bot, Volume2, VolumeX } from 'lucide-react';

interface ChatWindowProps {
  messages: Message[];
  assistantName: string;
}

export function ChatWindow({ messages, assistantName }: ChatWindowProps) {
  const [speaking, setSpeaking] = React.useState<string | null>(null);

  const speak = (text: string, messageId: string) => {
    if (speaking === messageId) {
      window.speechSynthesis.cancel();
      setSpeaking(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setSpeaking(null);
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    window.speechSynthesis.speak(utterance);
    setSpeaking(messageId);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <Bot className="w-12 h-12 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Welcome to Hello Love</h2>
          <p className="max-w-md">
            Start a conversation by typing a message or using voice commands.
            Try /task to create a new task or /settings to customize your experience.
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.type === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
                message.type === 'user'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.type === 'user' ? (
                  <MessageCircle className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
                <span className="font-semibold">
                  {message.type === 'user' ? 'You' : assistantName}
                </span>
                {message.type === 'assistant' && (
                  <button
                    onClick={() => speak(message.text, message.id)}
                    className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={speaking === message.id ? 'Stop speaking' : 'Speak message'}
                  >
                    {speaking === message.id ? (
                      <VolumeX className="w-4 h-4 text-purple-500" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
              <p className="break-words">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}