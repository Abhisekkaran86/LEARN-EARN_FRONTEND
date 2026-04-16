import API from "@/services/axios";

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

  return (
    message.includes("reading 'token'") ||
    message.includes("cannot read properties of undefined")
  );
};

export const acceptInvitation = async (invitationReference) => {
  const endpointAttempts = [
    () =>
      API.post(`/team/invite/confirm/${invitationReference}`, {
        token: invitationReference,
      }),
    () => API.post("/team/invite/confirm", { token: invitationReference }),
    () => API.post(`/invitations/accept/${invitationReference}`),
    () => API.post("/invitations/accept", { token: invitationReference }),
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
