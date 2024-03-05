"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const servers = useSWR(
    "https://panel.simrail.eu:8084/servers-open",
    fetcher,
    { refreshInterval: 2000 }
  );

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full gap-4 md:gap-6 p-4 max-w-screen-lg rounded-xl border border-primary shadow-lg bg-primary/50 cursor-default backdrop-blur-sm overflow-y-auto scrollbar-hide">
      {servers.data?.data ? (
        servers.data.data.map(
          ({ id, ServerCode, ServerRegion, IsActive }: ServerDataType) => (
            <Link
              key={id}
              href={`/server/${ServerCode}`}
              className={`flex sm:h-28 px-2 py-3 items-center bg-gradient-to-tr from-primary/90 to-primary_dark/80 hover:bg-primary_dark text-white text-lg border rounded-xl border-slate-800 hover:border-slate-900 transition-all`}
            >
              <div
                className={`w-5 h-5 mx-2 rounded-full border border-slate-600 ${
                  IsActive ? "bg-green-700" : "bg-red-700"
                }`}
              ></div>

              <div className="flex-col flex-grow text-center uppercase">
                <p className="text-lg font-medium sm:text-2xl mb-1">
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
        <p className="text-xl text-white">{t("home:loading")}...</p>
      )}
    </section>
  );
};
export default ServersList;
