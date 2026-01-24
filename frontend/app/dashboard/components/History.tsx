import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { FaChartLine, FaTimes } from "react-icons/fa";
import { TrackedLocation } from "@/types/aqi";
import {
  getAQIColor,
  getAQIStatus,
  getAQITextColor,
} from "@/lib/utils/cardRelated";

export const HistoryModal = ({
  location,
  onClose,
}: {
  location: TrackedLocation;
  onClose: () => void;
}) => {
  // Prepare data for the chart
  const chartData = location.aqiHistory.map((item) => ({
    date: new Date(item.stime).toLocaleDateString(),
    time: new Date(item.stime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    aqi: parseInt(item.aqi),
    fullDate: new Date(item.stime).toLocaleString(),
  }));

  // Get average AQI
  const avgAQI =
    chartData.reduce((sum, item) => sum + item.aqi, 0) / chartData.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <FaChartLine className="text-blue-400" />
              {location.name} - AQI History
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {location.aqiHistory.length} total readings
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Current AQI</p>
              <p className="text-3xl font-bold">
                {location.aqiHistory[location.aqiHistory.length - 1]?.aqi || 0}
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Average AQI</p>
              <p className="text-3xl font-bold">{avgAQI.toFixed(0)}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Highest AQI</p>
              <p className="text-3xl font-bold">
                {Math.max(...chartData.map((d) => d.aqi))}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              AQI Trend Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="aqi"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorAqi)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* History Table */}
          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Detailed History
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Date & Time
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      AQI
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...location.aqiHistory].reverse().map((item, index) => {
                    const aqiValue = parseInt(item.aqi);
                    return (
                      <tr
                        key={index}
                        className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
                      >
                        <td className="py-3 px-4 text-gray-300">
                          {new Date(item.stime).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-2xl font-bold text-white">
                            {item.aqi}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-2 ${getAQITextColor(aqiValue)}`}
                          >
                            <div
                              className={`w-3 h-3 rounded-full ${getAQIColor(aqiValue)}`}
                            ></div>
                            {getAQIStatus(aqiValue)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
