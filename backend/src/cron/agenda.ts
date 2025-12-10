import { Agenda } from "@hokify/agenda";
import { User } from "../model/user.model";
import { LocationDoc } from "../model/location.model";
import {
  aqiSearchService,
  updateAqiRecordService,
} from "../services/aqi.service";

const DB_CONN_STRING = process.env.DB_CONN_STRING as string;

const agenda = new Agenda({
  db: { address: DB_CONN_STRING, collection: "customjobs" },
});

// define job
agenda.define("update AQI", async (job) => {
  console.log("log: nothing occurred yet");
  const users = await User.find({})
    .populate<{ trackedLocation: LocationDoc[] }>("trackedLocation")
    .exec();
  // loop through users and find trackedLocation
  for (const eachUser of users) {
    const eachUserTrackedLocations = eachUser.trackedLocation;
    //now we have tracked locations of each user
    // this also has multiple location object
    // so we loop through it and call aqiSearchService in each location
    for (const location of eachUserTrackedLocations) {
      try {
        // we call the service on each location inside eachTrackedUserLocation
        const newAqiResult = await aqiSearchService(location.name);
        // -we have newAqiResult with AQIStructure
        // -we also have access to each location object
        // -now we can push newAqiResult to the location object
        // we call updateAqiRecordService on each location
        await updateAqiRecordService(location._id.toString(), newAqiResult);
        console.log(`Updated AQI for ${location.name}`);
      } catch (err) {
        console.error(`Failed to update AQI for ${location.name}:`, err);
      }
    }
  }
});

// Immediately Invoked Function Expression
(async function () {
  await agenda.start();

  // 06:00, 14:00, 22:00
  const cronTimes = ["0 6 * * *", "0 14 * * *", "0 22 * * *"];

  for (const time of cronTimes) {
    const existingJobs = await agenda.jobs({
      name: "update AQI",
      repeatInterval: time,
    });
    if (existingJobs.length === 0) {
      await agenda.every(time, "update AQI");
    }
  }
})();
