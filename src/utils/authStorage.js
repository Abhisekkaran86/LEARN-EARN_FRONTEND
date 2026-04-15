import Cookies from "js-cookie";

const TOKEN_COOKIE_KEY = "token";
const ROLE_COOKIE_KEY = "role";
const COOKIE_OPTIONS = { expires: 7, path: "/" };

export const getAuthToken = () =>
  Cookies.get(TOKEN_COOKIE_KEY) || localStorage.getItem("token") || "";

export const getAuthRole = () =>
  Cookies.get(ROLE_COOKIE_KEY) || localStorage.getItem("role") || "";

export const getStoredUser = () => {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch (error) {
    console.error("Failed to parse stored user", error);
    localStorage.removeItem("user");
    return null;
  }
};

export const persistAuthSession = ({ accessToken, role, user }) => {
  if (accessToken) {
    Cookies.set(TOKEN_COOKIE_KEY, accessToken, COOKIE_OPTIONS);
    localStorage.setItem("token", accessToken);
  }

  if (role) {
    Cookies.set(ROLE_COOKIE_KEY, role, COOKIE_OPTIONS);
    localStorage.setItem("role", role);
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));

    if (user._id) {
      localStorage.setItem("userId", user._id);
    }
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  localStorage.removeItem("userId");

  Cookies.remove(TOKEN_COOKIE_KEY, { path: "/" });
  Cookies.remove(ROLE_COOKIE_KEY, { path: "/" });
};

export const isAuthenticated = () => Boolean(getAuthToken());
