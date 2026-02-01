import React from "react";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import Design from "./component/ui/Design";

const CTASection = () => {
  const router = useRouter();

  return (
    <section className="py-16">
      <div
        className="relative overflow-hidden 
     bg-hover rounded-3xl p-12 md:p-16"
      >
        <div className="hidden md:block absolute w-full left-0 top-0 ">
          <Design />
        </div>
        <div className="absolute w-full h-full bg-black/20 top-0 left-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Start Monitoring Your Air Quality Today
          </h2>

          <p className="text-xl text-teal-50 leading-relaxed">
            Air quality changes. Numbers are calculated. <br />A weekly report
            appears.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/login")}
              className="group px-8 py-4 bg-white text-teal-600 font-semibold rounded-xl
               hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl 
               flex items-center gap-2 cursor-pointer"
            >
              Get Started Free
              <FiArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </button>

            <button
              onClick={() => router.push("/#why-aqi")}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold 
              rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              Learn More
            </button>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-8
           pt-8 text-teal-50"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full" />
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full" />
              <span className="text-sm">Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full" />
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
