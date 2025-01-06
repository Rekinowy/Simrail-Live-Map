"use client";

import { ServerCounterProps } from "@/lib/types/types";

import { GiLever } from "react-icons/gi";
import { TbTrain } from "react-icons/tb";
import Spinner from "../UI/Spinner";

const ServerCounter = ({
  serverCode,
  totalTrains,
  userTrainsCount,
  totalStations,
  userStationsCount,
  currentTime,
  currentDate,
}: ServerCounterProps) => {
  const formatTime = (time: string) => {
    const [hours, minutes, seconds] = time.split(":");
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-sm leading-4 ">
          {hours}:{minutes}
          <span className="opacity-60">:{seconds}</span>
        </div>
        <div className="text-[10px] leading-3 tracking-wider opacity-70">{currentDate}</div>
      </div>
    );
  };

  return (
    <div className="absolute bottom-5 md:bottom-4 left-3 z-[1200] min-w-[126px] flex flex-col gap-0.5 md:gap-1 items-center px-2 py-1 text-slate-700/90 dark:text-light_gray/90 bg-light_primary/80 dark:bg-primary/80 shadow-xl border-1 border-slate-400 dark:border-slate-800 rounded-lg ">
      <div className="absolute w-full h-full top-0 left-0 backdrop-blur-md rounded-lg -z-10" />
      <div className="flex items-center justify-between gap-3 w-full h-8">
        <div className="flex w-1/2 items-center justify-between h-full">
          <div className="font-medium text-center text-lg leading-[1.3rem]">{serverCode.toUpperCase()}</div>
          <div className="border-l h-5/6 dark:border-light_primary/40 border-primary/40" />
        </div>
        {currentTime ? (
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
