"use client";
import {
  AlertCircle, Video, Mic, Camera, FileText, Smartphone,
  File, Music, Monitor, Link, MapPin, Folder,
} from "lucide-react";
import { Header } from "../../shared/header";
import { useRouter } from "next/navigation";


const MUTED_METHODS = [
  { icon: Video,       label: "Video" },
  { icon: Mic,         label: "Voice Recording" },
  { icon: Camera,      label: "Photo" },
  { icon: FileText,    label: "Written Account" },
  { icon: Smartphone,  label: "Screenshot" },
  { icon: File,        label: "Document" },
  { icon: Music,       label: "Audio File" },
  { icon: Monitor,     label: "Screen Recording" },
  { icon: Link,        label: "Link" },
];


export default function ReportPage() {
    const router = useRouter();

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(144deg,#fff 25%,#faf9f6 46%,#f8fafc 66%,#faf9f6 75%)" }}
    >
      <Header />

      {/* Report sub-header */}
      <div className="fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-[#e2e8f0] h-[52px] flex items-center justify-between px-5 md:px-20">
        <span className="font-geist font-semibold text-[#334157] text-[15px]">Report</span>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-[#475569]" />
          <span className="font-geist font-medium text-[#334155] text-[13px]">Location:</span>
          <span className="font-geist font-semibold text-[#0f172a] text-[13px]">around Westlands, Nairobi</span>
        </div>
      </div>

      {/* Content */}
      <main className="pt-[124px] flex flex-col items-center pb-24 px-5 md:px-20">
        <div className="flex flex-col items-center gap-10 w-full max-w-[760px]">
          {/* Heading */}
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="font-outfit font-bold text-[#0f172a] text-[44px] leading-[1.1]">Report</h1>
            <p className="font-geist font-normal text-[#334155] text-[16px] leading-[1.5]">
              Choose how you'd like to report. Tap alarm for immediate help.
            </p>
          </div>

          {/* Grid */}
          <div className="flex flex-col items-center gap-8 w-full">
            {/* Row 1: Alarm + 4 muted */}
            <div className="flex flex-wrap justify-center gap-6">
              {/* Alarm — active and clickable */}
              <button
               onClick={() => router.push("/report/choose-help")}
                className="flex flex-col items-center gap-3 w-[132px] group"
                aria-label="1-click Alarm"
              >
                <div className="relative flex items-center justify-center size-[96px]">
                  {/* Glow rings */}
                  <div className="absolute inset-0 rounded-full opacity-30 bg-[#d97706] scale-110 group-hover:scale-125 transition-transform" />
                  <div className="absolute inset-[4px] rounded-full border-[1.5px] border-[#d97706] opacity-40" />
                  {/* Core */}
                  <div className="relative bg-[#d97706] group-hover:bg-[#b45309] flex items-center justify-center rounded-[40px] size-[80px] shadow-[0px_12px_12px_rgba(217,119,6,0.25)] transition-colors">
                    <AlertCircle size={32} className="text-white" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="font-geist font-semibold text-[#0f172a] text-[14px]">1-click Alarm</span>
                  <span className="font-geist font-medium text-[#64748b] text-[12px]">I need help now</span>
                </div>
              </button>

              {/* Row 1 muted items */}
              {MUTED_METHODS.slice(0, 4).map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3 w-[132px] cursor-default opacity-60">
                  <div className="bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center rounded-[44px] size-[88px]">
                    <Icon size={28} className="text-[#64748b]" strokeWidth={1.5} />
                  </div>
                  <span className="font-geist font-medium text-[#334155] text-[14px] text-center">{label}</span>
                </div>
              ))}
            </div>

            {/* Row 2: 5 muted */}
            <div className="flex flex-wrap justify-center gap-6">
              {MUTED_METHODS.slice(4).map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3 w-[132px] cursor-default opacity-60">
                  <div className="bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center rounded-[44px] size-[88px]">
                    <Icon size={28} className="text-[#64748b]" strokeWidth={1.5} />
                  </div>
                  <span className="font-geist font-medium text-[#334155] text-[14px] text-center">{label}</span>
                </div>
              ))}
              {/* Faded placeholder */}
              <div className="flex flex-col items-center gap-3 w-[132px] cursor-default opacity-20">
                <div className="bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center rounded-[44px] size-[88px]">
                  <Folder size={28} className="text-[#64748b]" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Urgency note */}
          <div className="flex flex-col items-center gap-2 text-center mt-4">
            <p className="font-geist font-semibold text-[#0f172a] text-[16px]">Need help now?</p>
            <p className="font-geist font-normal text-[#334155] text-[14px] max-w-[400px] leading-[1.5]">
              Send an alarm and we'll connect you with the help you've chosen.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
