"use client";

import "./global.css";
import { Geist, Outfit } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { Footer } from "./shared/footer";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const hideFooter =
    pathname === "/report" ||
    pathname === "/report/choose-help" ||
    pathname === "/report/responder-chats";

  function handleAlarm() {
   router.push(
  "/report/responder-chats?responders=emergency,community,trusted"
);
  }

  return (
    <html lang="en">
      <body className={`${geist.variable} ${outfit.variable}`}>
        <main>{children}</main>

        {!hideFooter && <Footer />}

        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-[6px]">
          <button
            type="button"
            onClick={handleAlarm}
            aria-label="1-click Alarm — send emergency alert immediately"
            className="cursor-pointer bg-[#dc2626] hover:bg-[#b91c1c] active:scale-95 transition-all flex items-center justify-center rounded-full shadow-[0px_4px_20px_rgba(220,38,38,0.4)] size-[64px]"
          >
            <Bell
              size={26}
              className="text-white"
              strokeWidth={2.2}
            />
          </button>

          <span className="font-geist font-semibold text-[#dc2626] text-[10px] uppercase tracking-wide whitespace-nowrap drop-shadow-sm">
            1-click Alarm
          </span>
        </div>
      </body>
    </html>
  );
}