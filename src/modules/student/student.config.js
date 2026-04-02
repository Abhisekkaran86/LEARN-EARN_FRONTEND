// export const STUDENT_CONFIG = {
//   hero: {
//     title: "Welcome, {name}!",
//     subtitle:
//       "Your scholastic journey is shining bright today. You have {active} active contests waiting for your creative spark.",
//   },

//   stats: [
//     { key: "rank", label: "CURRENT RANK" },
//     { key: "points", label: "POINTS" },
//   ],

//   featured: {
//     title: "Featured Contests",
//     action: "View all contests",
//   },

//   participation: {
//     title: "My Participation",
//   },

//   sidebar: {
//     achievements: "Accomplishments",
//     deadlines: "Upcoming Deadlines",
//     progress: "Mastery Progress",
//   },
// };

export const STUDENT_CONFIG = {
  hero: {
    title: "Welcome, {name}!",
    subtitle:
      "Your scholastic journey is shining bright today. You have {active} active contests waiting for your creative spark.",
  },

  stats: [
    { key: "rank", label: "CURRENT RANK" },
    { key: "points", label: "POINTS" },
  ],

  featured: {
    title: "Featured Contests",
    action: "View all contests",
  },

  participation: {
    title: "My Participation",
  },

  // ✅ dashboard labels
  sidebar: {
    achievements: "Accomplishments",
    deadlines: "Upcoming Deadlines",
    progress: "Mastery Progress",
  },

  // ✅ NEW → navigation menu
  menu: [
    { name: "Dashboard", path: "/student/dashboard", icon: "🏠" },
    { name: "Contests", path: "/student/contests", icon: "🏆" },
    { name: "My Progress", path: "/student/progress", icon: "📊" },
    { name: "Profile", path: "/student/profile", icon: "👤" },
  ],
};