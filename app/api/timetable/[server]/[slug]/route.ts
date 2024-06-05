"use server";

interface Item {
  id: string;
  station: { name: string };
  scheduled_arrival: string;
  scheduled_departure: string;
  arrived_station: string;
  passed_station: string;
  stop_type: string;
  terminal: string;
  track: string;
}

async function fetchStationData(server: string, trainNumber: string) {
  const timetableApiUrl = `https://simrail-edr.de/api/trainTimeTable/train/${server}/${trainNumber}`;

  const timetableResponse = await fetch(timetableApiUrl, { next: { revalidate: 0 } });

  const timetable = await timetableResponse.json();

  const timetableData = timetable.data;

  const processedData = timetableData.map((item: Item) => {
    return {
      id: item.id,
      name: item.station?.name,
      scheduled_departure: item.scheduled_departure,
      scheduled_arrival: item.scheduled_arrival,
      arrived_station: item.arrived_station,
      passed_station: item.passed_station,
      stop_type: item.stop_type,
      terminal: item.terminal,
      track: item.track,
    };
  });

  return processedData;
}

export async function GET(request: Request, { params }: { params: { server: string; slug: string } }) {
  const server = params.server;
  const trainNumber = params.slug;
  const data = await fetchStationData(server, trainNumber);

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
