import React from "react";
import { MdEmail, MdNotifications } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { emailFeature, locationData } from "./data/emailData";

const EmailNotificationPreview = () => {
  return (
    <section className="py-16" id="weekly-reports">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 rounded-full 
            border border-teal-500/20"
          >
            <MdNotifications className="text-teal-400" />
            <span className="text-teal-400 text-sm font-medium">
              Weekly Insights
            </span>
          </div>

          <h2 className="text-2xl md:text-5xl font-bold text-white">
            Weekly AQI Email Reports
          </h2>

          <p className="text-xl text-gray-400 leading-relaxed">
            Get a concise weekly overview of air quality trends for your tracked
            locations, delivered straight to your inbox.
          </p>

          <div className="space-y-4">
            {emailFeature.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-gray-800/30 rounded-xl border
                  border-gray-700/30 hover:border-gray-600/50 transition-all"
                >
                  <div className="p-2 bg-teal-500/10 rounded-lg shrink-0">
                    <Icon className="text-teal-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div
            className="relative bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl 
            border border-gray-700/50 overflow-hidden shadow-2xl"
          >
            <div className="bg-black/40 to-hover p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <MdEmail className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-white font-semibold">AQI Weekly Report</p>
                  <p className="text-teal-100 text-xs">aqiscoping@gmail.com</p>
                </div>
              </div>
              <h3 className="text-white text-xl font-bold mt-4">
                Weekly Air Quality Summary
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-300 text-sm">
                Here&apos;s your weekly air quality overview for the locations
                you track:
              </p>

              <div className="space-y-6">
                {locationData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border
                    border-gray-700/30"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg bg-${item.color}-500/20
                        flex items-center justify-center`}
                      >
                        <span className={`text-${item.color}-400 font-bold`}>
                          {item.aqi}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {item.location}
                        </p>
                        <p className={`text-${item.color}-400 text-xs`}>
                          {item.status}
                        </p>
                      </div>
                    </div>
                    <FiCheckCircle className="text-emerald-400" size={20} />
                  </div>
                ))}
              </div>

              <p className="text-gray-500 text-xs text-center">
                You&apos;re receiving this weekly report because you&apos;re
                tracking these locations
              </p>
            </div>
          </div>

          <div
            className="absolute -top-4 -right-4 px-4 py-2
            text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-2xl
            border border-teal-500/20"
          >
            <span className="text-teal-400 text-sm font-medium">
              Weekly Report
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailNotificationPreview;
