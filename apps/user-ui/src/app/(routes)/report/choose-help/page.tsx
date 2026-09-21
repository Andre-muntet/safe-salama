"use client";
import { useState } from "react";
import { ArrowLeft, MapPin, Ambulance, Users, Heart, Check } from "lucide-react";

import { useRouter } from "next/navigation";
import { Header } from "@/app/shared/header";


type ResponderId = "emergency" | "community" | "trusted";

interface Responder {
  id: ResponderId;
  label: string;
  Icon: React.ElementType;
}

const RESPONDERS: Responder[] = [
  { id: "emergency",  label: "Emergency Services",    Icon: Ambulance },
  { id: "community",  label: "Community Responders",  Icon: Users },
  { id: "trusted",    label: "Trusted Contacts",      Icon: Heart },
];

function ResponderCard({
  responder,
  selected,
  onToggle,
}: {
  responder: Responder;
  selected: boolean;
  onToggle: () => void;
}) {
  const { Icon, label } = responder;
  return (
    <button
      onClick={onToggle}
      className={`relative flex flex-col gap-3 items-center p-4 rounded-[20px] size-[140px] sm:size-[152px] transition-all ${
        selected
          ? "bg-[#fff7ed] border-[1.5px] border-[#d97706] shadow-[0px_4px_5px_rgba(15,23,42,0.03)]"
          : "bg-white border border-[#e2e8f0] hover:border-[#d97706]/40 hover:bg-[#fefcf8]"
      }`}
      aria-pressed={selected}
    >
      <div
        className={`flex items-center justify-center size-[40px] rounded-[20px] transition-colors ${
          selected ? "bg-[#fef3c7]" : "bg-[#f8fafc]"
        }`}
      >
        <Icon size={20} className={selected ? "text-[#d97706]" : "text-[#64748b]"} strokeWidth={1.8} />
      </div>
      <span
        className={`font-geist text-[13px] text-center leading-[1.3] ${
          selected ? "font-semibold text-[#0f172a]" : "font-medium text-[#334155]"
        }`}
      >
        {label}
      </span>
      {selected && (
        <div className="absolute top-[7px] right-[7px] bg-[#d97706] flex items-center justify-center rounded-[10px] size-[20px]">
          <Check size={11} className="text-white" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

export default function ChooseHelpPage() {
    const router = useRouter();
  const [selected, setSelected] = useState<Set<ResponderId>>(
    new Set(["emergency", "community", "trusted"])
  );

  const allSelected = selected.size === RESPONDERS.length;
  const count = selected.size;

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(RESPONDERS.map((r) => r.id)));
    }
  }

  function toggleResponder(id: ResponderId) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

function handleSend() {
  const ids = RESPONDERS
    .filter((r) => selected.has(r.id))
    .map((r) => r.id);

  router.push(`/report/responder-chats?responders=${ids.join(",")}`);
}
  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(144deg,#fff 25%,#faf9f6 46%,#f8fafc 66%,#faf9f6 75%)" }}
    >
      <Header />

      {/* Report sub-header */}
      <div className="fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-[#e2e8f0] h-[52px] flex items-center justify-between px-5 md:px-20">
        <button
          onClick={() => router.push("/report")}
          className="flex items-center gap-2 text-[#334157] hover:text-[#0f172a] transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="font-geist font-semibold text-[15px]">Report</span>
        </button>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-[#475569]" />
          <span className="font-geist font-medium text-[#334155] text-[13px]">Location:</span>
          <span className="font-geist font-semibold text-[#0f172a] text-[13px]">around Westlands, Nairobi</span>
        </div>
      </div>

      <main className="pt-[124px] pb-24 px-5 md:px-20 flex flex-col items-center">
        <div className="w-full max-w-[680px] flex flex-col gap-10">
          {/* Back */}
          <button
            onClick={() => router.push("/report")}
            className="flex items-center gap-2 text-[#334155] hover:text-[#0f172a] transition-colors self-start"
          >
            <ArrowLeft size={16} />
            <span className="font-geist font-semibold text-[14px]">Back</span>
          </button>

          {/* Heading */}
          <div className="flex flex-col gap-3">
            <h1 className="font-outfit font-bold text-[#0f172a] text-[36px] leading-[1.15]">
              Who should we connect you with?
            </h1>
            <p className="font-geist font-normal text-[#334155] text-[16px] leading-[1.5]">
              Choose who should receive your alarm. All available help is selected by default.
            </p>
          </div>

      
        
           {/* Listening element — coming soon */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative flex items-center justify-center size-[120px]">
              {/* Animated concentric rings */}
              <div
                className="listening-ring absolute inset-0 rounded-full border-[2px] border-[#d97706]/35"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="listening-ring absolute inset-[10px] rounded-full border-[2px] border-[#d97706]/45"
                style={{ animationDelay: "0.4s" }}
              />
              <div
                className="listening-ring absolute inset-[22px] rounded-full border-[2px] border-[#d97706]/55"
                style={{ animationDelay: "0.8s" }}
              />
              <div className="absolute inset-[36px] rounded-full border-[2px] border-[#d97706]/60" />
              <div className="absolute inset-[48px] rounded-full bg-[#d97706]/10 border-[2px] border-[#d97706]" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-geist font-semibold text-[#d97706] text-[13px]">Listening coming soon</span>
              <span className="font-geist font-normal text-[#94a3b8] text-[12px] text-center max-w-[280px] leading-[1.4]">
                Voice selection will eventually operate these same controls
              </span>
            </div>
          </div>
        
        
          {/* Select all control */}
          <button
            onClick={toggleAll}
            className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-[12px] border-[1.5px] transition-all ${
              allSelected
                ? "bg-[#fff7ed] border-[#d97706] text-[#d97706]"
                : "bg-white border-[#e2e8f0] text-[#64748b] hover:border-[#d97706]/40"
            }`}
          >
            {allSelected ? (
              <div className="bg-[#d97706] flex items-center justify-center rounded-full size-[18px]">
                <Check size={11} className="text-white" strokeWidth={3} />
              </div>
            ) : (
              <div className="border border-[#cbd5e1] rounded-full size-[18px]" />
            )}
            <span className="font-geist font-semibold text-[15px]">
              {allSelected ? "Deselect all" : "Select all"}
            </span>
          </button>

          {/* Responder cards */}
          <div className="flex flex-wrap justify-center gap-4">
            {RESPONDERS.map((r) => (
              <ResponderCard
                key={r.id}
                responder={r}
                selected={selected.has(r.id)}
                onToggle={() => toggleResponder(r.id)}
              />
            ))}
          </div>

          {/* Send button */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleSend}
              disabled={count === 0}
              className={`w-full py-[18px] rounded-[12px] font-outfit font-bold text-[18px] text-white transition-all shadow-[0px_8px_8px_rgba(217,119,6,0.24)] ${
                count > 0
                  ? "bg-[#d97706] hover:bg-[#b45309] active:scale-[0.99]"
                  : "bg-[#e2e8f0] cursor-not-allowed shadow-none"
              }`}
            >
              {count > 0
                ? `Send alarm to selected (${count})`
                : "Select at least one responder"}
            </button>
            <p className="font-geist font-normal text-[#64748b] text-[12px] text-center">
              Your data is secure. System transmission logs are protected by active platform protocols.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
