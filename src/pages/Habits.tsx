
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Habits = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const [habits, setHabits] = useState([
    { id: 1, name: 'Meditation (15 min)', days: [0, 1, 3, 6], color: 'bg-journal-sage' },
    { id: 2, name: 'Read (30 min)', days: [0, 1, 2, 4], color: 'bg-journal-terracotta' },
    { id: 3, name: 'Exercise', days: [1, 3, 5], color: 'bg-journal-forest' },
    { id: 4, name: 'Gratitude Practice', days: [0, 1, 2, 3, 4, 5, 6], color: 'bg-blue-500' },
    { id: 5, name: 'Drink 8 glasses of water', days: [0, 2, 3, 6], color: 'bg-cyan-500' },
  ]);
  
  const [newHabit, setNewHabit] = useState('');
  
  const addHabit = () => {
    if (newHabit.trim() === '') return;
    
    const colors = [
      'bg-journal-sage', 
      'bg-journal-terracotta', 
      'bg-journal-forest',
      'bg-blue-500',
      'bg-cyan-500',
      'bg-purple-500',
      'bg-amber-500'
    ];
    
    setHabits([
      ...habits,
      {
        id: Math.max(0, ...habits.map(h => h.id)) + 1,
        name: newHabit,
        days: [],
        color: colors[habits.length % colors.length]
      }
    ]);
    setNewHabit('');
  };
  
  const toggleDay = (habitId: number, dayIndex: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newDays = [...habit.days];
        if (newDays.includes(dayIndex)) {
          return { 
            ...habit, 
            days: newDays.filter(day => day !== dayIndex) 
          };
        } else {
          return { 
            ...habit, 
            days: [...newDays, dayIndex] 
          };
        }
      }
      return habit;
    }));
  };
  
  const deleteHabit = (habitId: number) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-semibold text-journal-forest">Habit Tracker</h1>
      
      <Card className="bg-white border-journal-taupe/20 overflow-hidden">
        <CardHeader className="bg-journal-light/50">
          <CardTitle className="text-lg font-medium text-journal-forest">Weekly Habits</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex mb-4">
            <div className="w-64 mr-4"></div>
            <div className="flex-1 grid grid-cols-7 gap-2">
              {daysOfWeek.map((day, idx) => (
                <div key={idx} className="flex justify-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium text-journal-forest">
                    {day}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {habits.map(habit => (
            <div key={habit.id} className="flex items-center mb-3">
              <div className="w-64 flex items-center">
                <div className={cn("w-3 h-12 rounded-r-md mr-3", habit.color)}></div>
                <div className="flex-1">{habit.name}</div>
                <button 
                  onClick={() => deleteHabit(habit.id)}
                  className="text-journal-taupe/70 hover:text-journal-terracotta p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex-1 grid grid-cols-7 gap-2">
                {daysOfWeek.map((day, dayIndex) => (
                  <div key={dayIndex} className="flex justify-center">
                    <button
                      onClick={() => toggleDay(habit.id, dayIndex)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all",
                        habit.days.includes(dayIndex)
                          ? cn("border-transparent", habit.color, "text-white")
                          : "border-gray-300 bg-white hover:border-gray-400"
                      )}
                    >
                      {habit.days.includes(dayIndex) && <Check size={16} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mt-8 flex items-center">
            <input
              type="text"
              value={newHabit}
              onChange={e => setNewHabit(e.target.value)}
              placeholder="Add a new habit..."
              className="flex-1 input-journal mr-2"
            />
            <Button 
              onClick={addHabit} 
              className="bg-journal-sage hover:bg-journal-forest"
            >
              <Plus size={16} className="mr-1" /> Add Habit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Habits;
