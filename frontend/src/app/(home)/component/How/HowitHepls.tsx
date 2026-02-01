import { FiTrendingUp } from "react-icons/fi";

import { features } from "./data/howItHelpsData";

const HowItHelps = () => {
  return (
    <section className="pt-12 pb-0 md:py-16" id="how-it-helps">
      <div className="text-center mb-12">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 
        rounded-full border border-emerald-500/20 mb-6"
        >
          <FiTrendingUp className="text-emerald-400" />
          <span className="text-emerald-400 text-sm font-medium">Features</span>
        </div>

        <h2 className="text-2xl md:text-5xl font-bold text-white mb-4">
          How AQI Scoping Helps
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Powerful tools to keep you informed and protected
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="relative group">
              <div
                className="relative bg-linear-to-br from-gray-900/90 to-gray-800/90 rounded-2xl 
              p-8 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300
               backdrop-blur-sm h-full"
              >
                <div
                  className="inline-flex p-4 rounded-2xl bg-linear-to-br from-emerald-500/20 to-teal-500/20 
                mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  <Icon className="text-emerald-400" size={32} />
                </div>

                <h3 className="text-2xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <div className="inline-flex px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <span className="text-emerald-400 text-sm font-medium">
                    {feature.stats}
                  </span>
                </div>

                {/* decorative gradient - bottom right*/}
                <div
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-linear-to-br
                 from-emerald-500/10 to-teal-500/10 rounded-full blur-2xl group-hover:w-32
                  group-hover:h-32 transition-all duration-300"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItHelps;
