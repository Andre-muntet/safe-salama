export interface StepMeta {
  number: number;
  label: string;
}

export interface SummaryStepData {
  type: "summary";
  stepNumber: number;
  sectionLabel: string;
  title: string;
  paragraphs: string[];
  attribution: string;
  readingTime: string;
  nextLabel: string;
}

export interface ListenStepData {
  type: "listen";
  stepNumber: number;
  sectionLabel: string;
  title: string;
  subtitle: string;
  duration: string;
  transcript: {
    preText: string[];
    highlighted: string[];
    postText: string[];
  };
  listeningTime: string;
  nextLabel: string;
}

export type AnyStep = SummaryStepData | ListenStepData;

export interface SubjectBriefData {
  subjectId: string;
  title: string;
  allSteps: StepMeta[];
  summary: SummaryStepData;
  listen: ListenStepData;
}
