import { MdEmail, MdNotifications, MdSchedule } from "react-icons/md";

export const emailFeature = [
  {
    icon: MdEmail,
    title: "Daily Summaries",
    description:
      "Get a morning digest of air quality in all your tracked locations",
  },
  {
    icon: MdNotifications,
    title: "Instant Alerts",
    description: "Immediate notifications when AQI reaches unhealthy levels",
  },
  {
    icon: MdSchedule,
    title: "Custom Schedule",
    description: "Choose when and how often you want to receive updates",
  },
];

export const locationData = [
  {
    location: "Kathmandu",
    aqi: 87,
    status: "Moderate",
    color: "yellow",
  },
  {
    location: "Patan",
    aqi: 145,
    status: "Unhealthy for Sensitive",
    color: "orange",
  },
  {
    location: "Bhaktapur",
    aqi: 62,
    status: "Moderate",
    color: "yellow",
  },
];
