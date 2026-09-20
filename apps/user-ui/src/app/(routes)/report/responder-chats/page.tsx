"use client";
import { useState } from "react";
import { Shield, User, Heart, MapPin, AlertCircle, ChevronDown, KeyRound, Send, Paperclip, Mic } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/app/shared/header";

// --- Data ---

const LOCATION = "around Westlands, Nairobi";

interface Message {
  id: string;
  from: "responder" | "reporter";
  type: "text" | "structured" | "system";
  content?: string;
  card?: {
    title: string;
    subtitle?: string;
    body?: string;
    fields?: { label: string; value: string }[];
    guidance?: string[];
  };
  time?: string;
}
type ResponderId = "emergency" | "community" | "trusted";
const CONVERSATIONS: Record<ResponderId, {
  label: string;
  subtitle: string;
  Icon: React.ElementType;
  avatarBg: string;
  avatarBorder: string;
  iconColor: string;
  verified: boolean;
  listStatus: { type: "new" | "whatsapp-delivered" | "whatsapp-typing" };
  chatStatus: string;
  refLine: string;
  integration?: string;
  messages: Message[];
}> = {
  emergency: {
    label: "Emergency Services",
    subtitle: "Responding to your report",
    Icon: Shield,
    avatarBg: "#fff7ed",
    avatarBorder: "#fed7aa",
    iconColor: "#d97706",
    verified: true,
    listStatus: { type: "new" },
    chatStatus: "Active",
    refLine: `Re: 1-Click Alarm – ${LOCATION}`,
    messages: [
      { id: "s1", from: "responder", type: "system", content: `Emergency Services connected · 2:34 PM` },
      {
        id: "m1", from: "reporter", type: "structured", time: "2:34 PM",
        card: {
          title: "Emergency alarm",
          fields: [
            { label: "Location", value: LOCATION },
            { label: "Urgency", value: "Immediate" },
          ],
          body: "A person has requested immediate assistance.",
        },
      },
      {
        id: "m2", from: "responder", type: "text", time: "2:34 PM",
        content: `Emergency services are responding.\nHelp is being dispatched to your location.`,
      },
    ],
  },
  community: {
    label: "Community Responder",
    subtitle: "Responding to your report",
    Icon: User,
    avatarBg: "#f1f5f9",
    avatarBorder: "#e2e8f0",
    iconColor: "#64748b",
    verified: true,
    listStatus: { type: "whatsapp-delivered" },
    chatStatus: "Active",
    refLine: `Re: Safety concern – ${LOCATION}`,
    integration: "Connected via WhatsApp",
    messages: [
      {
        id: "m1", from: "reporter", type: "structured", time: "2:34 PM",
        card: {
          title: "Safety concern reported",
          subtitle: "Possible harassment / following",
          fields: [
            { label: "What's happening", value: "A person has reported being followed and is seeking help." },
            { label: "Location", value: LOCATION },
            { label: "Urgency", value: "High" },
          ],
          guidance: [
            "Stay with the person from a safe distance.",
            "Help them move toward a safe, populated place.",
            "Avoid confrontation.",
            "Contact emergency services if the threat becomes immediate.",
          ],
        },
      },
      {
        id: "m2", from: "responder", type: "text", time: "2:36 PM",
        content: `I'm 10 mins away. Let me find help as we approach you. #StaySafe`,
      },
    ],
  },
  trusted: {
    label: "Trusted Contact",
    subtitle: "Personal contact",
    Icon: Heart,
    avatarBg: "#f1f5f9",
    avatarBorder: "#e2e8f0",
    iconColor: "#64748b",
    verified: false,
    listStatus: { type: "whatsapp-typing" },
    chatStatus: "Active",
    refLine: `Re: Safety alert – ${LOCATION}`,
    integration: "Connected via WhatsApp",
    messages: [
      {
        id: "m1", from: "reporter", type: "structured", time: "2:34 PM",
        card: {
          title: "Andre may need your help.",
          subtitle: `A safety concern has been reported near ${LOCATION}.`,
          guidance: [
            "Stay in contact with Andre.",
            "Encourage them to move somewhere safe.",
            "Avoid confronting anyone involved.",
            "Contact emergency services if the situation becomes immediate.",
          ],
        },
      },
    ],
  },
};

