"use server";

async function fetchStationData(slug: string) {
  const getTimeApiUrl = `https://api1.aws.simrail.eu:8082/api/getTime?serverCode=${slug}`;

  const stationsResponse = await fetch(getTimeApiUrl, { next: { revalidate: 0 } });

  const serverTime = await stationsResponse.json();

  return serverTime;
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
