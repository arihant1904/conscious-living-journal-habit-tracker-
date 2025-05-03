
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MeditationTimer from '@/components/MeditationTimer';
import MoodChart from '@/components/MoodChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Example data
  const moodData = [
    { day: 'Mon', level: 7 },
    { day: 'Tue', level: 6 },
    { day: 'Wed', level: 8 },
    { day: 'Thu', level: 5 },
    { day: 'Fri', level: 9 },
    { day: 'Sat', level: 8 },
    { day: 'Sun', level: 7 },
  ];
  
  const habitProgress = 65; // percentage
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-journal-forest dark:text-journal-cream">Welcome Back</h1>
          <p className="text-journal-taupe dark:text-journal-cream/70">{formattedDate}</p>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/journal')}
        >
          New Journal Entry
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-journal-dark border-journal-taupe/20 dark:border-journal-taupe/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center text-journal-forest dark:text-journal-cream">
              <CheckSquare size={18} className="mr-2 text-journal-sage" />
              Habit Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex justify-between text-sm dark:text-journal-cream/90">
              <span>Weekly Progress</span>
              <span className="font-medium">{habitProgress}%</span>
            </div>
            <div className="w-full bg-journal-light dark:bg-journal-dark/50 rounded-full h-2.5">
              <div 
                className="bg-journal-sage h-2.5 rounded-full"
                style={{ width: `${habitProgress}%` }}
              ></div>
            </div>
            
            <div className="mt-4 space-y-2">
              {[
                { name: 'Meditation', completed: true },
                { name: 'Reading', completed: true },
                { name: 'Exercise', completed: false },
                { name: 'Journaling', completed: false }
              ].map((habit, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm dark:text-journal-cream/90">{habit.name}</span>
                  <div className={`habit-check dark:border-journal-sage/70 ${habit.completed ? 'completed' : ''}`}>
                    {habit.completed && <CheckSquare size={14} />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-journal-dark border-journal-taupe/20 dark:border-journal-taupe/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center text-journal-forest dark:text-journal-cream">
              <CalendarIcon size={18} className="mr-2 text-journal-terracotta" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { time: '7:00 AM', task: 'Morning Meditation' },
              { time: '9:00 AM', task: 'Work Session' },
              { time: '12:30 PM', task: 'Lunch Break + Walking' },
              { time: '4:00 PM', task: 'Reading Time' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start">
                <div className="text-xs text-journal-taupe dark:text-journal-cream/70 font-medium w-20">{item.time}</div>
                <div className="text-sm dark:text-journal-cream/90">{item.task}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Replace the basic chart with our enhanced MoodChart */}
        <MoodChart data={moodData} />
      </div>
      
      {/* Add the meditation timer */}
      <MeditationTimer />
      
      <Card className="bg-white dark:bg-journal-dark border-journal-taupe/20 dark:border-journal-taupe/10">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-journal-forest dark:text-journal-cream">Recent Journal Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: 'May 2, 2025', title: 'Finding Balance', preview: 'Today I focused on finding balance between work and personal time...' },
              { date: 'May 1, 2025', title: 'New Beginnings', preview: 'I\'m excited about the new project that started today...' },
              { date: 'April 30, 2025', title: 'Gratitude Practice', preview: 'Three things I\'m grateful for today: 1. The morning sunshine...' },
            ].map((entry, idx) => (
              <div key={idx} className="p-4 border-l-4 border-journal-sage bg-journal-light/50 dark:bg-journal-forest/20 rounded-r-md">
                <div className="text-xs text-journal-taupe dark:text-journal-cream/70 mb-1">{entry.date}</div>
                <h3 className="font-medium mb-2 dark:text-journal-cream">{entry.title}</h3>
                <p className="text-sm text-journal-dark/80 dark:text-journal-cream/80">{entry.preview}</p>
                <button className="text-journal-forest dark:text-journal-sage text-sm mt-2 hover:underline">Read more</button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
