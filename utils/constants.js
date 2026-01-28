export const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];


  export const dashboardData = [
  {
    id: 1,
    title: "Total Members",
    value: 5240,
    change: 350,
    changeLabel: "this month",
    trend: "up",
    icon: "users",
    theme: "rgba(255, 0, 0, 0.5)",
  },
  {
    id: 2,
    title: "Active Memberships",
    value: 4180,
    change: 160,
    changeLabel: "this month",
    trend: "up",
    icon: "membership",
    theme: "rgba(34, 197, 94, 0.5)",
  },
  {
    id: 3,
    title: "Monthly Revenue",
    value: 18540,
    prefix: "$",
    change: 5.2,
    changeType: "percentage",
    changeLabel: "this month",
    trend: "up",
    icon: "dollar",
    theme: "rgba(249, 115, 22, 0.5)",
  },
  {
    id: 4,
    title: "Pending Payments",
    value: 24,
    change: 6,
    changeLabel: "overdue",
    trend: "down",
    icon: "warning",
    theme: "rgba(255, 0, 0, 0.5)",
  },
];


export const data = [
  { month: "Jan", registered: 1200, enrolled: 1000 },
  { month: "Feb", registered: 1800, enrolled: 1500 },
  { month: "Mar", registered: 2100, enrolled: 1800 },
  { month: "Apr", registered: 2400, enrolled: 2100 },
  { month: "May", registered: 2800, enrolled: 2500 },
  { month: "Jun", registered: 3400, enrolled: 3000 },
  { month: "Jul", registered: 3700, enrolled: 3300 },
  { month: "Aug", registered: 3600, enrolled: 3500 },
  { month: "Sep", registered: 4200, enrolled: 3900 },
];
