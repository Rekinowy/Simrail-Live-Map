"use client";

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
      } p-4 max-w-screen-lg rounded-xl border border-light_primary/50 dark:border-primary shadow-lg bg-light_primary/30 dark:bg-primary/50 cursor-default backdrop-blur-sm overflow-y-auto scrollbar-hide`}
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
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-gray-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">{t("home:loading")}...</span>
        </div>
      )}
    </section>
  );
};
export default ServersList;
