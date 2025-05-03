
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Simulated data for calendar entries
  const calendarData = [
    { date: new Date(2025, 4, 1), entries: ['Morning Meditation', 'Journaling Session'] },
    { date: new Date(2025, 4, 3), entries: ['Yoga Class', 'Nature Walk'] },
    { date: new Date(2025, 4, 5), entries: ['Gratitude Practice'] },
    { date: new Date(2025, 4, 8), entries: ['Self-reflection Time'] },
    { date: new Date(2025, 4, 12), entries: ['Digital Detox Day'] },
    { date: new Date(2025, 4, 15), entries: ['Mindfulness Workshop', 'Reading Time'] },
    { date: new Date(2025, 4, 20), entries: ['Intention Setting Session'] },
    { date: new Date(2025, 4, 25), entries: ['Monthly Review'] },
  ];
  
  const getEntriesForSelectedDate = () => {
    if (!date) return [];
    
    const selectedDate = date;
    const entry = calendarData.find(item => 
      item.date.getDate() === selectedDate.getDate() && 
      item.date.getMonth() === selectedDate.getMonth() && 
      item.date.getFullYear() === selectedDate.getFullYear()
    );
    
    return entry ? entry.entries : [];
  };
  
  const formatDate = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-semibold text-journal-forest">Calendar</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="bg-white border-journal-taupe/20">
            <CardHeader className="bg-journal-light/50">
              <CardTitle className="text-lg font-medium text-journal-forest">
                Monthly View
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                classNames={{
                  day_selected: "bg-journal-sage text-white hover:bg-journal-forest hover:text-white",
                  day_today: "bg-journal-light text-journal-forest",
                  day: cn(
                    "h-10 w-10 p-0 font-normal",
                    calendarData.some(item => 
                      date && 
                      item.date.getDate() === date.getDate() && 
                      item.date.getMonth() === date.getMonth()
                    ) && "border-2 border-journal-sage/50"
                  )
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-white border-journal-taupe/20 h-full">
            <CardHeader className="bg-journal-light/50">
              <CardTitle className="text-lg font-medium text-journal-forest">
                {formatDate(date)}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {getEntriesForSelectedDate().length > 0 ? (
                <div className="space-y-3">
                  {getEntriesForSelectedDate().map((entry, idx) => (
                    <div key={idx} className="p-3 bg-journal-light/50 rounded-md">
                      <p className="text-journal-forest">{entry}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-journal-taupe mb-4">No entries for this date</p>
                  <Button className="bg-journal-sage hover:bg-journal-forest">
                    Add New Entry
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
