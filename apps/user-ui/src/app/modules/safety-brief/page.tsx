"use client";
import { useState } from "react";
import { SubjectCard } from "./subject-card";
import { subjects, filters, type FilterKey } from "./data";

interface SafetyBriefProps {
  onSubjectOpen?: (subjectId: string) => void;
}

export function SafetyBrief({ onSubjectOpen }: SafetyBriefProps = {}) {
  const [active, setActive] = useState<FilterKey>("current");

  const displayed =
    active === "shuffle"
      ? [...subjects].sort(() => Math.random() - 0.5)
      : subjects.filter((s) => s.filter.includes(active));

  return (
    <section
      className="px-5 md:px-20 pb-20 pt-8"
      style={{ background: "linear-gradient(153deg,#fff 25%,#faf9f6 75%)" }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="font-geist font-bold text-[#334155] text-[12px] uppercase tracking-wide">Platform Library</p>
          <h1 className="font-outfit font-bold text-[#0f172a] text-[36px] md:text-[40px] leading-[1.15]">Safety Brief</h1>
          <p className="font-geist font-normal text-[#475569] text-[16px] leading-[1.5]">
            Discover safety subjects worth knowing about. Stay informed. Stay Aware.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`text-[14px] px-5 py-[10px] rounded-[30px] transition-colors ${
                active === f.key
                  ? "bg-[#0f172a] text-white font-geist font-semibold"
                  : "bg-white border border-[#e2e8f0] text-[#334155] font-geist font-medium hover:bg-[#f8fafc]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 flex gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2">
        {displayed.map((s) => {
          const active = s.id === "domestic-violence";
          return (
            <SubjectCard
              key={s.id}
              subject={s}
              isActive={active}
              onClick={active && onSubjectOpen ? () => onSubjectOpen(s.id) : undefined}
            />
          );
        })}
      </div>
    </section>
  );
}
