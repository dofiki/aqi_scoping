export const aqiInfoTableData = [
  {
    range: "0-50",
    category: "Good",
    color: "text-green-500",
    healthMessage:
      "Air quality is considered satisfactory, with little or no risk.",
    recommendedActions: "Ideal for all activities. Stay active outdoors.",
    source: "US EPA",
  },
  {
    range: "51-100",
    category: "Moderate",
    color: "text-yellow-500",
    healthMessage:
      "Air quality is acceptable; some pollutants may be a moderate concern for sensitive people.",
    recommendedActions:
      "Healthy people can go outside normally; sensitive persons (asthma, elderly) should consider limiting prolonged exertion outdoors.",
    source: "AirNow",
  },
  {
    range: "101-150",
    category: "Unhealthy for Sensitive Groups",
    color: "text-orange-500",
    healthMessage: "Sensitive individuals may experience health effects.",
    recommendedActions:
      "Children, older adults, and people with asthma or heart/lung conditions should reduce time outside and limit physical activity.",
    source: "US EPA",
  },
  {
    range: "151-200",
    category: "Unhealthy",
    color: "text-red-500",
    healthMessage:
      "Everyone may begin to experience health effects; sensitive groups may experience serious effects.",
    recommendedActions:
      "Avoid prolonged outdoor exertion; sensitive groups should stay indoors if possible.",
    source: "AirNow",
  },
  {
    range: "201-300",
    category: "Very Unhealthy",
    color: "text-purple-500",
    healthMessage:
      "Health alert: Everyone may experience more serious health effects.",
    recommendedActions:
      "Everyone should avoid outdoor activities and reduce exposure; keep indoor air clean.",
    source: "US EPA",
  },
  {
    range: "301-500+",
    category: "Hazardous",
    color: "text-red-900",
    healthMessage:
      "Health warning of emergency conditions: entire population likely affected.",
    recommendedActions:
      "Everyone should avoid all outdoor exertion; consider air purifiers indoors and follow public health advisories.",
    source: "AirNow",
  },
];
