"use client";
import { useState, useRef } from "react";
import { Share2, Bookmark, Volume2, Clock, ArrowRight } from "lucide-react";
import type { SummaryStepData } from "./types";

interface SummaryStepProps {
  data: SummaryStepData;
  onNext: () => void;
}

export function SummaryStep({ data, onNext }: SummaryStepProps) {
  const [shareMsg, setShareMsg]   = useState("");
  const [saveMsg, setSaveMsg]     = useState("");
  const [reading, setReading]     = useState(false);
  const utteranceRef              = useRef<SpeechSynthesisUtterance | null>(null);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareMsg("Link copied.");
      setTimeout(() => setShareMsg(""), 2500);
    });
  }

  function handleSave() {
    const a = document.createElement("a");
    a.href = "/dv-summary.pdf";
    a.download = "domestic-violence-summary.pdf";
    a.click();
    setSaveMsg("Saved to your device.");
    setTimeout(() => setSaveMsg(""), 3000);
  }

  function handleReadAloud() {
    if (reading) {
      window.speechSynthesis.cancel();
      setReading(false);
      return;
    }
    const text = data.paragraphs.join(" ");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend  = () => setReading(false);
    utterance.onerror = () => setReading(false);
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setReading(true);
  }

  return (
    <div className="flex flex-col items-center px-5 md:px-20 pb-24 pt-18">
      <div className="flex flex-col gap-10 w-full max-w-[680px]">
        {/* Section badge + actions */}
        <div className="flex flex-col gap-4">
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

          {/* Inline actions */}
          <div className="flex items-center gap-5">
            <div className="flex flex-col gap-[2px]">
              <button
                onClick={handleShare}
                className="flex items-center gap-[6px] text-[#64748b] hover:text-[#334155] transition-colors"
              >
                <Share2 size={14} />
                <span className="font-geist font-medium text-[12px]">Share</span>
              </button>
              {shareMsg && (
                <span className="font-geist font-medium text-[#22c55e] text-[11px]">{shareMsg}</span>
              )}
            </div>

            <div className="flex flex-col gap-[2px]">
              <button
                onClick={handleSave}
                className="flex items-center gap-[6px] text-[#64748b] hover:text-[#334155] transition-colors"
              >
                <Bookmark size={14} />
                <span className="font-geist font-medium text-[12px]">Save locally</span>
              </button>
              {saveMsg && (
                <span className="font-geist font-medium text-[#22c55e] text-[11px]">{saveMsg}</span>
              )}
            </div>

            <button
              onClick={handleReadAloud}
              className={`flex items-center gap-[6px] transition-colors ${reading ? "text-[#d97706]" : "text-[#64748b] hover:text-[#334155]"}`}
            >
              <Volume2 size={14} />
              <span className="font-geist font-medium text-[12px]">
                {reading ? "Stop reading" : "Read aloud"}
              </span>
            </button>
          </div>

          <h1 className="font-outfit font-bold text-[#0f172a] text-[44px] leading-[1.15]">
            {data.title}
          </h1>
        </div>

        {/* Body text */}
        <div className="flex flex-col gap-6">
          {data.paragraphs.map((para, i) => (
            <p
              key={i}
              className="font-geist font-normal text-[#334155] text-[18px] leading-[1.65] whitespace-pre-line"
            >
              {para}
            </p>
          ))}
          <p className="font-geist font-normal text-[#63738c] text-[13px] leading-[1.65]">
            {data.attribution}
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e2e8f0] pt-8 flex items-center justify-between">
          <div className="flex items-center gap-[6px] text-[#475569]">
            <Clock size={14} />
            <span className="font-geist font-normal text-[13px]">
              Est. Reading Time: {data.readingTime}
            </span>
          </div>
          <button
            onClick={onNext}
            className="bg-[#fef3c7] flex items-center gap-2 px-4 py-2 rounded-[6px] hover:bg-[#fde68a] transition-colors"
          >
            <span className="font-geist font-bold text-[#d97706] text-[14px]">{data.nextLabel}</span>
            <ArrowRight size={14} className="text-[#d97706]" />
          </button>
        </div>
      </div>
    </div>
  );
}
