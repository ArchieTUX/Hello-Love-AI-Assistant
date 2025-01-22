import React from 'react';
import { Settings as SettingsType } from '../types';
import { Settings as SettingsIcon, Bell, Globe, Moon, Sun } from 'lucide-react';

interface SettingsProps {
  settings: SettingsType;
  onSettingsChange: (settings: SettingsType) => void;
}

export function Settings({ settings, onSettingsChange }: SettingsProps) {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="flex items-center gap-2 mb-8">
        <SettingsIcon className="w-6 h-6" />
        <h2 className="text-2xl font-semibold">Settings</h2>
      </div>
      
      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-medium mb-4">Personalization</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Assistant Name
              </label>
              <input
                type="text"
                value={settings.assistantName}
                onChange={(e) =>
                  onSettingsChange({ ...settings, assistantName: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md border dark:border-gray-700 dark:bg-gray-800
                         focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter assistant name"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {settings.theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <span className="text-sm font-medium">Dark Mode</span>
              </div>
              <button
                onClick={() =>
                  onSettingsChange({
                    ...settings,
                    theme: settings.theme === 'dark' ? 'light' : 'dark',
                  })
                }
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-4">Accessibility</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">Voice Enabled</span>
              </div>
              <button
                onClick={() =>
                  onSettingsChange({
                    ...settings,
                    voiceEnabled: !settings.voiceEnabled,
                  })
                }
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <span className="text-sm font-medium">Enable Notifications</span>
              </div>
              <button
                onClick={() =>
                  onSettingsChange({
                    ...settings,
                    notifications: !settings.notifications,
                  })
                }
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <span className="text-sm font-medium">Task Reminders</span>
              </div>
              <button
                onClick={() =>
                  onSettingsChange({
                    ...settings,
                    taskReminders: !settings.taskReminders,
                  })
                }
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.taskReminders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}