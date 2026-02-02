import { aqiInfoTableData } from "./data/aboutData";

const page = () => {
  return (
    <div className="flex justify-center pt-20 px-5">
      <div className="min-h-screen ">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-white text-md md:text-xl leading-relaxed pt-5">
            AQI Scoping is a web app that helps you track the AQI of any place
            you want.
          </h2>

          <ul className="list-disc pl-6 mt-6 text-white text-md md:text-xl space-y-2">
            <li>We collect the AQI information for your chosen city.</li>
            <li>We provide you with a weekly AQI report.</li>
            <li>
              We give different recommendations based on the current air quality
              situation.
            </li>
          </ul>

          <div className="mt-12 pt-8 ">
            <h2 className="text-hover text-xl">Air Quality Index (AQI)?</h2>

            <p className="mt-4 text-white text-md md:text-xl leading-relaxed">
              The Air Quality Index (AQI) is a standardized system used by
              environmental and health agencies to help the public understand
              how polluted the air is and what that means for health. It covers
              common pollutants such as PM2.5, PM10, ozone (O₃), NO₂, SO₂, and
              CO, and then reports a single index value based on the
              worst-pollutant level at that time.
            </p>
          </div>

          <div className="mt-12 pt-8">
            <h2 className="text-md md:text-xl text-hover mb-6">
              AQI Categories, Health Messages & Actions:
            </h2>

            <div className="border border-white/20 rounded-lg overflow-hidden">
              <div className="hidden sm:flex md:flex-nowrap text-white bg-gray-800/30">
                <div className="w-full md:w-1/6 p-3 border-r border-white/20 text-center font-bold">
                  AQI Range
                </div>
                <div className="w-full md:w-5/12 p-3 border-r border-white/20 font-bold">
                  Health Message
                </div>
                <div className="w-full md:w-5/12 p-3 font-bold">
                  Recommendations
                </div>
              </div>

              {aqiInfoTableData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-wrap md:flex-nowrap text-white border-t
                 border-white/20 transition-colors"
                >
                  <div
                    className={`w-full md:w-1/6 p-3 border-b md:border-b-0 md:border-r
                     border-white/20 text-center font-semibold ${item.color}`}
                  >
                    {item.range}
                  </div>
                  <div className="w-full md:w-5/12 p-3 border-b md:border-b-0 md:border-r border-white/20 leading-relaxed">
                    {item.healthMessage}
                  </div>
                  <div className="w-full md:w-5/12 p-3 leading-relaxed">
                    {item.recommendedActions}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full h-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
