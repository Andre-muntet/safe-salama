"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Globe, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const LANGUAGES = [
  "English",
  "Swahili",
  "French",
  "Arabic",
  "Somali",
  "Amharic",
  "Portuguese",
  "Zulu",
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const isAwareness = pathname === "/awareness";
  const isContribute = pathname === "/contribute";
  const isMyContributions = pathname === "/my-contributions";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langRef.current &&
        !langRef.current.contains(event.target as Node)
      ) {
        setLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e2e8f0] h-[72px] flex items-center justify-between px-5 md:px-20">
      <div className="flex items-center gap-8">
        {/* Brand */}
        <button
          type="button"
          onClick={() => router.push("/awareness")}
          className="cursor-pointer flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
          aria-label="Safe Salama home"
        >
          <div className="bg-[#0f172a] flex items-center justify-center rounded-[6px] size-6">
            <ShieldCheck
              className="text-white"
              size={14}
              strokeWidth={2.5}
            />
          </div>

          <div className="flex flex-col gap-[1px]">
            <span className="font-outfit font-bold text-[#0f172a] text-[20px] leading-none">
              Safe Salama
            </span>

            <span className="font-geist font-normal text-[#64748b] text-[10px] leading-none tracking-wide">
              Know. Share. Act.
            </span>
          </div>
        </button>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            type="button"
            onClick={() => router.push("/awareness")}
            className={`cursor-pointer font-geist font-medium text-[14px] px-4 py-2 rounded-[8px] transition-colors ${
              isAwareness
                ? "bg-[#f1f5f9] font-semibold text-[#0f172a]"
                : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]"
            }`}
          >
            Awareness
          </button>

          <button
            type="button"
            onClick={() => router.push("/contribute")}
            className={`cursor-pointer font-geist font-medium text-[14px] px-4 py-2 rounded-[8px] transition-colors ${
              isContribute
                ? "bg-[#f1f5f9] font-semibold text-[#0f172a]"
                : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]"
            }`}
          >
            Contribute
          </button>

          <button
            type="button"
            onClick={() => router.push("/my-contributions")}
            className={`cursor-pointer font-geist font-medium text-[14px] px-4 py-2 rounded-[8px] transition-colors ${
              isMyContributions
                ? "bg-[#f1f5f9] font-semibold text-[#0f172a]"
                : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]"
            }`}
          >
            My Contributions
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Languages */}
        <div ref={langRef} className="relative hidden sm:block">
          <button
            type="button"
            onClick={() => setLangOpen((open) => !open)}
            aria-expanded={langOpen}
            aria-haspopup="true"
            className="cursor-pointer flex items-center gap-2"
          >
            <Globe size={16} className="text-[#475469]" />

            <span className="font-geist font-medium text-[#475469] text-[13px]">
              English
            </span>

            <ChevronDown
              size={13}
              className="text-[#63738c] transition-transform"
              style={{
                transform: langOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            />
          </button>

          {langOpen && (
            <div className="absolute top-[calc(100%+10px)] right-0 bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0px_8px_24px_rgba(15,23,42,0.08)] w-[220px] py-2 z-50">
              <p className="font-geist font-semibold text-[#94a3b8] text-[10px] uppercase px-4 pt-1 pb-2 tracking-wider">
                Languages
              </p>

              {LANGUAGES.map((language) => (
                <label
                  key={language}
                  className="flex items-center gap-3 px-4 py-[9px] cursor-default"
                >
                  <input
                    type="checkbox"
                    disabled
                    className="size-[15px] accent-[#94a3b8] opacity-50 cursor-default"
                  />

                  <span className="font-geist font-normal text-[#94a3b8] text-[14px]">
                    {language}
                  </span>
                </label>
              ))}

              <div className="mx-4 mt-2 pt-2 border-t border-[#f1f5f9]">
                <p className="font-geist font-normal text-[#b8c2cc] text-[11px] leading-[1.5]">
                  Multilingual support coming soon
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Report Harm */}
        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={() => router.push("/report")}
            className="cursor-pointer bg-[#d97706] text-white font-geist font-semibold text-[14px] px-5 py-[10px] rounded-[8px] shadow-[0px_4px_4px_rgba(217,119,6,0.12)] hover:bg-[#b45309] transition-colors whitespace-nowrap"
          >
            Report Harm
          </button>

          <span className="font-geist font-medium text-[#64748b] text-[11px]">
            Something happened?
          </span>
        </div>
      </div>
    </header>
  );
}