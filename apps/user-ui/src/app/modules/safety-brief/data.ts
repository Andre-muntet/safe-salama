export type FilterKey = "current" | "important" | "explore" | "shuffle";

export interface Subject {
  id: string;
  title: string;
  briefs: number;
  img: string;
  offline?: boolean;
  filter: FilterKey[];
}

export const subjects: Subject[] = [
  { id: "domestic-violence",  title: "Domestic Violence",  briefs: 5,  img: "/45beb.png", offline: true, filter: ["current", "important"] },
  { id: "child-safety",       title: "Child Safety",       briefs: 12, img: "/d7f5f.png",               filter: ["current", "important", "explore"] },
  { id: "street-harassment",  title: "Street Harassment",  briefs: 6,  img: "/dc9f7.png",               filter: ["current", "explore"] },
  { id: "online-safety",      title: "Online Safety",      briefs: 10, img: "/bccab.png",               filter: ["current", "explore"] },
  { id: "community-violence", title: "Community Violence", briefs: 5,  img: "/78277.png",               filter: ["important", "explore"] },
];

export const filters: { key: FilterKey; label: string }[] = [
  { key: "current",   label: "Current" },
  { key: "important", label: "Important" },
  { key: "explore",   label: "Explore" },
  { key: "shuffle",   label: "Shuffle for me" },
];
