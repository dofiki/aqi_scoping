import { reasons } from "./data/whyAqiData";

const WhyAQIMatters = () => {
  return (
    <section className="pt-12 pb-0 md:py-16" id="why-aqi">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-5xl font-bold text-white mb-4">
          Why AQI Matters
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Understanding air quality is the first step toward healthier living
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <div
              key={index}
              className="group relative bg-linear-to-tl from-gray-900/90 to-gray-800/90 
              rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all
               duration-300 backdrop-blur-sm overflow-hidden"
            >
              {/* Gradient Overlay on Hover */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${reason.gradient} opacity-0 
                group-hover:opacity-15 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div
                  className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${reason.gradient} mb-6`}
                >
                  <Icon className="text-white" size={32} />
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">
                  {reason.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {reason.description}
                </p>
              </div>

              {/* Decorative Element */}
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-linear-to-br
               from-emerald-500/5 to-teal-500/5 rounded-full blur-2xl"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyAQIMatters;
