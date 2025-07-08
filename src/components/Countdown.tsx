import { useCountdown } from '@/hooks/useCountdown';

interface CountdownProps {
  targetDate: Date;
}

export const Countdown = ({ targetDate }: CountdownProps) => {
  const timeLeft = useCountdown(targetDate);

  return (
    <div className="flex justify-center items-center space-x-4 md:space-x-8 text-white">
      <div className="text-center">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-lg">
          <div className="text-3xl md:text-5xl font-black tabular-nums">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base font-medium text-white/80 uppercase tracking-wider mt-2">
            Dias
          </div>
        </div>
      </div>

      <div className="text-2xl md:text-4xl font-black text-white/60 animate-pulse">:</div>

      <div className="text-center">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-lg">
          <div className="text-3xl md:text-5xl font-black tabular-nums">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base font-medium text-white/80 uppercase tracking-wider mt-2">
            Horas
          </div>
        </div>
      </div>

      <div className="text-2xl md:text-4xl font-black text-white/60 animate-pulse">:</div>

      <div className="text-center">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-lg">
          <div className="text-3xl md:text-5xl font-black tabular-nums">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base font-medium text-white/80 uppercase tracking-wider mt-2">
            Min
          </div>
        </div>
      </div>

      <div className="text-2xl md:text-4xl font-black text-white/60 animate-pulse">:</div>

      <div className="text-center">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px] shadow-lg">
          <div className="text-3xl md:text-5xl font-black tabular-nums">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-base font-medium text-white/80 uppercase tracking-wider mt-2">
            Seg
          </div>
        </div>
      </div>
    </div>
  );
};