import type { SubjectBriefData } from "../types";

export const domesticViolence: SubjectBriefData = {
  subjectId: "domestic-violence",
  title: "Domestic Violence",
  allSteps: [
    { number: 1, label: "Summary" },
    { number: 2, label: "Listen" },
    { number: 3, label: "Watch" },
    { number: 4, label: "Know This" },
    { number: 5, label: "What You Can Do" },
  ],
  summary: {
    type: "summary",
    stepNumber: 1,
    sectionLabel: "Summary Briefing",
    title: "When Care Became Control",
    paragraphs: [
      "Based on a documented survivor account from Kenya.\n\nIt was a relationship she once understood as loving. He would drop her at work, pick her up, and want to know where she was going. At first, his need to know where she was and his reluctance to let her go places alone felt like care.",
      "Over time, he began controlling where she went, who she could see, and whether she could move independently. What had once seemed like concern became increasingly restrictive.",
    ],
    attribution: "True story reported on the app · Shared anonymously",
    readingTime: "2 mins",
    nextLabel: "Listen to behavior to abuse",
  },
  listen: {
    type: "listen",
    stepNumber: 2,
    sectionLabel: "Listen to Story",
    title: "When Behaviour Becomes Abuse",
    subtitle: "A different perspective on recognizing the shift from care to control.",
    duration: "1:02",
    transcript: {
      preText: [
        "My neighbour was always so attentive.",
        "He knew her schedule, walked her home,",
        "checked in on her constantly.",
        "We all thought it was devotion.",
      ],
      highlighted: [
        "But then she stopped coming out.",
        "She stopped answering calls.",
      ],
      postText: [
        "By the time we understood what was happening,",
        "she had already lost her voice",
        "in that relationship.",
        "I wish I had seen the signs earlier.",
      ],
    },
    listeningTime: "1 min",
    nextLabel: "Next: Watch",
  },
};
