import { ArrowUpRight, Download } from "lucide-react";
import type { Subject } from "./data";

interface SubjectCardProps {
  subject: Subject;
  onClick?: () => void;
  isActive?: boolean;
}

export function SubjectCard({ subject, onClick, isActive = false }: SubjectCardProps) {
  return (
    <div
      onClick={isActive ? onClick : undefined}
      className={`relative flex flex-col justify-between overflow-hidden rounded-[16px] shadow-[0px_8px_24px_rgba(15,23,42,0.05)] shrink-0 transition-transform ${
        isActive ? "cursor-pointer hover:scale-[1.02]" : "cursor-default"
      }`}
      style={{ width: 240, height: 360 }}
    >
      <img
        alt={subject.title}
        className="absolute inset-0 size-full object-cover"
        style={isActive ? {} : { filter: "saturate(0.3) brightness(0.7)" }}
        src={subject.img}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(124deg,rgba(0,0,0,0) 25%,rgba(0,0,0,.1) 50%,rgba(0,0,0,.85) 75%)" }}
      />

      {/* Top-right: arrow (active only) or nothing */}
      {isActive && (
        <div className="relative flex justify-end p-4">
          <div className="backdrop-blur-[4px] bg-[rgba(255,255,255,0.15)] flex items-center justify-center rounded-[14px] size-[28px]">
            <ArrowUpRight size={12} className="text-white" />
          </div>
        </div>
      )}

      {/* Bottom content */}
      <div className="relative flex flex-col gap-2 p-5 mt-auto">
        {!isActive && (
          <div className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] px-2 py-1 rounded-[6px] self-start mb-1">
            <span className="font-geist font-semibold text-[rgba(255,255,255,0.5)] text-[10px] uppercase">Coming soon</span>
          </div>
        )}
        {isActive && (
          <div className="bg-[rgba(255,255,255,0.1)] px-2 py-1 rounded-[6px] self-start">
            <span className="font-geist font-semibold text-white text-[11px] uppercase">{subject.briefs} briefs</span>
          </div>
        )}
        <p className={`font-outfit font-semibold text-[20px] leading-[1.25] ${isActive ? "text-white" : "text-[rgba(255,255,255,0.5)]"}`}>
          {subject.title}
        </p>
        {isActive && subject.offline && (
          <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.15)] px-[6px] py-[3px] rounded-[4px] self-start">
            <Download size={10} className="text-[rgba(255,255,255,0.8)]" />
            <span className="font-geist font-medium text-[rgba(255,255,255,0.8)] text-[10px]">Available offline</span>
          </div>
        )}
      </div>
    </div>
  );
}
