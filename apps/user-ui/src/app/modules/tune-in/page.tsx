"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import { AudioCard } from "./audiocard";
import { SideAudioCard } from "./side-audiocard";
import { audioQueue, audioFormats, type AudioFormat } from "./data";

export function TuneIn() {
  const [format, setFormat] = useState<AudioFormat>("Audio Only");

  const primary = audioQueue[1];
  const prev    = audioQueue[0];
  const next1   = audioQueue[2];

  return (
    <section style={{ background: "linear-gradient(138deg,#fff 25%,#faf9f6 47.5%,#f8fafc 70%,#faf9f6 75%)" }}>
      <div className="flex flex-col items-center gap-12 px-5 md:px-20 py-24">
        {/* Heading */}
        <div className="flex flex-col items-center gap-4 text-center max-w-[840px]">
          <div className="flex items-center gap-2">
            <div className="bg-[#d97706] h-[2px] w-6" />
            <span className="font-geist font-bold text-[#d97706] text-[12px] uppercase">Personalized Guidance</span>
          </div>
          <h2 className="font-outfit font-bold text-[#0f172a] text-[36px] md:text-[40px] leading-[1.15]">Tune In</h2>
          <p className="font-geist font-normal text-[#475569] text-[16px] leading-[1.6]">
            One piece of safety information selected for you, delivered how you want it.
          </p>
        </div>

        {/* Format pills */}
        <div className="flex flex-wrap gap-3 justify-center">
          {audioFormats.map((f) => {
            const isActive    = format === f;
            const isAvailable = f === "Audio Only";
            return (
              <button
                key={f}
                onClick={() => isAvailable ? setFormat(f) : undefined}
                disabled={!isAvailable}
                className={`text-[14px] px-5 py-[10px] rounded-[99px] transition-colors flex items-center gap-2 ${
                  isActive
                    ? "bg-[#0f172a] text-white font-geist font-semibold"
                    : isAvailable
                    ? "border border-[#e2e8f0] text-[#475569] font-geist font-medium hover:bg-[#f8fafc]"
                    : "border border-[#e2e8f0] text-[#b8c2cc] font-geist font-medium opacity-50 cursor-not-allowed"
                }`}
              >
                {isActive && isAvailable && (
                  <span className="flex items-end gap-[3px] h-[14px] mr-1">
                    <span className="bg-white w-[2px] rounded-[1px] h-3 inline-block" />
                    <span className="bg-white w-[2px] rounded-[1px] h-2 inline-block" />
                    <span className="bg-white w-[2px] rounded-[1px] h-[14px] inline-block" />
                  </span>
                )}
                {f}
              </button>
            );
          })}
        </div>

        {/* Offline banner */}
        <div className="bg-[rgba(249,244,234,0.6)] flex items-center gap-2 px-5 py-[10px] rounded-[20px]">
          <Download size={14} className="text-[#d97706]" />
          <span className="font-geist font-normal text-[#334157] text-[13px]">
            All audio can be downloaded for areas with limited connectivity
          </span>
        </div>

        {/* Carousel */}
        <div className="relative w-full overflow-hidden" style={{ height: 760 }}>
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-48 z-10"
            style={{ background: "linear-gradient(to right,#faf9f6,transparent)" }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-48 z-10"
            style={{ background: "linear-gradient(to left,#faf9f6,transparent)" }} />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-6">
              <div className="hidden lg:block">
                <SideAudioCard item={prev} />
              </div>
              <AudioCard item={primary} />
              <div className="hidden lg:block">
                <SideAudioCard item={next1} />
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center gap-3">
          <img alt="" className="h-[8px] w-[88px]" src="/caba4.svg" />
          <p className="font-geist font-normal text-[#64748b] text-[13px]">1 of 6 briefings</p>
        </div>
      </div>
    </section>
  );
}
