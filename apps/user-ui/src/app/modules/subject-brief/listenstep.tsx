"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Download, CheckCircle2, Clock } from "lucide-react";
import type { ListenStepData } from "./types";

const PLAYED_BARS   = [8,12,16,14,10,6,8,18,22,24,16,12,14,20,28,30,26,18,12,8,10,16,22,26,28,20];
const UNPLAYED_BARS = [14,10,8,12,16,18,22,20,14,12,18,24,28,32,26,20,14,10,12,16,20,18,14,12,8,6,10,14,18,16,12,10,14,18,22,20,14,10,6];
const ALL_BARS = [...PLAYED_BARS, ...UNPLAYED_BARS];

function parseSeconds(duration: string): number {
  const [m, s] = duration.split(":").map(Number);
  return m * 60 + s;
}

function fmtTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

type TabKey = "Info" | "Transcript";

interface ListenStepProps {
  data: ListenStepData;
  onNext: () => void;
}

export function ListenStep({ data, onNext }: ListenStepProps) {
  const [playing, setPlaying]     = useState(false);
  const [elapsed, setElapsed]     = useState(0);
  const [tab, setTab]             = useState<TabKey>("Transcript");
  const [downloaded, setDownloaded] = useState(false);
  const timerRef                  = useRef<number | null>(null);
  const totalSecs                 = parseSeconds(data.duration);

  useEffect(() => {
    if (playing) {
      timerRef.current = window.setInterval(() => {
        setElapsed((e) => {
          if (e >= totalSecs) { setPlaying(false); return totalSecs; }
          return e + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, totalSecs]);

  const progress    = totalSecs > 0 ? elapsed / totalSecs : 0;
  const playedCount = Math.floor(progress * ALL_BARS.length);

  function handleDownload() {
    const a = document.createElement("a");
    a.href = "/dv-audio.mp3";
    a.download = "when-behaviour-becomes-abuse.mp3";
    a.click();
    setDownloaded(true);
  }

  return (
    <div className="flex flex-col items-center px-5 md:px-20 pb-24 pt-14">
      <div className="flex flex-col gap-8 w-full max-w-[720px]">
        {/* Heading */}
        <div className="flex flex-col gap-3 items-center text-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#fef3c7] px-2 py-1 rounded-[4px]">
              <span className="font-geist font-bold text-[#d97706] text-[14px]">
                {String(data.stepNumber).padStart(2, "0")}
              </span>
            </div>
            <span className="font-geist font-semibold text-[#475569] text-[14px] uppercase">
              {data.sectionLabel}
            </span>
          </div>
          <h2 className="font-outfit font-bold text-[#0f172a] text-[40px] leading-[1.2]">
            {data.title}
          </h2>
          <p className="font-geist font-normal text-[#475569] text-[16px] leading-[1.5] max-w-[560px]">
            {data.subtitle}
          </p>
          {downloaded && (
            <div className="flex items-center gap-[6px] bg-[#f0fdf4] border border-[#bbf7d0] px-3 py-[5px] rounded-[20px]">
              <CheckCircle2 size={12} className="text-[#22c55e]" />
              <span className="font-geist font-medium text-[#16a34a] text-[12px]">Available offline</span>
            </div>
          )}
        </div>

        {/* Audio player card */}
        <div className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_8px_12px_rgba(0,0,0,0.03)] flex flex-col gap-6 p-7 w-full max-w-[680px] self-center">
          {/* Controls + waveform */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="bg-[#d97706] flex items-center justify-center rounded-full size-[48px] shrink-0 hover:bg-[#b45309] transition-colors"
            >
              {playing
                ? <Pause size={18} className="text-white fill-white" />
                : <Play  size={18} className="text-white fill-white" />
              }
            </button>

            <div className="flex flex-col gap-[6px] flex-1 min-w-0">
              <div className="flex gap-[3px] h-[36px] items-center w-full">
                {ALL_BARS.map((h, i) => (
                  <div
                    key={i}
                    className="rounded-[1.5px] shrink-0 w-[3px] transition-colors"
                    style={{ height: h, backgroundColor: i < playedCount ? "#d97706" : "#e2e8f0" }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="font-geist font-semibold text-[#d97706]">{fmtTime(elapsed)}</span>
                <span className="font-geist font-medium text-[#64748b]">{data.duration}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#e2e8f0]">
            {(["Info", "Transcript"] as TabKey[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-[14px] transition-colors ${
                  tab === t
                    ? "font-geist font-semibold text-[#d97706] border-b-2 border-[#d97706]"
                    : "font-geist font-medium text-[#64748b]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tab === "Transcript" ? (
            <div className="relative flex flex-col gap-4 overflow-hidden py-2">
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 z-10"
                style={{ background: "linear-gradient(to bottom, white, transparent)" }} />
              <div className="flex flex-col gap-3 opacity-40">
                {data.transcript.preText.map((line, i) => (
                  <p key={i} className="font-geist font-normal text-[#0f172a] text-[15px] leading-[1.5]">{line}</p>
                ))}
              </div>
              <div className="bg-[#faf5ed] border border-[rgba(217,120,5,0.13)] rounded-[12px] px-4 py-3 flex flex-col gap-[10px]">
                {data.transcript.highlighted.map((line, i) => (
                  <p key={i} className="font-geist font-bold text-[#0f172a] text-[18px] leading-[1.4]">{line}</p>
                ))}
              </div>
              <div className="flex flex-col gap-3 opacity-60">
                {data.transcript.postText.map((line, i) => (
                  <p key={i} className={`font-geist font-normal text-[15px] leading-[1.5] ${i === data.transcript.postText.length - 1 ? "text-[#475569]" : "text-[#0f172a]"}`}>{line}</p>
                ))}
              </div>
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 z-10"
                style={{ background: "linear-gradient(to top, white, transparent)" }} />
            </div>
          ) : (
            <div className="flex flex-col gap-2 text-[14px] font-geist font-normal text-[#475569] leading-[1.6]">
              <p>Duration: {data.duration}</p>
              <p>An audio story illustrating the shift from care to control through a neighbour's perspective.</p>
            </div>
          )}
        </div>

        {/* Download */}
        {downloaded ? (
          <div className="flex items-center gap-[6px] self-center text-[#22c55e] py-2">
            <CheckCircle2 size={14} />
            <span className="font-geist font-medium text-[14px]">Downloaded</span>
          </div>
        ) : (
          <button
            onClick={handleDownload}
            className="flex items-center gap-[6px] self-center text-[#475569] hover:text-[#334155] transition-colors py-2"
          >
            <Download size={14} />
            <span className="font-geist font-medium text-[14px]">Download for offline listening</span>
          </button>
        )}

        {/* Footer */}
        <div className="border-t border-[#e2e8f0] pt-8 flex items-center justify-between w-full max-w-[680px] self-center">
          <div className="flex items-center gap-[6px] text-[#475569]">
            <Clock size={14} />
            <span className="font-geist font-normal text-[13px]">Est. Listening Time: {data.listeningTime}</span>
          </div>
          {/* Watch step — not implemented; shown muted */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-[6px] cursor-default opacity-40">
            <span className="font-geist font-bold text-[#64748b] text-[14px]">{data.nextLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
