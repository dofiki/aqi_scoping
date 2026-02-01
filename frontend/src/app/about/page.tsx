import { aqiInfoTableData } from "./data/aboutData";

const page = () => {
  return (
    <div className="pt-10 px-5 h-[120vh]">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-white text-md md:text-xl">
          AQI Scoping is a web app that helps you track the AQI of any place you
          want.
        </h2>

        <ul className="list-disc pl-6 mt-4 text-white text-md md:text-xl">
          <li>We collect the AQI information for your chosen city.</li>
          <li>We provide you with a weekly AQI report.</li>
          <li>
            We give different recommendations based on the current air quality
            situation.
          </li>
        </ul>

        <h2 className="text-hover text-xl mt-8">Air Quality Index (AQI)?</h2>

        <p className="mt-4 text-white text-md md:text-xl">
          The Air Quality Index (AQI) is a standardized system used by
          environmental and health agencies to help the public understand how
          polluted the air is and what that means for health. It covers common
          pollutants such as PM2.5, PM10, ozone (O₃), NO₂, SO₂, and CO, and then
          reports a single index value based on the worst-pollutant level at
          that time.
        </p>
        <h2 className="mt-4 text-md md:text-xl text-hover">
          AQI Categories, Health Messages & Actions :
        </h2>
        <div className="mt-4">
          <div className="hidden sm:flex md:flex-nowrap text-white border border-gray">
            <div className="w-full md:w-1/6 p-2 border-b md:border-b-0 md:border-r border-gray text-center font-bold">
              AQI Range
            </div>
            <div className="w-full md:w-5/12 p-2 border-b md:border-b-0 md:border-r border-gray font-bold">
              Health Message
            </div>
            <div className="w-full md:w-5/12 p-2 font-bold">
              Recommendations
            </div>
          </div>

          {aqiInfoTableData.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap md:flex-nowrap text-white border border-gray"
            >
              <div
                className={`w-full md:w-1/6 p-2 border-b md:border-b-0 md:border-r
                   border-gray text-center font-semibold ${item.color}`}
              >
                {item.range}
              </div>
              <div className="w-full md:w-5/12 p-2 border-b md:border-b-0 md:border-r border-gray">
                {item.healthMessage}
              </div>
              <div className="w-full md:w-5/12 p-2">
                {item.recommendedActions}
              </div>
            </div>
          ))}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default page;
