
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const JournalEntry = () => {
  const [date, setDate] = useState(new Date());
  
  const formattedDate = date.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const goToPreviousDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);
  };
  
  const goToNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
  };
  
  const promptQuestions = [
    "What am I grateful for today?",
    "What is my intention for today?",
    "How am I feeling right now?",
    "What brought me joy today?",
    "What challenged me today and what did I learn?",
    "What acts of kindness did I practice or receive today?",
    "How did I nurture my wellbeing today?"
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-semibold text-journal-forest">Journal</h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline"
            onClick={goToPreviousDay}
            className="border-journal-taupe/20 hover:bg-journal-light"
          >
            <ChevronLeft size={18} />
          </Button>
          <div className="flex items-center bg-white px-3 py-1 rounded-md border border-journal-taupe/20">
            <CalendarIcon size={16} className="mr-2 text-journal-taupe" />
            <span>{formattedDate}</span>
          </div>
          <Button 
            variant="outline"
            onClick={goToNextDay}
            className="border-journal-taupe/20 hover:bg-journal-light"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
      
      <Card className="journal-paper">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-serif font-medium text-journal-forest mb-6 text-center">
            {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
          
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-journal-forest mb-2">Mood Check-in</label>
              <div className="flex justify-between items-center">
                <span className="text-xs text-journal-taupe">Low</span>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => (
                    <button 
                      key={mood}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                        ${mood === 7 
                          ? 'bg-journal-sage text-white' 
                          : 'bg-journal-light hover:bg-journal-taupe/20'}
                      `}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-journal-taupe">High</span>
              </div>
            </div>
            
            {promptQuestions.map((question, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-journal-forest mb-2">{question}</label>
                <textarea 
                  className="w-full min-h-[100px] p-3 bg-transparent border-b border-journal-taupe/30 focus:outline-none focus:border-journal-sage resize-none"
                  placeholder="Write your thoughts here..."
                />
              </div>
            ))}
            
            <div className="flex justify-end pt-4">
              <Button className="bg-journal-sage hover:bg-journal-forest">Save Entry</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalEntry;
