const LOCAL_USER_PROFILE_META_KEY = "learnEarnUserProfileMeta";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://learn-earn-contest-3.onrender.com/api/v1";
const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, "");
const ABSOLUTE_URL_PATTERN = /^(?:https?:|data:|blob:|\/\/)/i;

const readLocalProfileMeta = () => {
  try {
    const raw = localStorage.getItem(LOCAL_USER_PROFILE_META_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error("Failed to read stored user profile meta", error);
    return {};
  }
};

const writeLocalProfileMeta = (value) => {
  try {
    localStorage.setItem(LOCAL_USER_PROFILE_META_KEY, JSON.stringify(value));
  } catch (error) {
    console.error("Failed to store user profile meta", error);
  }
};

const buildLookupKeys = ({ email, userId } = {}) => {
  const normalizedEmail =
    typeof email === "string" && email.trim()
      ? `email:${email.trim().toLowerCase()}`
      : "";
  const normalizedUserId =
    typeof userId === "string" && userId.trim()
      ? `id:${userId.trim()}`
      : "";

  return [normalizedEmail, normalizedUserId].filter(Boolean);
};

const getFirstString = (...values) => {
  for (const value of values.flat()) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
};

export const resolveProfileImageUrl = (value = "") => {
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

export const getUserProfileImage = (user) =>
  resolveProfileImageUrl(
    getFirstString(
      user?.profileImage,
      user?.profilePicture,
      user?.avatar,
      user?.image,
      user?.photo,
      user?.photoURL,
      user?.profile?.image,
      user?.profile?.avatar,
      user?.profile?.photo,
      user?.profile?.photoURL
    )
  );

export const getUserRegisteredAt = (user) =>
  getFirstString(
    user?.createdAt,
    user?.registeredAt,
    user?.registrationTime,
    user?.registeredOn,
    user?.profile?.createdAt
  );

export const getLocalUserProfileMeta = ({ email, userId } = {}) => {
  const profileMeta = readLocalProfileMeta();

  for (const key of buildLookupKeys({ email, userId })) {
    if (profileMeta[key]) {
      return profileMeta[key];
    }
  }

  return null;
};

export const saveLocalUserProfileMeta = ({
  email,
  userId,
  profileImage,
  registeredAt,
} = {}) => {
  if (!profileImage && !registeredAt) {
    return;
  }

  const lookupKeys = buildLookupKeys({ email, userId });

  if (!lookupKeys.length) {
    return;
  }

  const profileMeta = readLocalProfileMeta();

  lookupKeys.forEach((key) => {
    profileMeta[key] = {
      ...profileMeta[key],
      ...(profileImage ? { profileImage } : {}),
      ...(registeredAt ? { registeredAt } : {}),
    };
  });

  writeLocalProfileMeta(profileMeta);
};

export const normalizeUserProfileData = (user) => {
  if (!user || typeof user !== "object") {
    return user;
  }

  const localMeta = getLocalUserProfileMeta({
    email: user.email,
    userId: user._id || user.id,
  });
  const normalizedUser = { ...user };
  const profileImage = getUserProfileImage(user);
  const registeredAt = getUserRegisteredAt(user) || localMeta?.registeredAt;

  if (profileImage) {
    if (!normalizedUser.profileImage) {
      normalizedUser.profileImage = profileImage;
    }

    if (!normalizedUser.profilePicture) {
      normalizedUser.profilePicture = profileImage;
    }
  } else if (localMeta?.profileImage) {
    const fallbackImage = resolveProfileImageUrl(localMeta.profileImage);

    normalizedUser.profileImage = fallbackImage;

    if (!normalizedUser.profilePicture) {
      normalizedUser.profilePicture = fallbackImage;
    }
  }

  if (registeredAt) {
    if (!normalizedUser.createdAt) {
      normalizedUser.createdAt = registeredAt;
    }

    if (!normalizedUser.registeredAt) {
      normalizedUser.registeredAt = registeredAt;
    }
  }

  return normalizedUser;
};

export const getUserInitials = (name = "") => {
  const parts = String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (!parts.length) {
    return "U";
  }

  return parts.map((part) => part[0]?.toUpperCase()).join("");
};

export const formatRegistrationDate = (user, options = {}) => {
  const registeredAt = getUserRegisteredAt(user);

  if (!registeredAt) {
    return "Not available";
  }

  const parsedDate = new Date(registeredAt);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    ...options,
  });
};
