"use server";

interface Station {
  id: number;
  Name: string;
  Prefix: string;
  DifficultyLevel: string;
  MainImageURL: string;
  Latititude: number;
  Longitude: number;
  DispatchedBy: [{ SteamId: string }];
}

async function fetchStationData(slug: string) {
  const stationsApiUrl = `https://panel.simrail.eu:8084/stations-open?serverCode=${slug}`;

  const stationsResponse = await fetch(stationsApiUrl, { next: { revalidate: 0 } });

  const stations = await stationsResponse.json();

  const stationsData = stations.data;

  const processedData = await Promise.all(
    stationsData.map(async (station: Station) => {
      const userType = station.DispatchedBy.length ? "user" : "bot";

      let userData = {
        type: userType,
        id: userType === "user" ? station.DispatchedBy[0]?.SteamId : null,
        name: userType === null,
        avatar: userType === null,
        profileUrl: null,
        dispatcher_time: null,
        distance: null,
      };

      if (userType === "user" && userData.id) {
        try {
          const userApiUrl = `https://simrail-edr.emeraldnetwork.xyz/steam/${userData.id}`;
          const response = await fetch(userApiUrl);
          const steamUser = await response.json();

          if (steamUser) {
            userData.name = steamUser.personaname;
            userData.avatar = steamUser.avatar;
            userData.profileUrl = steamUser.profileurl;
          }
        } catch (error) {
          console.error("Błąd podczas pobierania danych z API Steam:", error);
        }
      }

      return {
        id: station.id,
        name: station.Name,
        prefix: station.Prefix,
        difficulty: station.DifficultyLevel,
        image: station.MainImageURL,
        lat: station.Latititude,
        lng: station.Longitude,
        user: userData,
      };
    })
  );

  return processedData;
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  const data = await fetchStationData(slug);

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
