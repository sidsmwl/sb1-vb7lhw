import React, { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';
import type { TimerState } from '../types';

interface CountdownTimerProps {
  onTimerEnd: () => void;
}

export function CountdownTimer({ onTimerEnd }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimerState>(() => {
    const stored = localStorage.getItem('offerEndTime');
    if (stored) {
      const endTime = parseInt(stored, 10);
      const now = Date.now();
      const diff = Math.max(0, endTime - now);
      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      };
    }
    
    // Set initial 12-hour countdown
    const endTime = Date.now() + (12 * 60 * 60 * 1000);
    localStorage.setItem('offerEndTime', endTime.toString());
    return { hours: 12, minutes: 0, seconds: 0 };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          onTimerEnd();
          return prev;
        }

        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimerEnd]);

  return (
    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Timer className="animate-pulse" />
        <h3 className="text-lg font-semibold">Limited Time Offer Ends In:</h3>
      </div>
      <div className="flex justify-center gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
          <div className="text-xs uppercase">Hours</div>
        </div>
        <div className="text-3xl font-bold">:</div>
        <div className="text-center">
          <div className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
          <div className="text-xs uppercase">Minutes</div>
        </div>
        <div className="text-3xl font-bold">:</div>
        <div className="text-center">
          <div className="text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
          <div className="text-xs uppercase">Seconds</div>
        </div>
      </div>
    </div>
  );
}