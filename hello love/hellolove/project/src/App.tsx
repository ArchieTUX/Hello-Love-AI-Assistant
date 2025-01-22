import React, { useState, useCallback, useEffect } from 'react';
import { Message, Settings as SettingsType, Task } from './types';
import { ChatWindow } from './components/ChatWindow';
import { Settings } from './components/Settings';
import { TaskPanel } from './components/TaskPanel';
import { ChatInput } from './components/ChatInput';
import { Heart, Settings2, Layout, CheckSquare } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [settings, setSettings] = useState<SettingsType>({
    assistantName: 'Love',
    voiceEnabled: true,
    theme: 'dark',
    language: 'en',
    notifications: true,
    taskReminders: true,
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);

  const handleCommand = useCallback((text: string) => {
    const commandMatch = text.match(/^\/(\w+)\s*(.*)/);
    if (commandMatch) {
      const [, command, args] = commandMatch;
      switch (command) {
        case 'task':
          const newTask: Task = {
            id: Date.now().toString(),
            title: args,
            completed: false,
            priority: 'medium',
            createdAt: new Date(),
          };
          setTasks(prev => [...prev, newTask]);
          return `Created new task: ${args}`;
        case 'settings':
          setShowSettings(true);
          return 'Opening settings...';
        default:
          return `Unknown command: ${command}`;
      }
    }
    return null;
  }, []);

  const handleInput = useCallback((text: string) => {
    const commandResponse = handleCommand(text);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: commandResponse || `Hello! I'm ${settings.assistantName}, how can I help you today?`,
        type: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  }, [settings.assistantName, handleCommand]);

  const toggleListening = useCallback(() => {
    setIsListening(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8 h-screen flex flex-col">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500">
              Hello {settings.assistantName}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowTasks(!showTasks)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Tasks"
            >
              <CheckSquare className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Settings"
            >
              <Settings2 className="w-6 h-6" />
            </button>
          </div>
        </header>

        <main className="flex-1 flex gap-4 overflow-hidden">
          <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden flex flex-col">
            {showSettings ? (
              <Settings settings={settings} onSettingsChange={setSettings} />
            ) : (
              <>
                <ChatWindow messages={messages} assistantName={settings.assistantName} />
                <ChatInput
                  onInputReceived={handleInput}
                  isListening={isListening}
                  toggleListening={toggleListening}
                />
              </>
            )}
          </div>
          
          {showTasks && (
            <TaskPanel tasks={tasks} setTasks={setTasks} />
          )}
        </main>
      </div>
    </div>
  );
}