export const aqiRelatedData = [
  { min: 0, max: 50, status: "Good", color: "#83bb7a" },
  { min: 51, max: 100, status: "Moderate", color: "#fbde4e" },
  {
    min: 101,
    max: 150,
    status: "Unhealthy for Sensitive Groups",
    color: "#f27828",
  },
  { min: 151, max: 200, status: "Unhealthy", color: "#e14b28" },
  { min: 201, max: 300, status: "Very Unhealthy", color: "#89487f" },
  { min: 301, max: Infinity, status: "Hazardous", color: "#401623" },
];

export function getAqiColor(aqi: number) {
  for (const range of aqiRelatedData) {
    if (aqi >= range.min && aqi <= range.max) {
      return range.color;
    }
  }
  return "#000";
}

export function getAqiMessage(aqi: number): string {
  for (const range of aqiRelatedData) {
    if (aqi >= range.min && aqi <= range.max) {
      return `The air quality is ${range.status} with an AQI of ${aqi}.`;
    }
  }
  return `The air quality is unknown with an AQI of ${aqi}.`;
}
