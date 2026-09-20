"use client";
import { useState } from "react";
import { Video, Mic, FileText, Image, Link, MapPin, Calendar, UserCheck, ArrowRight, KeyRound, Check, AlertCircle } from "lucide-react";
import { Header } from "../../shared/header";
import { useRouter } from "next/navigation";


type ContribType = "video" | "voice" | "written" | "photo" | "other";

const CONTRIB_TYPES: { key: ContribType; label: string; desc: string; Icon: React.ElementType }[] = [
  { key: "video",   label: "Video",           desc: "Share something you witnessed or documented", Icon: Video },
  { key: "voice",   label: "Voice",            desc: "Tell us what happened in detail",             Icon: Mic },
  { key: "written", label: "Written Account",  desc: "Describe what you know or observed",          Icon: FileText },
  { key: "photo",   label: "Photo",            desc: "Share relevant visual information",            Icon: Image },
  { key: "other",   label: "Other Evidence",   desc: "Provide another useful source or file",       Icon: Link },
];

interface Errors {
  description?: string;
  location?: string;
  date?: string;
  fullName?: string;
  emailPhone?: string;
}


export default function ContributePage() {
;
const router = useRouter();
  const [anonymous, setAnonymous] = useState(true);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailPhone, setEmailPhone] = useState("");
  const [orgAffil, setOrgAffil] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!description.trim()) e.description = "Please describe what this video shows.";
    if (!location.trim())    e.location    = "Please enter a location.";
    if (!date)               e.date        = "Please select a date and time.";
    if (!anonymous) {
      if (!fullName.trim())    e.fullName    = "Full name is required when not anonymous.";
      if (!emailPhone.trim())  e.emailPhone  = "Email or phone is required when not anonymous.";
    }
    return e;
  }

  function handleSubmit() {
    setSubmitted(true);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setShowSuccess(true);
    }
  }

  function handleFieldChange<T>(setter: (v: T) => void, field: keyof Errors) {
    return (v: T) => {
      setter(v);
      if (submitted) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  }

function handleOkay() {
  setShowSuccess(false);
  router.push("/my-contributions");
}

  const hasErrors = submitted && Object.keys(validate()).length > 0;

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(126deg,#fff 25%,#faf9f6 46%,#f8fafc 66%,#faf9f6 75%)" }}
    >
      <Header />
      <main className="flex-1 pt-[72px]">
        {/* Hero */}
        <div
          className="flex flex-col items-center gap-4 px-5 md:px-20 pt-16 pb-16 text-center"
          style={{ background: "linear-gradient(169deg,#fff 25%,#faf9f6 75%)" }}
        >
          <h1 className="font-outfit font-bold text-[#0f172a] text-[48px] leading-[1.1]">Contribute</h1>
          <p className="font-geist font-normal text-[#475569] text-[18px] leading-[1.5] max-w-[640px]">
            Help build a better picture of safety in our communities. Share observations, files, or verified facts to empower local awareness and planning.
          </p>
        </div>

        {/* Type selection */}
        <div
          className="flex flex-col items-center gap-8 px-5 md:px-20 pb-12"
          style={{ background: "linear-gradient(169deg,#fff 25%,#faf9f6 75%)" }}
        >
          <h2 className="font-outfit font-semibold text-[#0f172a] text-[24px]">What would you like to contribute?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-[1120px]">
            {CONTRIB_TYPES.map(({ key, label, desc, Icon }) => {
              const isActive = key === "video";
              return (
                <div
                  key={key}
                  className={`bg-white flex flex-col justify-between h-[180px] p-5 rounded-[12px] transition-all ${
                    isActive
                      ? "border-l-4 border-[#d97706] shadow-[0px_8px_8px_rgba(15,23,42,0.05)]"
                      : "border border-[#e2e8f0] opacity-60 cursor-default"
                  }`}
                >
                  <div className={`flex items-center justify-center size-[40px] rounded-[8px] p-[10px] ${isActive ? "bg-[#fef3c7]" : "bg-[#f1f5f9]"}`}>
                    <Icon size={20} className={isActive ? "text-[#d97706]" : "text-[#64748b]"} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className={`font-outfit leading-normal text-[18px] ${isActive ? "font-bold text-[#0f172a]" : "font-semibold text-[#0f172a]"}`}>{label}</p>
                    <p className="font-geist font-normal text-[#64748b] text-[12px] leading-[1.4]">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-center px-5 md:px-20 py-6">
          <div className="w-full max-w-[1120px] h-px bg-[#e2e8f0]" />
        </div>

        {/* Form */}
        <div className="flex justify-center px-5 md:px-20 pb-24">
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] shadow-[0px_2px_4px_rgba(15,23,42,0.03),0px_8px_12px_rgba(15,23,42,0.05)] p-10 w-full max-w-[760px] flex flex-col gap-8">
            {/* Form header */}
            <div className="flex flex-col gap-2">
              <h3 className="font-outfit font-bold text-[#0f172a] text-[24px]">Record or Upload Video</h3>
              <p className="font-geist font-normal text-[#475569] text-[14px]">
                Share verified footage of observations, infrastructure safety hazards, or public warnings.
              </p>
            </div>

            {/* Upload area */}
            <label className="bg-[#faf9f6] border-[1.5px] border-dashed border-[#d97706] rounded-[12px] flex flex-col items-center justify-center gap-3 h-[180px] cursor-pointer hover:bg-[#fef9f0] transition-colors">
              <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
              <div className="bg-[#fef3c7] flex items-center justify-center size-[48px] rounded-[24px]">
                <Video size={24} className="text-[#d97706]" />
              </div>
              {fileName ? (
                <div className="flex flex-col items-center gap-1">
                  <p className="font-geist font-semibold text-[#0f172a] text-[14px]">{fileName}</p>
                  <p className="font-geist font-normal text-[#64748b] text-[12px]">Click to change file</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 text-center px-4">
                  <p className="font-geist font-semibold text-[#0f172a] text-[14px]">Drag and drop a video file or click to browse</p>
                  <p className="font-geist font-normal text-[#64748b] text-[12px]">Or record directly from your device (Max size: 250MB)</p>
                </div>
              )}
            </label>

            {/* Fields */}
            <div className="flex flex-col gap-5">
              {/* Description — required */}
              <div className="flex flex-col gap-2">
                <label className="font-geist font-semibold text-[#0f172a] text-[13px]">
                  What does this video show? <span className="text-[#dc2626]">*</span>
                </label>
                <textarea
                  className={`bg-[#f8fafc] border rounded-[8px] px-4 py-3 h-[88px] w-full font-geist font-normal text-[#0f172a] text-[14px] placeholder:text-[#64748b] outline-none resize-none transition-colors ${
                    errors.description ? "border-[#dc2626]" : "border-[#e2e8f0] focus:border-[#d97706]"
                  }`}
                  placeholder="Describe the specific hazards, situations, or protective community actions visible..."
                  value={description}
                  onChange={(e) => handleFieldChange(setDescription, "description")(e.target.value)}
                />
                {errors.description && (
                  <div className="flex items-center gap-1 text-[#dc2626]">
                    <AlertCircle size={12} />
                    <span className="font-geist font-normal text-[12px]">{errors.description}</span>
                  </div>
                )}
              </div>

              {/* Location + Date row — both required */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-geist font-semibold text-[#0f172a] text-[13px]">
                    Where did this happen? <span className="text-[#dc2626]">*</span>
                  </label>
                  <div className={`bg-[#f8fafc] border rounded-[8px] flex items-center gap-2 px-[14px] py-[10px] transition-colors focus-within:border-[#d97706] ${
                    errors.location ? "border-[#dc2626]" : "border-[#e2e8f0]"
                  }`}>
                    <MapPin size={16} className="text-[#64748b] shrink-0" />
                    <input
                      className="flex-1 min-w-0 font-geist font-normal text-[#0f172a] text-[14px] bg-transparent outline-none placeholder:text-[#64748b]"
                      placeholder="Neighborhood, district, or city"
                      value={location}
                      onChange={(e) => handleFieldChange(setLocation, "location")(e.target.value)}
                    />
                  </div>
                  {errors.location && (
                    <div className="flex items-center gap-1 text-[#dc2626]">
                      <AlertCircle size={12} />
                      <span className="font-geist font-normal text-[12px]">{errors.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-geist font-semibold text-[#0f172a] text-[13px]">
                    When did this happen? <span className="text-[#dc2626]">*</span>
                  </label>
                  <div className={`bg-[#f8fafc] border rounded-[8px] flex items-center gap-2 px-[14px] py-[10px] transition-colors focus-within:border-[#d97706] ${
                    errors.date ? "border-[#dc2626]" : "border-[#e2e8f0]"
                  }`}>
                    <Calendar size={16} className="text-[#64748b] shrink-0" />
                    <input
                      type="datetime-local"
                      className="flex-1 min-w-0 font-geist font-normal text-[#0f172a] text-[14px] bg-transparent outline-none"
                      value={date}
                      onChange={(e) => handleFieldChange(setDate, "date")(e.target.value)}
                    />
                  </div>
                  {errors.date && (
                    <div className="flex items-center gap-1 text-[#dc2626]">
                      <AlertCircle size={12} />
                      <span className="font-geist font-normal text-[12px]">{errors.date}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Anonymous toggle */}
              <div className={`flex flex-col gap-4 p-4 rounded-[10px] border transition-colors ${
                anonymous ? "bg-[#f0fdfa] border-[#ccfbf1]" : "bg-[#faf9f6] border-[#e2e8f0]"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck size={18} className={anonymous ? "text-[#0d9488]" : "text-[#64748b]"} />
                    <span className="font-geist font-semibold text-[#0f172a] text-[14px]">Keep my identity anonymous</span>
                  </div>
                  <button
                    onClick={() => { setAnonymous((a) => !a); if (submitted) setErrors(validate()); }}
                    aria-label="Toggle anonymous"
                    className={`w-[40px] h-[20px] rounded-full relative transition-colors shrink-0 ${anonymous ? "bg-[#0d9488]" : "bg-[#cbd5e1]"}`}
                  >
                    <div className={`absolute top-[2px] size-[16px] rounded-full bg-white shadow transition-transform ${anonymous ? "translate-x-[22px]" : "translate-x-[2px]"}`} />
                  </button>
                </div>

                {anonymous ? (
                  <p className="font-geist font-normal text-[#475569] text-[12px] leading-[1.5]">
                    <strong className="font-semibold text-[#0f172a]">Your contribution will be attributed to Anonymous contributor.</strong>{" "}
                    We remove identifying metadata and may blur or otherwise anonymize content before presentation.
                  </p>
                ) : (
                  <div className="flex flex-col gap-4">
                    <p className="font-geist font-semibold text-[#0f172a] text-[13px]">Your identity</p>

                    {/* PIN access — coming soon */}
                    <div className="flex items-center gap-3 border border-dashed border-[#cbd5e1] rounded-[8px] px-4 py-[10px] cursor-default opacity-60 select-none bg-[#f8fafc]">
                      <KeyRound size={15} className="text-[#94a3b8] shrink-0" />
                      <span className="font-geist font-medium text-[#94a3b8] text-[14px]">Secret PIN</span>
                      <span className="font-geist font-normal text-[#b8c2cc] text-[12px]">— Coming soon</span>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-[#e2e8f0]" />
                      <span className="font-geist font-normal text-[#94a3b8] text-[12px]">or enter manually</span>
                      <div className="flex-1 h-px bg-[#e2e8f0]" />
                    </div>

                    {/* Required identity fields */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <input
                          className={`bg-[#f8fafc] border rounded-[8px] px-4 py-[10px] font-geist font-normal text-[#0f172a] text-[14px] placeholder:text-[#64748b] outline-none transition-colors w-full ${
                            errors.fullName ? "border-[#dc2626]" : "border-[#e2e8f0] focus:border-[#d97706]"
                          }`}
                          placeholder="Full name *"
                          value={fullName}
                          onChange={(e) => handleFieldChange(setFullName, "fullName")(e.target.value)}
                        />
                        {errors.fullName && (
                          <div className="flex items-center gap-1 text-[#dc2626]">
                            <AlertCircle size={12} />
                            <span className="font-geist font-normal text-[12px]">{errors.fullName}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <input
                          className={`bg-[#f8fafc] border rounded-[8px] px-4 py-[10px] font-geist font-normal text-[#0f172a] text-[14px] placeholder:text-[#64748b] outline-none transition-colors w-full ${
                            errors.emailPhone ? "border-[#dc2626]" : "border-[#e2e8f0] focus:border-[#d97706]"
                          }`}
                          placeholder="Email or phone *"
                          value={emailPhone}
                          onChange={(e) => handleFieldChange(setEmailPhone, "emailPhone")(e.target.value)}
                        />
                        {errors.emailPhone && (
                          <div className="flex items-center gap-1 text-[#dc2626]">
                            <AlertCircle size={12} />
                            <span className="font-geist font-normal text-[12px]">{errors.emailPhone}</span>
                          </div>
                        )}
                      </div>

                      <input
                        className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] px-4 py-[10px] font-geist font-normal text-[#0f172a] text-[14px] placeholder:text-[#64748b] outline-none focus:border-[#d97706] transition-colors w-full"
                        placeholder="Organization / affiliation (optional)"
                        value={orgAffil}
                        onChange={(e) => setOrgAffil(e.target.value)}
                      />
                    </div>

                    <p className="font-geist font-normal text-[#64748b] text-[12px] leading-[1.5]">
                      This information will identify you as the source. Your identity will remain attached when this contribution is presented.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Inline error summary */}
            {hasErrors && (
              <div className="bg-[#fef2f2] border border-[#fecaca] rounded-[8px] px-4 py-3 flex items-start gap-2">
                <AlertCircle size={14} className="text-[#dc2626] shrink-0 mt-[2px]" />
                <p className="font-geist font-normal text-[#dc2626] text-[13px] leading-[1.5]">
                  Please fill in all required fields before submitting.
                </p>
              </div>
            )}

            {/* Submit */}
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleSubmit}
                className="bg-[#d97706] hover:bg-[#b45309] active:scale-[0.99] transition-all text-white font-geist font-semibold text-[15px] flex items-center justify-center gap-2 w-full py-[14px] rounded-[8px] shadow-[0px_4px_6px_rgba(217,119,6,0.12)]"
              >
                Submit Contribution
                <ArrowRight size={16} className="text-white" />
              </button>
              <p className="font-geist font-normal text-[#64748b] text-[12px] text-center">
                All contributions are reviewed before being added to the knowledge base. Your privacy is protected.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Success modal */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-5"
          style={{ background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)" }}
        >
          <div className="bg-white rounded-[20px] shadow-[0px_24px_48px_rgba(15,23,42,0.12)] p-10 flex flex-col gap-6 max-w-[440px] w-full">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="bg-[#f0fdf4] flex items-center justify-center size-[56px] rounded-full">
                <Check size={28} className="text-[#22c55e]" strokeWidth={2.5} />
              </div>
              <h2 className="font-outfit font-bold text-[#0f172a] text-[26px] leading-[1.2]">
                Contribution submitted
              </h2>
              <p className="font-geist font-normal text-[#475569] text-[15px] leading-[1.6]">
                <strong className="font-semibold text-[#0f172a]">Thank you for helping keep your community informed and safer.</strong>{" "}
                Your contribution is now under review to ensure the information is accurate and ready to help others.
              </p>
            </div>
            <button
              onClick={handleOkay}
              className="bg-[#0f172a] hover:bg-[#1e293b] text-white font-geist font-semibold text-[15px] py-[13px] rounded-[10px] transition-colors"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
