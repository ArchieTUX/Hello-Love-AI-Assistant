import React from 'react';
import { Task } from '../types';
import { CheckSquare, Square, Trash2, Clock } from 'lucide-react';

interface TaskPanelProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function TaskPanel({ tasks, setTasks }: TaskPanelProps) {
  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden flex flex-col">
      <div className="p-4 border-b dark:border-gray-800">
        <h2 className="text-lg font-semibold">Tasks</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className="flex-shrink-0"
              aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.completed ? (
                <CheckSquare className="w-5 h-5 text-green-500" />
              ) : (
                <Square className="w-5 h-5" />
              )}
            </button>
            <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </span>
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-500 hover:text-red-500 transition-colors"
                aria-label="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No tasks yet. Create one using /task command.
          </p>
        )}
      </div>
    </div>
  );
}