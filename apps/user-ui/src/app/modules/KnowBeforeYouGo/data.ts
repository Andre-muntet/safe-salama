export interface Location {
  id: string;
  name: string;
  level: string;
  levelColor: string;
  updated: string;
  points: string[];
}

export const locations: Location[] = [
  {
    id: "westlands",
    name: "Westlands, Nairobi",
    level: "MODERATE CONCERN",
    levelColor: "#d97706",
    updated: "Based on 12 verified reports · Updated 2 days ago",
    points: [
      "Recurring concerns around street harassment and theft",
      "Higher risk during busy evening periods",
      "Stay in well-populated areas after dark",
      "Use established transport points at night",
      "No recent change in overall pattern",
    ],
  },
  {
    id: "westgate",
    name: "Westgate, Nairobi",
    level: "ELEVATED CONCERN",
    levelColor: "#dc2626",
    updated: "Based on 8 verified reports · Updated 1 day ago",
    points: [
      "Recent spike in theft and robbery reports",
      "Avoid ATMs after dark",
      "Use licensed taxis and avoid walking alone",
      "Carry minimal valuables",
      "Security presence increased in area",
    ],
  },
  {
    id: "karen",
    name: "Karen, Nairobi",
    level: "LOW CONCERN",
    levelColor: "#16a34a",
    updated: "Based on 5 verified reports · Updated 3 days ago",
    points: [
      "Generally safe residential area",
      "Minor incidents of opportunistic theft reported",
      "Well-lit main roads — stay on them at night",
      "Gated communities add layer of security",
      "No significant pattern changes recently",
    ],
  },
];
