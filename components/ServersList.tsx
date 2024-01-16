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
    { refreshInterval: 5000 }
  );

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 w-full gap-4 md:gap-6 p-4 max-w-screen-xl rounded-xl border border-primary shadow-lg bg-primary/30 cursor-default backdrop-blur-sm">
      {servers.data?.data ? (
        servers.data.data.map(
          ({ id, ServerCode, ServerRegion, IsActive }: ServerDataType) => (
            <Link
              key={id}
              href={`/server/${ServerCode}`}
              className={`flex md:h-28 px-2 py-3 items-center bg-primary/80 text-white text-lg border hover:bg-primary rounded-xl border-slate-800`}
            >
              <div
                className={`w-5 h-5 mx-2 rounded-full border border-slate-600 ${
                  IsActive ? "bg-green-700" : "bg-red-700"
                }`}
              ></div>

              <div className="flex-col flex-grow text-center uppercase">
                <p className="text-lg font-medium  md:text-2xl mb-1">
                  {ServerCode}
                </p>
                <p className="text-xs md:text-base">
                  {ServerRegion.replace(/_/g, " ")}
                </p>
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
