import { FileStack, KeyRound } from "lucide-react";
import { Header } from "../../shared/header";

export default function MyContributionsPage() {
  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(126deg,#fff 25%,#faf9f6 46%,#f8fafc 66%,#faf9f6 75%)" }}
    >
      <Header />
      <main className="flex-1 pt-[72px] flex flex-col items-center justify-center px-5 py-24">
        <div className="flex flex-col items-center gap-8 max-w-[480px] w-full text-center">
          <div className="bg-[#f1f5f9] flex items-center justify-center size-[72px] rounded-[20px]">
            <FileStack size={36} className="text-[#64748b]" strokeWidth={1.5} />
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-outfit font-bold text-[#0f172a] text-[36px] leading-[1.15]">My Contributions</div>
            <p className="font-geist font-normal text-[#475569] text-[16px] leading-[1.6]">
              Access your contributions using your secret PIN.
            </p>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-8 w-full flex flex-col items-center gap-5 shadow-[0px_2px_4px_rgba(15,23,42,0.03)]">
            <div className="bg-[#f1f5f9] flex items-center justify-center size-[44px] rounded-full">
              <KeyRound size={22} className="text-[#94a3b8]" />
            </div>
            <div className="flex flex-col gap-1 text-center">
              <p className="font-geist font-semibold text-[#0f172a] text-[15px]">Access required</p>
              <p className="font-geist font-normal text-[#64748b] text-[13px] leading-[1.5]">
                Enter your secret PIN to access and manage your contributions.
              </p>
            </div>
            <div className="flex items-center gap-2 border border-dashed border-[#cbd5e1] rounded-[8px] px-5 py-[10px] cursor-default opacity-60 w-full justify-center select-none bg-[#f8fafc]">
              <KeyRound size={15} className="text-[#94a3b8] shrink-0" />
              <span className="font-geist font-medium text-[#94a3b8] text-[14px]">Secret PIN</span>
              <span className="font-geist font-normal text-[#b8c2cc] text-[12px]">— Coming soon</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
