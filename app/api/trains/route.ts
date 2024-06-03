"use server";

interface Train {
  id: string;
  TrainName: string;
  TrainNoLocal: string;
  StartStation: string;
  EndStation: string;
  Vehicles: string;
  TrainData: {
    Latititute: number;
    Longitute: number;
    Velocity: number;
    ControlledBySteamID: string;
  };
  Type: string;
}

let cachedData: any[] = [];

async function fetchTrainData() {
  const trainsApiUrl = "https://panel.simrail.eu:8084/trains-open?serverCode=pl2";

  const trainResponse = await fetch(trainsApiUrl);
  const trains = await trainResponse.json();

  const trainsData = trains.data;

  const processedData = trainsData.map((train: Train) => ({
    id: train.id,
    name: train.TrainName,
    number: train.TrainNoLocal,
    departure: train.StartStation,
    destination: train.EndStation,
    vehicles: train.Vehicles,
    lat: train.TrainData.Latititute,
    lng: train.TrainData.Longitute,
    velocity: train.TrainData.Velocity,
    user: { type: train.Type, id: train.TrainData.ControlledBySteamID },
  }));

  cachedData = processedData;
}

// setInterval(fetchTrainData, 1000);

fetchTrainData();

export async function GET() {
  return new Response(JSON.stringify(cachedData), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
