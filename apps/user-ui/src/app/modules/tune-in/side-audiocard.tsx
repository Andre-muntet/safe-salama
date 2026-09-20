import { Play, Download } from "lucide-react";
import { Waveform } from "../../shared/waveform";
import type { AudioItem } from "./data";

interface SideAudioCardProps {
  item: AudioItem;
}

export function SideAudioCard({ item }: SideAudioCardProps) {
  return (
    <div
      className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_2px_4px_rgba(15,23,42,0.03),0px_8px_12px_rgba(15,23,42,0.05)] flex flex-col justify-between p-7 opacity-55 shrink-0"
      style={{ width: 420, height: 700 }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="bg-[#fef3c7] text-[#d97706] font-geist font-semibold text-[11px] uppercase px-[10px] py-1 rounded-[6px]">
            {item.label}
          </span>
          <span className="font-geist font-normal text-[#64748b] text-[13px]">{item.duration}</span>
        </div>
        <p className="font-outfit font-bold text-[#0f172a] text-[24px] leading-[1.25]">{item.title}</p>
      </div>

      <div className="bg-[#f7f2eb] flex items-center gap-[6px] px-3 py-2 rounded-[8px] self-start">
        <Download size={12} className="text-[#d97706]" />
        <span className="font-geist font-normal text-[#63738c] text-[12px]">Available offline</span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-[#d97706] flex items-center justify-center rounded-[20px] size-[40px] shrink-0">
            <Play size={16} className="text-white fill-white" />
          </div>
          <Waveform progress={0} />
        </div>
        <div className="flex justify-between text-[13px]">
          <span className="font-geist font-medium text-[#d97706]">0:00</span>
          <span className="font-geist font-normal text-[#64748b]">{item.duration}</span>
        </div>
      </div>
    </div>
  );
}
