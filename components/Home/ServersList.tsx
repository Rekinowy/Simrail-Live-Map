"use client";

import Spinner from "../ui/Spinner";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import useSWR from "swr";
import { motion } from "framer-motion";
import { PiTrafficSignalThin } from "react-icons/pi";

type ServerDataType = {
  id: string;
  ServerCode: string;
  ServerRegion: string;
  IsActive: boolean;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ServersList = () => {
  const { t } = useTranslation();

  const servers = useSWR("https://panel.simrail.eu:8084/servers-open", fetcher, { refreshInterval: 5000 });

  return (
    <section
      className={`${
        servers.data?.data
          ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full lg:mb-4 gap-4 md:gap-6"
          : "flex w-full items-center justify-center"
      } p-4 min-h-[50%] max-w-screen-lg rounded-xl border border-light_primary/50 dark:border-primary shadow-lg bg-light_primary/30 dark:bg-primary/50 cursor-default backdrop-blur-sm overflow-y-auto scrollbar-hide`}
    >
      {servers.data?.data ? (
        servers.data.data.map(({ id, ServerCode, ServerRegion, IsActive }: ServerDataType, index: number) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.02 * index }}
          >
            <Link
              key={id}
              href={`/server/${ServerCode}`}
              className={`flex sm:h-28 px-2 py-3 items-center bg-gradient-to-tr from-light_primary_dark/70 to-light_primary/90 dark:from-primary/90 dark:to-primary_dark/80 hover:bg-light_primary_light dark:hover:bg-primary_dark text-primary dark:text-slate-200 hover:text-primary_dark dark:hover:text-white text-lg border rounded-xl border-slate-400 hover:border-slate-600 dark:border-slate-800 dark:hover:border-slate-900 hover:scale-[1.01] transition duration-100`}
            >
              <div className="relative p-1 sm:p-2">
                <PiTrafficSignalThin className="relative w-8 sm:w-10 h-8 sm:h-10 text-primary dark:text-slate-200" />
                <div
                  className={`absolute w-2 sm:w-2.5 h-2 sm:h-2.5 left-4 sm:left-[23px] rounded-full shadow-[0_0px_10px_3px_rgba(0,0,0,0.2)] ${
                    IsActive
                      ? "top-[11.5px] sm:top-[17.5px] bg-green-600 shadow-green-600"
                      : "top-[21px] sm:top-[29px] bg-red-600 shadow-red-600"
                  }`}
                />
              </div>

              <div className="flex-col flex-grow text-center uppercase">
                <p className="text-lg font-medium sm:text-2xl mb-1">{ServerCode}</p>
                <p className="text-xs md:text-base">{ServerRegion.replace(/_/g, " ")}</p>
              </div>
            </Link>
          </motion.div>
        ))
      ) : (
        <Spinner />
      )}
    </section>
  );
};
export default ServersList;
