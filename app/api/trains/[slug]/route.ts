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

interface Player {
  train_number: number;
  type: {};
}

// export const revalidate = 0;

async function fetchTrainData(slug: string) {
  const trainsApiUrl = `https://panel.simrail.eu:8084/trains-open?serverCode=${slug}`;
  const trainsUsersApiUrl = `https://simrail-edr.de/api/train/${slug}`;

  const [trainResponse, playerResponse] = await Promise.all([
    fetch(trainsApiUrl, { next: { revalidate: 1 } }),
    fetch(trainsUsersApiUrl, { next: { revalidate: 1 } }),
  ]);

  const trains = await trainResponse.json();
  const players = await playerResponse.json();

  const trainsData = trains.data;
  const playersData = players.data;

  const processedData = trainsData.map((train: Train) => {
    const player = playersData.find((player: Player) => player.train_number.toString() === train.TrainNoLocal);

    if (train.EndStation === "Tarnowskie GóryTGD C") {
      train.EndStation = "Tarnowskie Góry TGD C";
    }

    return {
      id: train.id,
      name: train.TrainName,
      number: train.TrainNoLocal,
      departure: train.StartStation,
      destination: train.EndStation,
      vehicles: train.Vehicles,
      lat: train.TrainData.Latititute,
      lng: train.TrainData.Longitute,
      velocity: train.TrainData.Velocity,
      user: {
        type: train.Type,
        id: train.TrainData.ControlledBySteamID,
        name: player && player.type === "user" ? player.steam_user?.name : null,
        avatar: player && player.type === "user" ? player.steam_user?.avatar : null,
        dispatcher_time: player && player.type === "user" ? player.steam_user?.dispatcher_time : null,
        distance: player && player.type === "user" ? player.steam_user?.distance_meter : null,
      },
      timezone_offset: player ? player.server?.timezone_offset : 0,
    };
  });

  return processedData;
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const data = await fetchTrainData(slug);

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
