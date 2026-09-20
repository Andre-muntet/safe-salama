export type AudioFormat = "Audio Only" | "Video Only" | "Quick Reads" | "Stories" | "Visual Brief";

export interface AudioItem {
  id: string;
  label: string;
  title: string;
  duration: string;
  offline: boolean;
  description?: string;
  topics?: string[];
  transcript?: string[];
}

export const audioFormats: AudioFormat[] = ["Audio Only", "Video Only", "Quick Reads", "Stories", "Visual Brief"];

export const audioQueue: AudioItem[] = [
  {
    id: "prev",
    label: "Previous",
    title: "Street Harassment: What to Know",
    duration: "7:42",
    offline: true,
  },
  {
    id: "primary",
    label: "Listening Offline",
    title: "Understanding Husband-to-Wife Abuse",
    duration: "12:34",
    offline: true,
    description:
      "This audio combines insights from recent community reports and expert guidance to help you understand patterns of husband-to-wife abuse. It covers recognizing early warning signs, understanding coercive control dynamics, and practical steps toward safety and support.",
    topics: [
      "Recognizing escalation patterns and cycle of control",
      "Emotional and financial control tactics implemented over time",
      "How to safely and privately document incidents without detection",
      "Pathways to legal protection, safety planning, and local shelter resources",
    ],
    transcript: [
      "[0:00] Welcome. This audio brief covers husband-to-wife abuse patterns based on verified community reports.",
      "[0:45] Research shows that escalation often follows a recognizable cycle — tension building, incident, reconciliation, calm.",
      "[2:10] Coercive control can be financial, emotional, or social. Recognizing these patterns is the first step.",
      "[4:30] Documenting incidents safely: use a trusted device or cloud account your partner cannot access.",
      "[6:15] Legal protection options include emergency protective orders, obtainable quickly through local courts.",
      "[8:00] Safety planning: identify a safe place to go, keep essentials accessible, inform a trusted person.",
      "[10:20] Local shelter resources are confidential. Staff are trained to help without judgment.",
      "[12:00] You are not alone. Reaching out is a sign of strength, not weakness.",
    ],
  },
  {
    id: "next1",
    label: "Up Next",
    title: "Recognizing Online Grooming Patterns",
    duration: "9:17",
    offline: true,
  },
  {
    id: "next2",
    label: "Up Next",
    title: "Workplace Harassment: Know Your Rights",
    duration: "11:05",
    offline: true,
  },
];
