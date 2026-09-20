const BARS = [12,18,8,15,24,32,16,12,28,36,14,20,10,22,30,40,18,14,26,32,12,16,8,20,28,38,14,10,24,30,16,12,22,26,10,14,18,12,8,6];

interface WaveformProps {
  progress?: number;
  active?: boolean;
}

export function Waveform({ progress = 0, active = false }: WaveformProps) {
  const played = Math.floor(progress * BARS.length);
  return (
    <div className="flex flex-1 gap-[3px] h-[40px] items-center min-w-0">
      {BARS.map((h, i) => (
        <div
          key={i}
          className="rounded-[2px] shrink-0 w-[4px] transition-colors"
          style={{ height: h, backgroundColor: active && i < played ? "#d97706" : "#fcd34d" }}
        />
      ))}
    </div>
  );
}
