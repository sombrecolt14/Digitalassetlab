import { useState, useEffect } from 'react';

interface CountdownProps {
  hours?: number;
  className?: string;
}

export function Countdown({ hours = 2, className = '' }: CountdownProps) {
  const calculateTimeLeft = () => {
    const endTime = new Date().getTime() + (hours * 60 * 60 * 1000);
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference > 0) {
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return { hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeBoxStyles = `
    inline-flex flex-col items-center justify-center
    bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 md:p-6
    shadow-lg shadow-[#00D9FF]/10 min-w-[80px] md:min-w-[100px]
  `;

  return (
    <div className={`flex items-center gap-3 md:gap-4 ${className}`}>
      <div className={timeBoxStyles}>
        <span 
          className="text-3xl md:text-4xl bg-gradient-to-r from-[#00D9FF] to-[#c10fff] bg-clip-text text-transparent"
          style={{ 
            fontFamily: 'Plus Jakarta Sans', 
            fontWeight: 600 
          }}
        >
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span 
          className="text-xs md:text-sm text-[#a0a0a0] mt-1"
          style={{ 
            fontFamily: 'Inter', 
            fontWeight: 400 
          }}
        >
          Hours
        </span>
      </div>

      <div className={timeBoxStyles}>
        <span 
          className="text-3xl md:text-4xl bg-gradient-to-r from-[#00D9FF] to-[#c10fff] bg-clip-text text-transparent"
          style={{ 
            fontFamily: 'Plus Jakarta Sans', 
            fontWeight: 600 
          }}
        >
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span 
          className="text-xs md:text-sm text-[#a0a0a0] mt-1"
          style={{ 
            fontFamily: 'Inter', 
            fontWeight: 400 
          }}
        >
          Minutes
        </span>
      </div>

      <div className={timeBoxStyles}>
        <span 
          className="text-3xl md:text-4xl bg-gradient-to-r from-[#00D9FF] to-[#c10fff] bg-clip-text text-transparent"
          style={{ 
            fontFamily: 'Plus Jakarta Sans', 
            fontWeight: 600 
          }}
        >
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span 
          className="text-xs md:text-sm text-[#a0a0a0] mt-1"
          style={{ 
            fontFamily: 'Inter', 
            fontWeight: 400 
          }}
        >
          Seconds
        </span>
      </div>
    </div>
  );
}