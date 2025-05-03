
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const [settings, setSettings] = useState({
    dailyReminder: true,
    weeklyReview: true,
    notificationSound: true,
    journalPrompts: [
      { id: 1, text: "What am I grateful for today?", enabled: true },
      { id: 2, text: "What is my intention for today?", enabled: true },
      { id: 3, text: "How am I feeling right now?", enabled: true },
      { id: 4, text: "What brought me joy today?", enabled: true },
      { id: 5, text: "What challenged me today and what did I learn?", enabled: true },
      { id: 6, text: "What acts of kindness did I practice or receive today?", enabled: true },
      { id: 7, text: "How did I nurture my wellbeing today?", enabled: true },
    ]
  });
  
  const toggleSetting = (setting: keyof typeof settings) => {
    if (setting === 'journalPrompts') return;
    
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings]
    });
  };
  
  const togglePrompt = (promptId: number) => {
    setSettings({
      ...settings,
      journalPrompts: settings.journalPrompts.map(prompt => 
        prompt.id === promptId 
          ? { ...prompt, enabled: !prompt.enabled }
          : prompt
      )
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-semibold text-journal-forest">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-journal-taupe/20">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-journal-forest">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Reminder</p>
                <p className="text-sm text-journal-taupe">Receive a daily reminder to journal</p>
              </div>
              <Switch 
                checked={settings.dailyReminder} 
                onCheckedChange={() => toggleSetting('dailyReminder')}
                className="data-[state=checked]:bg-journal-sage"
              />
            </div>
            
            <Separator className="bg-journal-taupe/20" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Review</p>
                <p className="text-sm text-journal-taupe">Receive a weekly summary of your habits and journal entries</p>
              </div>
              <Switch 
                checked={settings.weeklyReview} 
                onCheckedChange={() => toggleSetting('weeklyReview')}
                className="data-[state=checked]:bg-journal-sage"
              />
            </div>
            
            <Separator className="bg-journal-taupe/20" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notification Sound</p>
                <p className="text-sm text-journal-taupe">Play a sound with notifications</p>
              </div>
              <Switch 
                checked={settings.notificationSound} 
                onCheckedChange={() => toggleSetting('notificationSound')}
                className="data-[state=checked]:bg-journal-sage"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-journal-taupe/20">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-journal-forest">Journal Prompts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-journal-taupe">Enable or disable specific journal prompts</p>
            
            {settings.journalPrompts.map(prompt => (
              <div key={prompt.id} className="flex items-center justify-between">
                <p className="text-sm">{prompt.text}</p>
                <Switch 
                  checked={prompt.enabled} 
                  onCheckedChange={() => togglePrompt(prompt.id)}
                  className="data-[state=checked]:bg-journal-sage"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-white border-journal-taupe/20">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-journal-forest">Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-journal-taupe">Manage your journal data</p>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-journal-taupe/20">Export Journal Entries</Button>
            <Button variant="outline" className="border-journal-taupe/20">Export Habit Data</Button>
            <Button variant="outline" className="border-journal-taupe/20 text-journal-terracotta hover:text-journal-terracotta hover:bg-journal-terracotta/10">
              Clear All Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
