
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MeditationTimer = () => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [selectedTime, setSelectedTime] = useState(300);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play a sound or notification when timer completes
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(selectedTime);
  };

  const setTimerDuration = (seconds: number) => {
    setSelectedTime(seconds);
    setTimeLeft(seconds);
    setIsActive(false);
  };

  return (
    <Card className="bg-white border-journal-taupe/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-journal-forest">Meditation Timer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-4xl font-mono font-bold my-4 text-journal-forest">
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex space-x-3 mb-4">
            <Button variant="outline" 
              className={`border-journal-sage ${selectedTime === 60 ? 'bg-journal-sage text-white' : ''}`}
              onClick={() => setTimerDuration(60)}>
              1m
            </Button>
            <Button variant="outline" 
              className={`border-journal-sage ${selectedTime === 300 ? 'bg-journal-sage text-white' : ''}`}
              onClick={() => setTimerDuration(300)}>
              5m
            </Button>
            <Button variant="outline" 
              className={`border-journal-sage ${selectedTime === 600 ? 'bg-journal-sage text-white' : ''}`}
              onClick={() => setTimerDuration(600)}>
              10m
            </Button>
            <Button variant="outline" 
              className={`border-journal-sage ${selectedTime === 1200 ? 'bg-journal-sage text-white' : ''}`}
              onClick={() => setTimerDuration(1200)}>
              20m
            </Button>
          </div>
          
          <div className="flex space-x-3">
            <Button onClick={toggleTimer} variant="default" className="bg-journal-sage hover:bg-journal-forest">
              {isActive ? <Pause size={18} /> : <Play size={18} />} 
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={resetTimer} variant="outline" className="border-journal-taupe/20">
              <RotateCcw size={18} className="mr-1" /> Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeditationTimer;
