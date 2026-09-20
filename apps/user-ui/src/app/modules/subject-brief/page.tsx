"use client";
import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { Header } from "../../shared/header";
import { SummaryStep } from "./summary";
import { ListenStep } from "./listenstep";
import type { SubjectBriefData } from "./types";

interface SubjectBriefProps {
  data: SubjectBriefData;
  onClose: () => void;
}

type ActiveStep = "summary" | "listen";

export function SubjectBrief({ data, onClose }: SubjectBriefProps) {
  const [activeStep, setActiveStep] = useState<ActiveStep>("summary");

  const stepKeys: ActiveStep[] = ["summary", "listen"];
  const activeIndex = stepKeys.indexOf(activeStep);

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(144deg,#fff 25%,#faf9f6 46%,#f8fafc 66%,#faf9f6 75%)" }}
    >
      <Header />

      {/* ── Briefing context bar ── */}
      <div className="fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-[#e2e8f0] h-[80px] flex items-center justify-between px-5 md:px-20">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[#475569] hover:text-[#0f172a] transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="font-geist font-semibold text-[14px]">Safety Brief</span>
        </button>

        <span className="font-geist font-bold text-[#0f172a] text-[18px]">{data.title}</span>

        <button
          onClick={onClose}
          className="bg-[#faf9f5] flex items-center justify-center p-2 rounded-[20px] hover:bg-[#f1f5f9] transition-colors"
        >
          <X size={16} className="text-[#475569]" />
        </button>
      </div>

      {/* ── Step indicator bar ── */}
      <div className="fixed top-[152px] left-0 right-0 z-40 bg-white border-b border-[#e2e8f0] h-[76px] flex items-center justify-center px-5 md:px-20">
        <div className="flex items-center gap-0 max-w-[1120px] w-full justify-between">
          {data.allSteps.map((step, i) => {
            const key = stepKeys[i] as ActiveStep | undefined;
            const isActive    = key === activeStep;
            const isClickable = key !== undefined;
            const isCompleted = key !== undefined && stepKeys.indexOf(key) < activeIndex;

            return (
              <div key={step.number} className="flex items-center gap-0">
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => isClickable ? setActiveStep(key) : undefined}
                    disabled={!isClickable}
                    className={`flex items-center gap-2 ${isClickable ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div className={`size-[10px] rounded-full transition-colors ${
                      isActive || isCompleted ? "bg-[#d97706]" : "bg-[#e2e8f0]"
                    }`} />
                    <span className={`text-[14px] whitespace-nowrap transition-colors ${
                      isActive
                        ? "font-geist font-bold text-[#d97706]"
                        : isClickable
                        ? "font-geist font-medium text-[#475569]"
                        : "font-geist font-medium text-[#cbd5e1]"
                    }`}>
                      {String(step.number).padStart(2, "0")} {step.label}
                    </span>
                  </button>
                  {isActive && <div className="bg-[#d97706] h-[2px] w-full rounded-full" />}
                </div>

                {i < data.allSteps.length - 1 && (
                  <div className="w-[60px] h-px bg-[#e2e8f0] mx-2 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Content ── */}
      <main className="pt-[228px] flex-1">
        {activeStep === "summary" && (
          <SummaryStep
            data={data.summary}
            onNext={() => setActiveStep("listen")}
          />
        )}
        {activeStep === "listen" && (
          <ListenStep
            data={data.listen}
            onNext={onClose}
          />
        )}
      </main>
    </div>
  );
}
