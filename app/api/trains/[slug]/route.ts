// app/api/trainz/[slug]/route.ts
"use server";

interface Train {
  id: string;
  TrainName: string;
  TrainNoLocal: string;
  StartStation: string;
  EndStation: string;
  Vehicles: string[];
  TrainData: {
    Latititute: number;
    Longitute: number;
    Velocity: number;
    SignalInFront: string;
    SignalInFrontSpeed: number;
    DistanceToSignalInFront: number;
    VDDelayedTimetableIndex: number;
    ControlledBySteamID: string;
  };
  Type: string;
}

const userCache: { [key: string]: any } = {};

async function fetchUserData(steamID: string) {
  if (userCache[steamID]) {
    return userCache[steamID];
  }

  try {
    const userApiUrl = `https://simrail-edr.emeraldnetwork.xyz/steam/${steamID}`;
    const response = await fetch(userApiUrl);
    const steamUser = await response.json();

    if (steamUser) {
      userCache[steamID] = steamUser;
      return steamUser;
    }
  } catch (error) {
    console.error(`Błąd podczas pobierania danych użytkownika ${steamID} do API Stations z API Steam:`, error);
  }
  return null;
}

async function fetchTrainData(slug: string) {
  const trainsApiUrl = `https://panel.simrail.eu:8084/trains-open?serverCode=${slug}`;

  const trainResponse = await fetch(trainsApiUrl, { next: { revalidate: 0 } });
  const trains = await trainResponse.json();
  const trainsData = trains.data;

  const vehicleDLC = ["ET22", "406R", "441V"];

  const processedData = await Promise.all(
    trainsData.map(async (train: Train) => {
      let userData = {
        type: train?.Type,
        id: train?.TrainData.ControlledBySteamID,
        name: null,
        avatar: null,
        profileUrl: null,
      };

      const isDLC = train.Vehicles.some((vehicle) =>
        vehicleDLC.some((keyword) => vehicle.toLowerCase().includes(keyword.toLowerCase()))
      );

      if (train.Type === "user" && userData.id) {
        const steamUser = await fetchUserData(userData.id);
        if (steamUser) {
          userData.name = steamUser.personaname;
          userData.avatar = steamUser.avatar;
          userData.profileUrl = steamUser.profileurl;
        }
      }

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
        lat: train.TrainData?.Latititute,
        lng: train.TrainData?.Longitute,
        velocity: train.TrainData?.Velocity,
        signal: train.TrainData?.SignalInFront,
        signal_speed: train.TrainData?.SignalInFrontSpeed,
        signal_distance: train.TrainData?.DistanceToSignalInFront,
        timetable_index: train.TrainData?.VDDelayedTimetableIndex,
        user: userData,
        isDLC: isDLC,
      };
    })
  );

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
