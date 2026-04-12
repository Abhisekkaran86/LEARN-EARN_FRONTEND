export const getStudentDashboard = async () => {
  return {
    user: {
      name: "Aarav",
      rank: "Top 5%",
      points: "2,450 XP",
      active: 2,
    },

    featured: [
      {
        title: "The Modern Odyssey",
        desc: "Rewrite a classic myth in a modern setting...",
        category: "LITERATURE",
        tag: "ENDS IN 2D",
      },
      {
        title: "Sustainable Futures",
        desc: "Propose innovative solutions...",
        category: "SCIENCE",
        tag: "HIGH STAKES",
      },
    ],

    participation: [
      {
        title: "Visual Arts: Surrealism",
        subtitle: "Submitted on Oct 12, 2023",
        status: "submitted",
      },
      {
        title: "Math Olympiad: Round 1",
        subtitle: "In Progress",
        status: "pending",
      },
      {
        title: "Annual Essay Challenge",
        subtitle: "Results Announced",
        status: "winner",
      },
    ],

    deadlines: [
      { date: "24", month: "OCT", title: "Poetry Slam", time: "6 hours" },
      { date: "28", month: "OCT", title: "Debate Finals" },
      { date: "02", month: "NOV", title: "Math Challenge" },
    ],

    progress: [
      { label: "Critical Thinking", value: 78 },
      { label: "Creative Expression", value: 92 },
    ],
  };
};