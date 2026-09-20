"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, CheckCircle2, Share2, Download, Mic } from "lucide-react";
import { Waveform } from "../../shared/waveform";
import type { AudioItem } from "./data";

type TabKey = "Info" | "Transcript";

interface AudioCardProps {
  item: AudioItem;
}

function fmtTime(progress: number, duration: string): string {
  const [m, s] = duration.split(":").map(Number);
  const totalSec = m * 60 + s;
  const elapsed = Math.floor(progress * totalSec);
  return `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;
}

export function AudioCard({ item }: AudioCardProps) {
  const [tab, setTab]             = useState<TabKey>("Info");
  const [playing, setPlaying]     = useState(false);
  const [progress, setProgress]   = useState(0);
  const [shareMsg, setShareMsg]   = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const timerRef                  = useRef<number | null>(null);

  useEffect(() => {
    if (playing) {
      timerRef.current = window.setInterval(() => {
        setProgress((p) => {
          if (p >= 1) { setPlaying(false); return 1; }
          return p + 0.001;
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing]);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareMsg("Link copied.");
      setTimeout(() => setShareMsg(""), 2500);
    });
  }

  function handleDownload() {
    const a = document.createElement("a");
    a.href = "/dv-audio.mp3";
    a.download = "safety-audio.mp3";
    a.click();
    setDownloaded(true);
  }

  return (
    <div
      className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_2px_4px_rgba(15,23,42,0.03),0px_8px_12px_rgba(15,23,42,0.05)] flex flex-col p-7 shrink-0 w-[min(450px,90vw)]"
      style={{ height: 700 }}
    >
      {/* Header */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="bg-[#fef3c7] text-[#d97706] font-geist font-semibold text-[11px] uppercase px-[10px] py-1 rounded-[6px]">
            {item.label}
          </span>
          <span className="font-geist font-normal text-[#64748b] text-[13px]">{item.duration}</span>
        </div>
        <p className="font-outfit font-bold text-[#0f172a] text-[28px] leading-[1.25]">{item.title}</p>

        {/* Player */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="bg-[#d97706] flex items-center justify-center rounded-[20px] size-[40px] shrink-0 hover:bg-[#b45309] transition-colors"
            >
              {playing
                ? <Pause size={16} className="text-white fill-white" />
                : <Play  size={16} className="text-white fill-white" />
              }
            </button>
            <Waveform progress={progress} active />
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="font-geist font-medium text-[#d97706]">{fmtTime(progress, item.duration)}</span>
            <div className="flex items-center gap-4">
              {downloaded ? (
                <div className="flex items-center gap-1 text-[#22c55e]">
                  <CheckCircle2 size={14} />
                  <span className="font-geist font-medium text-[12px]">Downloaded</span>
                </div>
              ) : (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 text-[#63738c] hover:text-[#334155] transition-colors"
                >
                  <Download size={14} />
                  <span className="font-geist font-medium text-[12px]">Download</span>
                </button>
              )}
              <div className="flex flex-col gap-[2px] items-end">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-[#63738c] hover:text-[#334155] transition-colors"
                >
                  <Share2 size={14} />
                  <span className="font-geist font-medium text-[12px]">Share</span>
                </button>
                {shareMsg && (
                  <span className="font-geist font-medium text-[#22c55e] text-[10px]">{shareMsg}</span>
                )}
              </div>
            </div>
            <span className="font-geist font-normal text-[#64748b]">{item.duration}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#e2e8f0] mt-4">
        {(["Info", "Transcript"] as TabKey[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-[14px] transition-colors ${
              tab === t
                ? "font-geist font-semibold text-[#0f172a] border-b-2 border-[#0f172a]"
                : "font-geist font-medium text-[#64748b]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-4 min-h-0">
        {tab === "Info" ? (
          <div className="flex flex-col gap-4">
            <p className="font-geist font-normal text-[#475569] text-[14px] leading-[1.6]">{item.description}</p>
            {item.topics && (
              <div className="flex flex-col gap-3">
                <p className="font-geist font-semibold text-[#0f172a] text-[13px] uppercase">Topics Covered</p>
                {item.topics.map((topic, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-[#fef3c7] flex items-center justify-center rounded-[10px] size-[20px] shrink-0 mt-[2px]">
                      <CheckCircle2 size={10} className="text-[#d97706]" />
                    </div>
                    <p className="font-geist font-normal text-[#475569] text-[14px] leading-[1.5]">{topic}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {item.transcript?.map((line, i) => (
              <p key={i} className="font-geist font-normal text-[#475569] text-[13px] leading-[1.6]">{line}</p>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#f8fafc] flex items-center gap-3 px-4 pt-4 pb-[5px] rounded-[8px] mt-4 shrink-0">
        <Mic size={20} className="text-[#0f172a] shrink-0" />
        <p className="font-geist font-semibold text-[#0f172a] text-[14px]">
          Give it a listen — 12 minutes that could help you or someone you know.
        </p>
      </div>
    </div>
  );
}
