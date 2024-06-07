"use server";

interface Station {
  id: number;
  name: string;
  prefix: string;
  difficulty_level: string;
  main_image_url: string;
  latitude: number;
  longitude: number;
  dispatched_by: [{ steam_user: { name: string; avatar: string; dispatcher_time: number; distance_meter: number } }];
}

async function fetchStationData(slug: string) {
  const stationsApiUrl = `https://simrail-edr.de/api/stations/${slug}`;

  const stationsResponse = await fetch(stationsApiUrl, { next: { revalidate: 0 } });

  const stations = await stationsResponse.json();

  const stationsData = stations.data;

  const processedData = stationsData.map((station: Station) => {
    const userType = station.dispatched_by.length ? "user" : "bot";

    return {
      id: station.id,
      name: station.name,
      prefix: station.prefix,
      difficulty: station.difficulty_level,
      image: station.main_image_url,
      lat: station.latitude,
      lng: station.longitude,
      user: {
        type: userType,
        name: userType === "user" ? station.dispatched_by[0]?.steam_user?.name : null,
        avatar: userType === "user" ? station.dispatched_by[0]?.steam_user?.avatar : null,
        dispatcher_time: userType === "user" ? station.dispatched_by[0]?.steam_user?.dispatcher_time : null,
        distance: userType === "user" ? station.dispatched_by[0]?.steam_user?.distance_meter : null,
      },
    };
  });

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
