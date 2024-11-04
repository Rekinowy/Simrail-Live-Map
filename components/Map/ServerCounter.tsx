"use client";

import { ServerCounterProps } from "@/lib/types/types";

import useSWR from "swr";

import { GiLever } from "react-icons/gi";
import { TbTrain } from "react-icons/tb";
import { fetcher } from "@/lib/utils/utils";
import { useEffect, useState } from "react";
import { IoMdTime } from "react-icons/io";

const ServerCounter = ({
  serverCode,
  totalTrains,
  userTrainsCount,
  totalStations,
  userStationsCount,
}: ServerCounterProps) => {
  const TIME_API_URL = `/api/time/${serverCode}`;
  const serverTime = useSWR(TIME_API_URL, fetcher, {
    refreshInterval: 0,
  });

  const [currentTime, setCurrentTime] = useState<string>("Loading...");
  const [showColon, setShowColon] = useState<boolean>(true);

  useEffect(() => {
    if (serverTime.data) {
      const initialTime = new Date(serverTime.data);
      initialTime.setHours(initialTime.getHours() - 1);
      setCurrentTime(initialTime.toLocaleTimeString());

      const interval = setInterval(() => {
        initialTime.setSeconds(initialTime.getSeconds() + 1);
        setShowColon((prev) => !prev);
        setCurrentTime(initialTime.toLocaleTimeString());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [serverTime.data]);

  const formatTime = (time: string) => {
    const [hours, minutes, seconds] = time.split(":");
    return (
      <>
        <span>
          {hours}
          {showColon ? ":" : " "}
          {minutes}
        </span>
        {/* <span className="opacity-70">:{seconds}</span> */}
      </>
    );
  };

  return (
    <div className="absolute bottom-5 md:bottom-4 left-3 z-[1200] h-12 md:h-12 flex gap-2 items-center p-2 text-slate-700/90 dark:text-light_gray/90 bg-light_primary/80 dark:bg-primary/80 shadow-xl border-1 border-slate-400 dark:border-slate-800 rounded-lg ">
      <div className="py-2">
        <div className="font-medium text-center leading-[1.3rem]">{serverCode.toUpperCase()}</div>
        <div className="flex text-xs gap-1">
          {/* <IoMdTime className="w-3 h-4" /> */}
          {formatTime(currentTime)}
        </div>
      </div>
      <div className="border-l-2 w-fit h-full dark:border-light_primary/40 border-primary/40 " />
      <div className="text-xs md:text-sm">
        <div className="flex items-center font-medium gap-2">
          <TbTrain className="w-3 md:w-4 h-3 md:h-4" />
          {userTrainsCount}/{totalTrains}
        </div>
        <div className="flex items-center font-medium gap-2">
          <GiLever className="w-3 md:w-4 h-3 md:h-4" />
          {userStationsCount}/{totalStations}
        </div>
      </div>
    </div>
  );
};
export default ServerCounter;
