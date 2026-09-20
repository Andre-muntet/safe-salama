import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#e2e8f0] bg-white">
      <div className="px-5 md:px-20 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand + tagline */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-[#0f172a] flex items-center justify-center rounded-[6px] size-6">
              <ShieldCheck className="text-white" size={14} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col gap-[2px]">
              <span className="font-outfit font-bold text-[#0f172a] text-[18px] leading-none">Safe Salama</span>
              <span className="font-geist font-normal text-[#94a3b8] text-[10px] leading-none tracking-wide">Know. Share. Act.</span>
            </div>
          </div>
          <p className="font-geist font-normal text-[#64748b] text-[13px] leading-[1.5] max-w-[300px]">
            Helping communities access, share, and act on safety information.
          </p>
        </div>

        {/* Links + copyright */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-5">
            <span className="font-geist font-normal text-[#64748b] text-[13px] cursor-default">Privacy Policy</span>
            <span className="text-[#e2e8f0]">·</span>
            <span className="font-geist font-normal text-[#64748b] text-[13px] cursor-default">Terms of Use</span>
            <span className="text-[#e2e8f0]">·</span>
            <span className="font-geist font-normal text-[#64748b] text-[13px] cursor-default">Anonymity</span>
          </div>
          <p className="font-geist font-normal text-[#94a3b8] text-[12px]">© 2026 Safe Salama</p>
        </div>
      </div>
    </footer>
  );
}
