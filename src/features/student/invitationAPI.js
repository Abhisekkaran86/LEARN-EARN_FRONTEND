import API from "@/services/axios";

export const INVITATIONS_UPDATED_EVENT = "team-invitations-updated";

export const normalizeInvitations = (rawInvitations) =>
  Array.isArray(rawInvitations)
    ? rawInvitations.filter((item) => item && typeof item === "object")
    : [];

export const fetchMyInvitations = async () => {
  const res = await API.get("/team/my-invitations");
  return normalizeInvitations(res.data?.invitations);
};

export const getInvitationReference = (invite, fallbackReference = "") =>
  invite?.acceptToken || invite?.token || invite?._id || fallbackReference;

export const findInvitationByReference = (invitations, reference) =>
  normalizeInvitations(invitations).find(
    (item) =>
      item?.token === reference ||
      item?.acceptToken === reference ||
      item?._id === reference
  ) || null;

const shouldTryNextAcceptEndpoint = (error, isLastAttempt) => {
  if (isLastAttempt) {
    return false;
  }

  const status = error?.response?.status;
  const message = String(error?.response?.data?.message || "").toLowerCase();

  if (status === 404 || status === 405) {
    return true;
  }

  if (typeof status === "number" && status >= 500) {
    return true;
  }

  if (
    status === 400 &&
    message.includes("token") &&
    (message.includes("required") || message.includes("missing"))
  ) {
    return true;
  }

  return (
    message.includes("reading 'token'") ||
    message.includes("cannot read properties of undefined")
  );
};

export const acceptInvitation = async (invitationReference) => {
  const tokenPayload = { token: invitationReference };

  const endpointAttempts = [
    () => API.post(`/team/invite/confirm/${invitationReference}`, tokenPayload),
    () =>
      API.post(`/team/invite/confirm/${invitationReference}`, tokenPayload, {
        params: { token: invitationReference },
      }),
    () => API.post("/team/invite/confirm", tokenPayload),
    () =>
      API.post("/team/invite/confirm", { invitationToken: invitationReference }),
    () =>
      API.post("/team/invite/confirm", tokenPayload, {
        params: { token: invitationReference },
      }),
    () => API.post(`/invitations/accept/${invitationReference}`, tokenPayload),
    () => API.post("/invitations/accept", tokenPayload),
    () =>
      API.post("/invitations/accept", tokenPayload, {
        params: { token: invitationReference },
      }),
  ];

  let lastError = null;

  for (let index = 0; index < endpointAttempts.length; index += 1) {
    try {
      return await endpointAttempts[index]();
    } catch (error) {
      lastError = error;

      if (!shouldTryNextAcceptEndpoint(error, index === endpointAttempts.length - 1)) {
        throw error;
      }
    }
  }

  throw lastError;
};