// --- Sub-components ---

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-label="WhatsApp" role="img">
      <rect width="32" height="32" rx="8" fill="#25D366" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 6C10.477 6 6 10.477 6 16c0 1.887.52 3.653 1.426 5.16L6 26l5.02-1.378A9.953 9.953 0 0016 26c5.523 0 10-4.477 10-10S21.523 6 16 6zm-4.04 5.6c.2 0 .42.002.6.01.21.01.47.05.7.57.27.6.86 2.1.94 2.25.08.15.13.33.03.53-.1.2-.15.32-.3.5-.15.17-.32.38-.45.51-.15.15-.31.31-.13.61.18.3.8 1.32 1.72 2.14 1.18 1.05 2.18 1.37 2.48 1.52.3.15.48.13.66-.08.18-.2.77-.9.97-1.2.2-.3.4-.25.67-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.34.07.12.07.7-.16 1.37-.23.67-1.36 1.28-1.86 1.32-.5.04-.97.18-3.26-.68-2.73-1.03-4.45-3.8-4.58-3.97-.13-.17-1.07-1.42-1.07-2.71 0-1.3.68-1.93.92-2.2.24-.26.52-.33.7-.33z"
        fill="white"
      />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <span
      className="inline-flex items-center justify-center size-[14px] rounded-full bg-[#0f172a] absolute -bottom-[2px] -right-[2px]"
      title="Verified responder"
    >
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
        <path d="M1.5 4L3.2 5.8L6.5 2.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Avatar({ bg, border, color, Icon, verified, size = 44 }: {
  bg: string; border: string; color: string; Icon: React.ElementType; verified: boolean; size?: number;
}) {
  const iconSize = size === 36 ? 16 : 20;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="flex items-center justify-center rounded-full size-full border"
        style={{ background: bg, borderColor: border }}
      >
        <Icon size={iconSize} style={{ color }} strokeWidth={1.8} />
      </div>
      {verified && <VerifiedBadge />}
    </div>
  );
}

function SystemMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-center my-1">
      <div className="bg-white border border-[#e2e8f0] rounded-full px-3 py-[5px]">
        <span className="font-geist font-normal text-[#94a3b8] text-[12px]">{content}</span>
      </div>
    </div>
  );
}

