"use client";
import { useState } from "react";
import { MapPin, Search, HelpCircle, ShieldCheck } from "lucide-react";
import { MapVisualization } from "./map";
import { locations, type Location } from "./data";

export function KnowBeforeYouGo() {
  const [query, setQuery]       = useState("");
  const [selected, setSelected] = useState<Location>(locations[0]);
  const [showSuggest, setShow]  = useState(false);

  const matches = query
    ? locations.filter((l) => l.name.toLowerCase().includes(query.toLowerCase()))
    : locations;

  function pick(loc: Location) {
    setSelected(loc);
    setQuery("");
    setShow(false);
  }

  return (
    <section style={{ background: "linear-gradient(147deg,#f8fafc 25%,#faf9f6 75%)" }}>
      <div className="relative">
        <img alt="" className="block w-full" src="/91d0e.svg" style={{ marginTop: -1 }} />
      </div>

      <div className="flex flex-col items-center gap-14 px-5 md:px-20 py-[104px]">
        {/* Heading */}
        <div className="flex flex-col items-center gap-4 text-center max-w-[800px]">
          <div className="flex items-center gap-[6px] bg-white border border-[#eae9e3] px-3 py-[6px] rounded-full">
            <ShieldCheck size={14} className="text-[#475569]" />
            <span className="font-geist font-bold text-[#475569] text-[12px] uppercase">PRE-TRIP PLANNING</span>
          </div>
          <div className="font-outfit font-bold text-[#0f172a] text-[36px] md:text-[40px] leading-[1.15]">Know Before You Go</div>
          <p className="font-geist font-normal text-[#475569] text-[16px] leading-[1.5]">
            Understand the safety landscape of any neighbourhood or destination before you arrive.
          </p>
        </div>

        {/* Interactive card */}
        <div className="bg-white border border-[#eae9e3] rounded-[16px] shadow-[0px_16px_16px_rgba(28,25,23,0.03)] p-8 flex flex-col gap-6 w-full max-w-[760px]">
          {/* Search */}
          <div className="relative">
            <div className="bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] flex items-center gap-3 h-[56px] px-[18px]">
              <MapPin size={20} className="text-[#64748b] shrink-0" />
              <input
                className="flex-1 font-geist font-normal text-[#0f172a] text-[15px] bg-transparent outline-none placeholder:text-[#64748b]"
                placeholder="Search a neighbourhood, school, or workplace..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShow(true); }}
                onFocus={() => setShow(true)}
                onBlur={() => setTimeout(() => setShow(false), 150)}
              />
              <Search size={20} className="text-[#64748b] shrink-0" />
            </div>
            {showSuggest && matches.length > 0 && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-[#e2e8f0] rounded-[10px] shadow-lg z-10 overflow-hidden">
                {matches.map((loc) => (
                  <button
                    key={loc.id}
                    className="w-full text-left px-4 py-3 font-geist font-medium text-[14px] text-[#0f172a] hover:bg-[#f8fafc] transition-colors flex items-center gap-2"
                    onMouseDown={() => pick(loc)}
                  >
                    <MapPin size={14} className="text-[#64748b] shrink-0" />
                    {loc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Result */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-geist font-bold text-[#64748b] text-[11px] uppercase">Your previous location search</p>
              <p className="font-geist font-semibold text-[#0f172a] text-[16px]">{selected.name}</p>
            </div>

            <div className="bg-white border border-[#eae9e3] rounded-[16px] flex flex-col md:flex-row gap-5 p-5">
              <MapVisualization />
              <div className="flex flex-col gap-4 flex-1 min-w-0">
                <div className="flex items-center gap-[6px]">
                  <img alt="" className="h-[8px] w-[56px]" src="/764c4.svg" />
                  <span className="font-geist font-semibold text-[13px] tracking-[1.5px]" style={{ color: selected.levelColor }}>
                    {selected.level}
                  </span>
                </div>
                <p className="font-geist font-normal text-[#64748b] text-[13px]">{selected.updated}</p>
                <div>
                  {selected.points.map((pt, i) => (
                    <p key={i} className="font-geist font-normal text-[#334157] text-[14px] leading-[1.75]">• {pt}</p>
                  ))}
                </div>
                <span className="font-geist font-semibold text-[#b8c2cc] text-[14px] cursor-default self-start">
                  View full guidance →
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-[6px]">
            <HelpCircle size={13} className="text-[#64748b] shrink-0" />
            <p className="font-geist font-normal text-[#64748b] text-[12px]">Data aggregates threat reports from the past 30 days.</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <img alt="" className="block w-full" src="/91d0e.svg" style={{ marginBottom: -1 }} />
      </div>
    </section>
  );
}
