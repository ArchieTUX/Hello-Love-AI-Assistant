export interface Message {
  id: string;
  text: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  command?: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
  tags?: string[];
}

export interface Settings {
  assistantName: string;
  voiceEnabled: boolean;
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  taskReminders: boolean;
}