function TextBubble({ msg, responderId }: { msg: Message; responderId: ResponderId }) {
  const conv = CONVERSATIONS[responderId];
  const isReporter = msg.from === "reporter";

  if (isReporter) {
    return (
      <div className="flex justify-end gap-3 items-end">
        <div className="flex flex-col gap-1 items-end max-w-[72%]">
          <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-tl-[18px] rounded-tr-[18px] rounded-bl-[18px] rounded-br-[4px] px-4 py-3">
            <p className="font-geist font-normal text-[#0f172a] text-[14px] leading-[1.5]">{msg.content}</p>
          </div>
          {msg.time && <span className="font-geist font-normal text-[#94a3b8] text-[12px]">{msg.time}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-end">
      <Avatar
        bg={conv.avatarBg}
        border={conv.avatarBorder}
        color={conv.iconColor}
        Icon={conv.Icon}
        verified={conv.verified}
        size={36}
      />
      <div className="flex flex-col gap-1 items-start max-w-[72%]">
        <div className="bg-white border border-[#e2e8f0] rounded-tl-[18px] rounded-tr-[18px] rounded-bl-[4px] rounded-br-[18px] px-4 py-3">
          <p className="font-geist font-normal text-[#334155] text-[14px] leading-[1.5] whitespace-pre-line">{msg.content}</p>
        </div>
        {msg.time && <span className="font-geist font-normal text-[#94a3b8] text-[12px]">{msg.time}</span>}
      </div>
    </div>
  );
}

function StructuredCard({ msg }: { msg: Message }) {
  const c = msg.card!;
  return (
    <div className="flex justify-end gap-3 items-end">
      <div className="flex flex-col gap-1 items-end max-w-[80%]">
        <div className="bg-white border border-[#e2e8f0] rounded-[16px] overflow-hidden shadow-[0px_2px_4px_rgba(15,23,42,0.04)]">
          {/* Card header */}
          <div className="bg-[#fff7ed] border-b border-[#fed7aa] px-4 py-3">
            <p className="font-outfit font-bold text-[#0f172a] text-[15px]">{c.title}</p>
            {c.subtitle && <p className="font-geist font-normal text-[#475569] text-[13px] mt-1 leading-[1.4]">{c.subtitle}</p>}
          </div>

          {/* Fields + body */}
          {(c.fields || c.body) && (
            <div className="px-4 py-3 flex flex-col gap-2">
              {c.fields && c.fields.map((f) => (
                <div key={f.label} className="flex gap-2 items-baseline">
                  <span className="font-geist font-semibold text-[#64748b] text-[11px] uppercase tracking-wide shrink-0">{f.label}:</span>
                  <span className="font-geist font-normal text-[#0f172a] text-[13px]">{f.value}</span>
                </div>
              ))}
              {c.body && (
                <p className="font-geist font-normal text-[#334155] text-[13px] leading-[1.5] mt-1">{c.body}</p>
              )}
            </div>
          )}

          {/* Guidance */}
          {c.guidance && (
            <div className="bg-[#f8fafc] border-t border-[#e2e8f0] px-4 py-3 flex flex-col gap-2">
              <p className="font-geist font-semibold text-[#334155] text-[12px]">Recommended response</p>
              <ul className="flex flex-col gap-1">
                {c.guidance.map((g, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-[#d97706] text-[10px] mt-[3px] shrink-0">•</span>
                    <span className="font-geist font-normal text-[#475569] text-[12px] leading-[1.5]">{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {msg.time && <span className="font-geist font-normal text-[#94a3b8] text-[12px]">{msg.time}</span>}
      </div>
    </div>
  );
}

function TypingIndicator({ responderId }: { responderId: ResponderId }) {
  const conv = CONVERSATIONS[responderId];
  return (
    <div className="flex gap-3 items-end">
      <Avatar bg={conv.avatarBg} border={conv.avatarBorder} color={conv.iconColor} Icon={conv.Icon} verified={conv.verified} size={36} />
      <div className="bg-white border border-[#e2e8f0] rounded-tl-[18px] rounded-tr-[18px] rounded-bl-[4px] rounded-br-[18px] px-4 py-3 flex gap-1 items-center">
        {[0, 150, 300].map((delay) => (
          <div
            key={delay}
            className="size-[6px] rounded-full bg-[#22c55e] animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function IntegrationBadge({ label }: { label: string }) {
  return (
    <div className="flex justify-center my-1">
      <div className="bg-white border border-[#e2e8f0] rounded-full px-3 py-[5px] flex items-center gap-2">
        <WhatsAppIcon size={14} />
        <span className="font-geist font-normal text-[#64748b] text-[12px]">{label}</span>
      </div>
    </div>
  );
}

function ConvListItem({
  id,
  active,
  onClick,
}: {
  id: ResponderId;
  active: boolean;
  onClick: () => void;
}) {
  const conv = CONVERSATIONS[id];
  const { listStatus } = conv;

  return (
    <button
      onClick={onClick}
      className={`w-full flex gap-3 items-center p-3 rounded-[14px] border transition-all cursor-pointer text-left ${
        active
          ? "bg-[#fff7ed] border-[#fed7aa] shadow-[0px_2px_4px_rgba(217,119,6,0.05)]"
          : "bg-white border-[#e2e8f0] hover:bg-[#fafafa]"
      }`}
    >
      <Avatar bg={conv.avatarBg} border={conv.avatarBorder} color={conv.iconColor} Icon={conv.Icon} verified={conv.verified} />
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="font-geist font-bold text-[#0f172a] text-[14px] truncate">{conv.label}</span>
          {listStatus.type === "new" && (
            <span className="font-geist font-semibold text-[#22c55e] text-[12px] flex items-center gap-1 shrink-0 ml-2">
              <span className="size-[7px] rounded-full bg-[#22c55e] shrink-0" />
              1 new
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {(listStatus.type === "whatsapp-delivered" || listStatus.type === "whatsapp-typing") && (
            <WhatsAppIcon size={13} />
          )}
          {listStatus.type === "whatsapp-delivered" && (
            <span className="font-geist font-normal text-[#64748b] text-[12px]">Delivered</span>
          )}
          {listStatus.type === "whatsapp-typing" && (
            <span className="font-geist font-semibold text-[#22c55e] text-[12px]">Typing…</span>
          )}
        </div>
      </div>
    </button>
  );
}

// --- Access Required state ---

function AccessRequired() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 py-24 px-5">
      <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[16px] p-10 flex flex-col items-center gap-5 max-w-[360px] w-full text-center">
        <div className="bg-[#f1f5f9] flex items-center justify-center size-[56px] rounded-full">
          <KeyRound size={24} className="text-[#64748b]" strokeWidth={1.8} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-outfit font-bold text-[#0f172a] text-[22px]">Access required</h2>
          <p className="font-geist font-normal text-[#475569] text-[14px] leading-[1.5]">
            Enter your secret PIN to access your responder conversations.
          </p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="bg-[#f8fafc] border border-dashed border-[#cbd5e1] rounded-[10px] px-4 py-3 flex items-center gap-2 cursor-default opacity-60 select-none">
            <KeyRound size={15} className="text-[#94a3b8] shrink-0" />
            <span className="font-geist font-medium text-[#94a3b8] text-[14px]">Secret PIN</span>
            <span className="font-geist font-normal text-[#b8c2cc] text-[12px]">— Coming soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main page ---

export default function ResponderChatsPage() {
const searchParams = useSearchParams();

const responderParam = searchParams.get("responders");

const responderIds: ResponderId[] = responderParam
  ? responderParam
      .split(",")
      .filter(
        (id): id is ResponderId =>
          id === "emergency" ||
          id === "community" ||
          id === "trusted"
      )
  : [];

const hasContext = responderIds.length > 0;


  const [activeId, setActiveId] = useState<ResponderId>(
    hasContext ? responderIds[0] : "emergency"
  );
  const [messageText, setMessageText] = useState("");
  const [extraMessages, setExtraMessages] = useState<Record<ResponderId, Message[]>>({
    emergency: [], community: [], trusted: [],
  });

  function sendMessage() {
    const text = messageText.trim();
    if (!text) return;
    const newMsg: Message = {
      id: `u-${Date.now()}`,
      from: "reporter",
      type: "text",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setExtraMessages((prev) => ({
      ...prev,
      [activeId]: [...prev[activeId], newMsg],
    }));
    setMessageText("");
  }

  const conv = CONVERSATIONS[activeId];
  const allMessages = [...conv.messages, ...extraMessages[activeId]];

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(144deg,#fff 25%,#faf9f6 46%,#f8fafc 66%,#faf9f6 75%)" }}
    >
      <Header />

      {/* Sub-header */}
      <div className="fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-[#e2e8f0] h-[52px] flex items-center justify-between px-5 md:px-20">
        <span className="font-geist font-semibold text-[#334157] text-[15px]">Responder Chats</span>
        {hasContext && (
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#475569]" />
            <span className="font-geist font-medium text-[#334155] text-[13px]">Location:</span>
            <span className="font-geist font-semibold text-[#0f172a] text-[13px]">{LOCATION}</span>
          </div>
        )}
      </div>

      <main className="pt-[124px] flex flex-col items-center">
        {/* Page title */}
        <div className="flex flex-col items-center gap-3 text-center px-5 pt-8 pb-6">
          <h1 className="font-outfit font-bold text-[#0f172a] text-[44px] leading-[1.1]">Responder Chats</h1>
          <p className="font-geist font-normal text-[#334155] text-[16px] leading-[1.5] max-w-[600px]">
            Conversations with verified responders about your active reports.
          </p>
        </div>

        {hasContext ? (
          <>
            {/* Report context card */}
            <div className="flex flex-col items-center px-5 pb-2 w-full">
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_8px_8px_rgba(15,23,42,0.05)] flex gap-5 items-center p-6 w-full max-w-[800px]">
                <div className="bg-[rgba(217,119,6,0.1)] border border-[#d97706] flex items-center justify-center rounded-[24px] size-[48px] shrink-0">
                  <AlertCircle size={20} className="text-[#d97706]" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                  <p className="font-outfit font-bold text-[#0f172a] text-[18px]">1-Click Alarm — Urgent Safety Report</p>
                  <p className="font-geist font-normal text-[#475569] text-[14px] leading-[1.4]">
                    Reported threat {LOCATION}. Emergency services and community responders notified.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="font-geist font-medium text-[#64748b] text-[13px]">Current report</span>
                    <span className="size-[4px] rounded-full bg-[#cbd5e1] shrink-0" />
                    <span className="font-geist font-normal text-[#94a3b8] text-[13px] cursor-default select-none">View original report →</span>
                  </div>
                </div>
                <div className="p-[6px] shrink-0">
                  <ChevronDown size={18} className="text-[#94a3b8]" />
                </div>
              </div>
            </div>
            <p className="font-geist font-normal text-[#94a3b8] text-[13px] pb-8 pt-2 text-center">
              Click to view and switch between your reports
            </p>

            {/* Chat layout */}
            <div className="w-full flex border-t border-[#e2e8f0]" style={{ minHeight: "560px" }}>
              {/* Left: conversation list */}
              <div className="bg-[#f8fafc] border-r border-[#e2e8f0] w-[300px] shrink-0 flex flex-col gap-4 p-5">
                <span className="font-geist font-semibold text-[#64748b] text-[13px]">Conversations</span>
                <div className="flex flex-col gap-3">
                  {responderIds.map((id) => (
                    <ConvListItem key={id} id={id} active={id === activeId} onClick={() => setActiveId(id)} />
                  ))}
                </div>
              </div>

              {/* Right: active conversation */}
              <div className="flex-1 min-w-0 flex flex-col bg-white">
                {/* Chat header */}
                <div className="px-6 py-4 border-b border-[#e2e8f0] flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-geist font-bold text-[#0f172a] text-[18px]">{conv.label}</span>
                      <div className="bg-[#ecfdf5] flex items-center gap-[6px] px-2 py-1 rounded-full">
                        <span className="size-[8px] rounded-full bg-[#22c55e] shrink-0" />
                        <span className="font-geist font-semibold text-[#047857] text-[12px]">Active</span>
                      </div>
                    </div>
                    <span className="font-geist font-semibold text-[#64748b] text-[12px]">{conv.subtitle}</span>
                  </div>
                  <span className="font-geist font-normal text-[#94a3b8] text-[13px]">{conv.refLine}</span>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 flex flex-col gap-3">
                  {conv.integration && <IntegrationBadge label={conv.integration} />}
                  {allMessages.map((msg) => {
                    if (msg.type === "system") return <SystemMessage key={msg.id} content={msg.content!} />;
                    if (msg.type === "structured") return <StructuredCard key={msg.id} msg={msg} />;
                    return <TextBubble key={msg.id} msg={msg} responderId={activeId} />;
                  })}
                  {activeId === "trusted" && <TypingIndicator responderId="trusted" />}
                </div>

                {/* Message input */}
                <div className="px-4 py-3 border-t border-[#e2e8f0] flex items-center gap-2 bg-white">
                  <button className="cursor-pointer text-[#94a3b8] hover:text-[#475569] transition-colors shrink-0 p-1">
                    <Paperclip size={17} />
                  </button>
                  <div className="flex-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] px-4 h-[44px] flex items-center">
                    <input
                      className="flex-1 bg-transparent font-geist font-normal text-[#0f172a] text-[14px] outline-none placeholder:text-[#94a3b8]"
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                    />
                  </div>
                  <button
                    title="Voice note"
                    className="cursor-pointer text-[#94a3b8] hover:text-[#d97706] transition-colors shrink-0 p-1"
                  >
                    <Mic size={18} />
                  </button>
                  <button
                    onClick={sendMessage}
                    className="bg-[#d97706] hover:bg-[#b45309] flex items-center justify-center rounded-[12px] size-[40px] shadow-[0px_4px_4px_rgba(217,119,6,0.12)] transition-colors cursor-pointer shrink-0"
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <AccessRequired />
        )}
      </main>
    </div>
  );
}
