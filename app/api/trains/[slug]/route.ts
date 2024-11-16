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
    SignalInFront: string;
    SignalInFrontSpeed: number;
    DistanceToSignalInFront: number;
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
    fetch(trainsApiUrl, { next: { revalidate: 0 } }),
    fetch(trainsUsersApiUrl, { next: { revalidate: 0 } }),
  ]);

  const trains = await trainResponse.json();
  const players = await playerResponse.json();

  const trainsData = trains.data;
  const playersData = players.data;

  const processedData = await Promise.all(
    trainsData.map(async (train: Train) => {
      const player = playersData.find((player: Player) => player?.train_number?.toString() === train.TrainNoLocal);
      const steamID = "0";

      let userData = {
        type: train?.Type,
        id: train?.TrainData.ControlledBySteamID,
        name: player?.steam_user?.name,
        score: player?.steam_user?.score || null,
        avatar: player?.steam_user?.avatar,
        profileUrl: player?.steam_user?.profile_link,
        dispatcher_time: player?.steam_user?.dispatcher_time || null,
        distance: player?.steam_user?.distance_meter || null,
      };

      if (train.Type === "user" && (!player || steamID !== train?.TrainData?.ControlledBySteamID)) {
        try {
          const userApiUrl = `https://simrail-edr.emeraldnetwork.xyz/steam/${train?.TrainData?.ControlledBySteamID}`;
          const response = await fetch(userApiUrl);
          const steamUser = await response.json();

          if (steamUser) {
            userData.name = steamUser.personaname;
            userData.avatar = steamUser.avatar;
            userData.profileUrl = steamUser.profileurl;
          }
        } catch (error) {
          console.error(
            `Błąd podczas pobierania danych użytkownika ${train?.TrainData?.ControlledBySteamID} do API Stations z API Steam:`,
            error
          );
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
        user: userData,
        timezone_offset: player ? player.server?.timezone_offset : 0,
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
