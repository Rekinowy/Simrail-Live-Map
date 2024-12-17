"use client";

import { calculateDistanceIn5Seconds } from "@/lib/utils/utils";
import { useState } from "react";
import { GiCoalWagon } from "react-icons/gi";
import { PiArrowsHorizontalBold, PiTrafficSignal } from "react-icons/pi";
import { TbWeight } from "react-icons/tb";
import { TiArrowSortedDown } from "react-icons/ti";

type TrainInfoLiteProps = {
  signal: string | null;
  showSignalInfo: boolean;
  wagons: { list: Array<{ name: string; count: number }>; counter: number };
  signalSpeed: number;
  signalDistance: number;
  speed: number;
  totalLength: number;
  totalWeight: number;
};

const TrainInfoLite = ({
  signal,
  showSignalInfo,
  signalSpeed,
  signalDistance,
  speed,
  wagons,
  totalLength,
  totalWeight,
}: TrainInfoLiteProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const wagonsList = wagons.list;

  let signalName = "";
  if (typeof signal === "string") {
    signalName = signal.split("@")[0];
  }
  const displaySignalSpeed = signalSpeed === 32767 ? "Vmax" : `${signalSpeed} km/h`;

  const toggleList = () => {
    setIsExpanded(!isExpanded);
  };

  const fixedSignalDistance = signalDistance - calculateDistanceIn5Seconds(speed);

  const displaySignalDistance =
    fixedSignalDistance < 0
      ? "0 m"
      : fixedSignalDistance < 1000
      ? `${Math.round(fixedSignalDistance)} m`
      : `${(fixedSignalDistance / 1000).toFixed(2)} km`;

  const signalStyle =
    signalSpeed === 0
      ? "top-[11.5px] bg-red-600 shadow-red-600"
      : signalSpeed === 32767
      ? "top-[4.5px] bg-green-600 shadow-green-600"
      : "top-[11.5px] bg-yellow-600 shadow-yellow-600";

  return (
    <div className="grid gap-1 mx-1">
      <div className="flex items-center">
        {totalLength > 0 && totalWeight > 0 && (
          <div className="flex flex-col w-1/2 px-1 gap-1 text-xs dark:font-light">
            <div className="flex items-center gap-3">
              <PiArrowsHorizontalBold className="w-4 h-3 text-primary_dark dark:text-light_gray" />
              <p>{totalLength} m</p>
            </div>
            <div className="flex items-center gap-3">
              <TbWeight className="w-4 h-3 text-primary_dark dark:text-light_gray" />
              <p>{totalWeight} t</p>
            </div>
          </div>
        )}
        {signal && showSignalInfo && (
          <div className="flex flex-col px-1 gap-2 w-1/2">
            <div className="flex items-center gap-4">
              <div className="relative flex flex-col w-5 items-center gap-0.5">
                <PiTrafficSignal className="relative w-5 h-5 text-primary_dark dark:text-light_gray" />
                <div
                  className={`absolute w-1 h-1 rounded-full shadow-[0_0px_10px_3px_rgba(0,0,0,0.2)]  ${signalStyle}`}
                ></div>
                <p className="font-semibold text-[6px] leading-[7px] text-primary_dark dark:text-light_gray">
                  {signalName}
                </p>
              </div>
              <div className="">
                <p className="text-xs font-medium dark:font-normal">{displaySignalSpeed}</p>
                <p className="text-[9px]">({displaySignalDistance})</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {wagonsList.length > 0 && (
        <div className="flex gap-3 px-1 text-xs">
          <div>
            <GiCoalWagon className="w-4 h-3 mt-[3.5px] text-primary_dark dark:text-light_gray" />
          </div>
          {wagonsList.length > 1 ? (
            <div className="flex flex-col w-full gap-2">
              <button onClick={toggleList} className="flex items-center justify-between">
                <p className="leading-5 dark:font-light">&times; {wagons.counter}</p>
                <TiArrowSortedDown
                  className={`w-4 h-4 text-primary_dark dark:text-light_gray transition-all ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isExpanded && (
                <ul className="text-primary_dark dark:text-gray-200 list-disc px-3">
                  {wagonsList.map((wagon: { name: string; count: number }) => {
                    return (
                      <li>
                        <div className="flex">
                          <p className="font-light w-6">{wagon.count} &times;</p>
                          <p>{wagon.name}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ) : (
            <div className="flex text-primary_dark dark:text-gray-200 ">
              <p className="dark:font-light w-8 leading-[22px]">{wagonsList[0].count} &times;</p>
              <p className="leading-[22px]">{wagonsList[0].name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default TrainInfoLite;
