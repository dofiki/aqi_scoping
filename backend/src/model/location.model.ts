import mongoose, { Schema } from "mongoose";

// for ts
interface AQIData{
  uid: number;
  aqi: string;
  stime: string;
  vtime: number;
  stationName: string;
  geo: [number, number];
  country: string;
}

interface LocationDoc extends Document{
    name: String,
    aqiHistory: AQIData []
}

// schema for each aqi which will be stored in aqiHistory 
const aqiDataSchema = new Schema<AQIData>({
  uid: {
    type: Number,
    required: true,
  },
  aqi: {
    type: String,
    required: true,
  },
  stime: {
    type: String,
    required: true,
  },
  vtime: {
    type: Number,
    required: true,
  },
  stationName: {
    type: String,
    required: true,
  },
  geo: {
    type: [Number],
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

// schema for location name and their aqi history
const locationSchema = new Schema<LocationDoc>({
  name: {
    type: String,
    required: true,
    unique: true, // ?
  },
  aqiHistory: {
    type: [aqiDataSchema],
    default: [],
  },
});

export const Location = mongoose.model<LocationDoc>("Location", locationSchema)