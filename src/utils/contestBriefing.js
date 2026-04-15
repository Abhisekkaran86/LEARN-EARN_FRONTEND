const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://learn-earn-contest-3.onrender.com/api/v1";
const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, "");
const ABSOLUTE_URL_PATTERN = /^(?:https?:|data:|blob:|\/\/)/i;

export const CONTEST_BRIEF_UPLOAD_FIELD_CANDIDATES = [
  "projectBriefing",
  "projectBriefingPdf",
  "projectBrief",
  "briefingPdf",
  "briefPdf",
  "pdf",
  "document",
  "attachment",
];

const getFirstString = (...values) => {
  for (const value of values.flat()) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
};

export const resolveContestBriefingAssetUrl = (value = "") => {
  if (typeof value !== "string") {
    return "";
  }

  const normalizedValue = value.trim().replace(/\\/g, "/");

  if (!normalizedValue) {
    return "";
  }

  if (ABSOLUTE_URL_PATTERN.test(normalizedValue)) {
    return normalizedValue;
  }

  if (normalizedValue.startsWith("/")) {
    return `${API_ORIGIN}${normalizedValue}`;
  }

  return `${API_ORIGIN}/${normalizedValue.replace(/^\.?\//, "")}`;
};

export const getContestBriefingUrl = (contest) =>
  resolveContestBriefingAssetUrl(
    getFirstString(
      contest?.projectBriefingDownloadUrl,
      contest?.projectBriefing,
      contest?.projectBriefingPdf,
      contest?.projectBrief,
      contest?.briefingPdf,
      contest?.briefPdf,
      contest?.pdf,
      contest?.documentUrl,
      contest?.document,
      contest?.attachmentUrl,
      contest?.attachment,
      contest?.projectBriefing?.url,
      contest?.projectBriefingPdf?.url,
      contest?.document?.url,
      contest?.attachment?.url,
      contest?.resources?.projectBriefing,
      contest?.resources?.projectBriefingPdf,
      contest?.resources?.pdf,
      contest?.assets?.projectBriefing,
      contest?.assets?.projectBriefingPdf,
      contest?.assets?.pdf
    )
  );

export const getContestBriefingName = (contest) =>
  getFirstString(
    contest?.projectBriefingOriginalName,
    contest?.projectBriefingFileName,
    contest?.projectBriefingPdfName,
    contest?.projectBriefName,
    contest?.briefingPdfName,
    contest?.briefPdfName,
    contest?.pdfName,
    contest?.documentName,
    contest?.attachmentName,
    contest?.projectBriefing?.originalName,
    contest?.projectBriefingPdf?.originalName,
    contest?.document?.originalName,
    contest?.attachment?.originalName
  ) || "Project Briefing PDF";
