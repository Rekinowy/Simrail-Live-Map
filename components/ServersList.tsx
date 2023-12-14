"use client";

import Link from "next/link";
import useSWR from "swr";

type ServerDataType = {
  id: string;
  ServerCode: string;
  ServerName: string;
  ServerRegion: string;
  IsActive: boolean;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ServersList = () => {
  const servers = useSWR(
    "https://panel.simrail.eu:8084/servers-open",
    fetcher,
    { refreshInterval: 10000 }
  );

  return (
    <section className="grid grid-cols-2 w-full gap-3 max-w-screen-lg">
      {servers.data?.data ? (
        servers.data.data.map(
          ({
            id,
            ServerCode,
            ServerName,
            ServerRegion,
            IsActive,
          }: ServerDataType) => (
            <Link
              key={id}
              href={`/server/${ServerCode}`}
              className="flex w-full p-2 items-center bg-primary text-white border border-slate-800 hover:bg rounded-lg"
            >
              <div
                className={`w-5 h-5 mx-2 rounded-full border border-slate-800 ${
                  IsActive ? "bg-green-700" : "bg-red-700"
                }`}
              ></div>
              <div className="flex-grow text-center uppercase">
                {ServerCode} - {ServerRegion}
              </div>
            </Link>
          )
        )
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};
export default ServersList;
