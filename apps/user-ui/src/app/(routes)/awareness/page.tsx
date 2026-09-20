"use client";

import { useState } from "react";

import { Header } from "../../shared/header";
import { SafetyBrief } from "../../modules/safety-brief/page";
import { SubjectBrief } from "../../modules/subject-brief/page";
import { SubjectBriefData } from "../../modules/subject-brief/types";
import { domesticViolence } from "../../modules/subject-brief/data/domestic-violence";
import { KnowBeforeYouGo } from "../../modules/KnowBeforeYouGo/page";
import { TuneIn } from "../../modules/tune-in/page";

// Map subject IDs to their brief data.
const subjectBriefData: Record<string, SubjectBriefData> = {
  "domestic-violence": domesticViolence,
};

export default function AwarenessPage() {
  const [openSubjectId, setOpenSubjectId] = useState<string | null>(null);

  const openBrief = subjectBriefData[openSubjectId ?? ""];

  if (openBrief) {
    return (
      <SubjectBrief
        data={openBrief}
        onClose={() => setOpenSubjectId(null)}
      />
    );
  }

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background:
          "linear-gradient(112deg,#fff 25%,#faf9f6 46%,#f8fafc 66%,#faf9f6 75%)",
      }}
    >
      <Header />

      <main className="pt-[72px]">
        <SafetyBrief onSubjectOpen={setOpenSubjectId} />
        <KnowBeforeYouGo />
        <TuneIn />
      </main>
    </div>
  );
}