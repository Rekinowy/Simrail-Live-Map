"use client";

import { ServerCounterProps } from "@/lib/types/types";

import useSWR from "swr";

import { GiLever } from "react-icons/gi";
import { TbTrain } from "react-icons/tb";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ServerCounter = ({
  serverCode,
  totalTrains,
  userTrainsCount,
  totalStations,
  userStationsCount,
}: ServerCounterProps) => {
  const TIME_API_URL = `/api/time/${serverCode}`;
  // const serverTime = 0;
  const serverTime = useSWR(TIME_API_URL, fetcher, {
    refreshInterval: 0,
  });

  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  // const [showColon, setShowColon] = useState<boolean>(true);

  useEffect(() => {
    if (serverTime.data) {
      const serverDate = new Date(serverTime.data);
      serverDate.setHours(serverDate.getHours() - 1);
      setCurrentTime(serverDate.toLocaleTimeString());
      setCurrentDate(serverDate.toLocaleDateString());

      const interval = setInterval(() => {
        serverDate.setSeconds(serverDate.getSeconds() + 1);
        // setShowColon((prev) => !prev);
        setCurrentTime(serverDate.toLocaleTimeString());
        setCurrentDate(serverDate.toLocaleDateString());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [serverTime.data]);

  const formatTime = (time: string) => {
    const [hours, minutes, seconds] = time.split(":");
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-sm leading-4 ">
          {hours}
          {/* {showColon ? ":" : " "} */}:{minutes}
          <span className="opacity-60">
            {/* {showColon ? ":" : " "} */}:{seconds}
          </span>
        </div>
        <div className="text-[10px] leading-3 tracking-wider opacity-70">{currentDate}</div>
      </div>
    );
  };

  return (
    <div className="absolute bottom-5 md:bottom-4 left-3 z-[1200] min-w-[122px] flex flex-col gap-0.5 md:gap-1 items-center px-2 py-1 text-slate-700/90 dark:text-light_gray/90 bg-light_primary/80 dark:bg-primary/80 shadow-xl border-1 border-slate-400 dark:border-slate-800 rounded-lg ">
      <div className="flex items-center justify-between gap-3 w-full h-8">
        <div className="flex w-1/2 items-center justify-between h-full">
          <div className="font-medium text-center text-lg leading-[1.3rem]">{serverCode.toUpperCase()}</div>
          <div className="border-l h-5/6 dark:border-light_primary/40 border-primary/40" />
        </div>
        {serverTime.data ? (
          <div className="flex justify-end w-1/2 text-xs gap-1 font-medium">{formatTime(currentTime)}</div>
        ) : (
          <div className="flex justify-center w-1/2">
            <Spinner size={6} />
          </div>
        )}
      </div>
      <div className="border-t w-full dark:border-light_primary/40 border-primary/40"></div>
      <div className="flex items-center gap-2 w-full text-xs">
        <div className="flex w-1/2 items-center font-medium gap-1">
          <TbTrain className="w-3 md:w-3.5 h-3.5" />
          {userTrainsCount}/{totalTrains}
        </div>
        <div className="flex w-1/2 items-center font-medium gap-1">
          <GiLever className="w-3 md:w-3.5 h-3.5" />
          {userStationsCount}/{totalStations}
        </div>
      </div>
    </div>
  );
};
export default ServerCounter;
