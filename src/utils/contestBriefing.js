const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://learn-earn-contest-3.onrender.com/api/v1";
const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, "");
const ABSOLUTE_URL_PATTERN = /^(?:https?:|data:|blob:|\/\/)/i;

export const CONTEST_BRIEF_UPLOAD_FIELD_CANDIDATES = [
  "projectBriefing",
  "projectBriefingPdf",
  "projectBriefingFile",
  "projectBriefingDocument",
  "projectBrief",
  "briefingPdf",
  "briefPdf",
  "briefing",
  "pdf",
  "document",
  "attachment",
  "file",
];

const getFirstString = (...values) => {
  for (const value of values.flat()) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
};

const getFileNameFromUrl = (value = "") => {
  if (typeof value !== "string") {
    return "";
  }

  const withoutQuery = value.split(/[?#]/)[0];
  const segment = withoutQuery.split("/").pop()?.trim() || "";

  if (!segment) {
    return "";
  }

  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
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
      contest?.projectBriefingUrl,
      contest?.projectBriefingPdfUrl,
      contest?.projectBriefUrl,
      contest?.briefingUrl,
      contest?.briefUrl,
      contest?.pdfUrl,
      contest?.fileUrl,
      contest?.projectBriefing,
      contest?.projectBriefingPdf,
      contest?.projectBrief,
      contest?.briefing,
      contest?.briefingPdf,
      contest?.briefPdf,
      contest?.pdf,
      contest?.documentUrl,
      contest?.document,
      contest?.attachmentUrl,
      contest?.attachment,
      contest?.file,
      contest?.projectBriefing?.url,
      contest?.projectBriefing?.path,
      contest?.projectBriefing?.location,
      contest?.projectBriefing?.downloadUrl,
      contest?.projectBriefing?.secure_url,
      contest?.projectBriefingPdf?.url,
      contest?.projectBriefingPdf?.path,
      contest?.projectBriefingPdf?.location,
      contest?.projectBriefingPdf?.downloadUrl,
      contest?.projectBriefingPdf?.secure_url,
      contest?.projectBrief?.url,
      contest?.projectBrief?.path,
      contest?.briefing?.url,
      contest?.briefing?.path,
      contest?.document?.url,
      contest?.document?.path,
      contest?.document?.location,
      contest?.document?.secure_url,
      contest?.attachment?.url,
      contest?.attachment?.path,
      contest?.attachment?.location,
      contest?.attachment?.secure_url,
      contest?.file?.url,
      contest?.file?.path,
      contest?.file?.location,
      contest?.file?.secure_url,
      contest?.resources?.projectBriefing,
      contest?.resources?.projectBriefingUrl,
      contest?.resources?.projectBriefingPdf,
      contest?.resources?.projectBriefingPdfUrl,
      contest?.resources?.projectBrief,
      contest?.resources?.briefing,
      contest?.resources?.pdf,
      contest?.resources?.pdfUrl,
      contest?.assets?.projectBriefing,
      contest?.assets?.projectBriefingPdf,
      contest?.assets?.projectBrief,
      contest?.assets?.briefing,
      contest?.assets?.pdf
    )
  );

export const getContestBriefingName = (contest) => {
  const briefingUrl = getContestBriefingUrl(contest);

  return (
  getFirstString(
    contest?.projectBriefingOriginalName,
    contest?.projectBriefingFileName,
    contest?.projectBriefingPdfName,
    contest?.projectBriefingName,
    contest?.projectBriefName,
    contest?.briefingPdfName,
    contest?.briefPdfName,
    contest?.briefingName,
    contest?.pdfName,
    contest?.documentName,
    contest?.attachmentName,
    contest?.fileName,
    contest?.filename,
    contest?.projectBriefing?.originalName,
    contest?.projectBriefing?.fileName,
    contest?.projectBriefing?.name,
    contest?.projectBriefingPdf?.originalName,
    contest?.projectBriefingPdf?.fileName,
    contest?.projectBriefingPdf?.name,
    contest?.projectBrief?.originalName,
    contest?.projectBrief?.name,
    contest?.briefing?.originalName,
    contest?.briefing?.name,
    contest?.document?.originalName,
    contest?.document?.name,
    contest?.attachment?.originalName,
    contest?.attachment?.name,
    contest?.file?.originalName,
    contest?.file?.name,
    getFileNameFromUrl(briefingUrl)
  ) || "Project Briefing PDF"
  );
};
