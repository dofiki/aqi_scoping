import React from "react";
import { FaRunning, FaMask, FaWindowClose, FaLeaf } from "react-icons/fa";
import { MdOutlineWarning } from "react-icons/md";

interface AQIRecommendationProps {
  aqi: number;
}

const AQIRecommendation = ({ aqi }: AQIRecommendationProps) => {
  const getRecommendations = (aqi: number) => {
    if (aqi <= 50) {
      return {
        level: "Good",
        activities: [
          {
            icon: FaRunning,
            text: "Perfect for outdoor activities",
            status: "safe",
          },
          { icon: FaMask, text: "No mask needed", status: "safe" },
          {
            icon: FaWindowClose,
            text: "Keep windows open for fresh air",
            status: "safe",
          },
          {
            icon: FaLeaf,
            text: "Enjoy nature and exercise freely",
            status: "safe",
          },
        ],
      };
    } else if (aqi <= 100) {
      return {
        level: "Moderate",
        activities: [
          {
            icon: FaRunning,
            text: "Outdoor activities acceptable",
            status: "caution",
          },
          {
            icon: FaMask,
            text: "Mask optional for sensitive groups",
            status: "caution",
          },
          { icon: FaWindowClose, text: "Ventilation is fine", status: "safe" },
          {
            icon: FaLeaf,
            text: "Reduce prolonged exertion",
            status: "caution",
          },
        ],
      };
    } else if (aqi <= 150) {
      return {
        level: "Unhealthy for Sensitive Groups",
        activities: [
          {
            icon: FaRunning,
            text: "Limit outdoor activities",
            status: "warning",
          },
          {
            icon: FaMask,
            text: "Mask recommended for sensitive groups",
            status: "warning",
          },
          {
            icon: FaWindowClose,
            text: "Close windows during peak hours",
            status: "warning",
          },
          {
            icon: FaLeaf,
            text: "Stay indoors if you feel symptoms",
            status: "warning",
          },
        ],
      };
    } else if (aqi <= 200) {
      return {
        level: "Unhealthy",
        activities: [
          { icon: FaRunning, text: "Avoid outdoor exercise", status: "danger" },
          { icon: FaMask, text: "Wear mask outdoors", status: "danger" },
          {
            icon: FaWindowClose,
            text: "Keep windows closed",
            status: "danger",
          },
          { icon: FaLeaf, text: "Use air purifiers indoors", status: "danger" },
        ],
      };
    } else {
      return {
        level: "Very Unhealthy / Hazardous",
        activities: [
          {
            icon: FaRunning,
            text: "Stay indoors completely",
            status: "danger",
          },
          {
            icon: FaMask,
            text: "Wear N95 mask if going out",
            status: "danger",
          },
          {
            icon: FaWindowClose,
            text: "Seal windows and doors",
            status: "danger",
          },
          {
            icon: FaLeaf,
            text: "Run air purifiers continuously",
            status: "danger",
          },
        ],
      };
    }
  };

  const recommendations = getRecommendations(aqi);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "text-emerald-400";
      case "caution":
        return "text-yellow-400";
      case "warning":
        return "text-orange-400";
      case "danger":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "safe":
        return "bg-emerald-500/10";
      case "caution":
        return "bg-yellow-500/10";
      case "warning":
        return "bg-orange-500/10";
      case "danger":
        return "bg-red-500/10";
      default:
        return "bg-gray-500/10";
    }
  };

  return (
    <div
      className=" rounded-xl
     border border-gray-700/50 p-6 bg-balck/55  "
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-teal-500/10 rounded-lg flex items-start justify-start">
          <MdOutlineWarning className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Health Recommendations
          </h3>
          <p className="text-sm text-gray-400">{recommendations.level}</p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg ${getStatusBg(activity.status)} border border-gray-700/30`}
            >
              <Icon
                className={`${getStatusColor(activity.status)} shrink-0 mt-0.5`}
                size={20}
              />
              <span className="text-gray-300 text-sm leading-relaxed">
                {activity.text}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <p className="text-xs text-gray-500">
          Personalized recommendations based on current air quality levels
        </p>
      </div>
    </div>
  );
};

export default AQIRecommendation;
