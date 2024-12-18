"use client";

import Link from "next/link";
import { SlSpeedometer } from "react-icons/sl";
import { RiMapPin2Fill, RiMapPin2Line } from "react-icons/ri";
import { TbWeight } from "react-icons/tb";
import { FaRoute, FaUserAlt } from "react-icons/fa";
import { TrainGeneralType } from "@/lib/types/types";
import { PiArrowsHorizontalBold, PiTrafficSignalBold } from "react-icons/pi";
import { FiExternalLink } from "react-icons/fi";
import { GiCoalWagon } from "react-icons/gi";
import { TiArrowSortedDown } from "react-icons/ti";
import { useState } from "react";
import { calculateDistanceIn5Seconds } from "@/lib/utils/utils";
import { Tooltip } from "@nextui-org/tooltip";

const tooltipStyle = {
  base: ["before:bg-light_primary_light dark:before:bg-primary_dark"],
  content: [
    "p-1.5 shadow-xl rounded-md",
    "text-xs font-medium text-primary dark:text-light_gray bg-light_primary_light dark:bg-primary_dark",
  ],
};

const TrainGeneralInfo = ({
  departure,
  destination,
  speed,
  signal,
  signalSpeed,
  signalDistance,
  user,
  username,
  showSignalInfo,
  wagons,
  totalLength,
  totalWeight,
}: TrainGeneralType) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const wagonsList = wagons.list;

  let signalName = "";
  if (signal) {
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
      ? "top-2.5 bg-red-600 shadow-red-600"
      : signalSpeed === 32767
      ? "top-1 bg-green-600 shadow-green-600"
      : "top-2.5 bg-yellow-600 shadow-yellow-600";

  return (
    <>
      <div className="flex flex-col min-w-[120px] justify-center text-sm lg:text-base">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <SlSpeedometer className="w-5 h-4 text-primary_dark dark:text-light_gray" />
              <p className="font-medium">{speed.toFixed()} km/h</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div>
                  <RiMapPin2Line className="w-5 h-5 text-primary_dark dark:text-light_gray" />
                </div>
                <p className="capitalize leading-5 dark:font-light">
                  {departure.charAt(1) === departure.charAt(1).toUpperCase() ? departure.toLowerCase() : departure}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <RiMapPin2Fill className="w-5 h-5 text-primary_dark dark:text-light_gray" />
                </div>
                <p className="capitalize leading-5 font-medium dark:font-normal">
                  {destination.charAt(1) === destination.charAt(1).toUpperCase()
                    ? destination.toLowerCase()
                    : destination}
                </p>
              </div>
            </div>
            <div className="border-t mt-2 w-[95%] self-center opacity-10 border-primary dark:border-white" />
          </div>
          {signal && showSignalInfo && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-5">
                <Tooltip content={signalName} delay={500} classNames={tooltipStyle} placement="top">
                  <div className="relative flex flex-col w-5 items-center gap-1  cursor-help">
                    <PiTrafficSignalBold className="relative w-5 h-5 text-primary_dark dark:text-light_gray" />
                    <div
                      className={`absolute w-1.5 h-1.5 rounded-full shadow-[0_0px_10px_3px_rgba(0,0,0,0.2)]  ${signalStyle}`}
                    ></div>
                    <p className="font-semibold text-[8px] leading-[7px] text-primary_dark dark:text-light_gray">
                      {signalName}
                    </p>
                  </div>
                </Tooltip>
                <div>
                  <p className="font-medium dark:font-normal">{displaySignalSpeed}</p>
                  <p className="text-[10px] font-medium dark:font-normal lg:text-xs leading-4">
                    ({displaySignalDistance})
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {totalLength > 0 && totalWeight > 0 && (
              <div className="flex dark:font-light">
                <div className="flex items-center gap-3 w-1/2">
                  <PiArrowsHorizontalBold className="w-5 h-4 text-primary_dark dark:text-light_gray" />
                  <p>{totalLength} m</p>
                </div>
                <div className="flex items-center gap-3 w-1/2">
                  <TbWeight className="w-5 h-4 text-primary_dark dark:text-light_gray" />
                  <p>{totalWeight} t</p>
                </div>
              </div>
            )}
            {wagonsList.length > 0 && (
              <div className="flex gap-3">
                <div>
                  <GiCoalWagon className="w-5 h-4 mt-0.5 text-primary_dark dark:text-light_gray" />
                </div>
                {wagonsList.length > 1 ? (
                  <div className="flex flex-col w-full gap-2">
                    <button onClick={toggleList} className="flex items-center justify-between">
                      <p className="leading-5 dark:font-light">&times; {wagons.counter}</p>
                      <TiArrowSortedDown
                        className={`w-5 h-5 text-primary_dark dark:text-light_gray transition-all ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <ul className="text-primary_dark dark:text-gray-200 list-disc">
                        {wagonsList.map((wagon: { name: string; count: number }) => {
                          return (
                            <li>
                              <div className="flex">
                                <p className="font-light w-8 lg:w-9">{wagon.count} &times;</p>
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
                    <p className="dark:font-light w-8 lg:w-9 leading-[22px]">{wagonsList[0].count} &times;</p>
                    <p className="leading-[22px]">{wagonsList[0].name}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {user.type === "user" && (
          <>
            <div className="border-t mt-4 mb-3 w-[95%] self-center opacity-30 border-primary dark:border-white" />
            <div className="flex gap-3 items-center">
              <FaUserAlt className="w-5 h-3.5 text-primary_dark dark:text-light_gray" />
              {user.score === null ? (
                <div className=" flex gap-1.5 font-medium overflow-hidden text-overflow-ellipsis break-words">
                  {username}
                </div>
              ) : (
                <Link
                  className="group flex gap-1.5 font-medium overflow-hidden text-overflow-ellipsis break-words hover:underline"
                  href={user.profileUrl}
                  target="_blank"
                >
                  {username} <FiExternalLink className="w-2.5 h-5 opacity-50 group-hover:opacity-100" />
                </Link>
              )}
            </div>
            {user.distance && user.distance !== 0 && (
              <div className="mt-1 flex gap-3 items-center">
                <div className="flex w-5 justify-center">
                  <FaRoute className="w-3.5 h-3.5 text-primary_dark dark:text-light_gray" />
                </div>
                <div>{Math.round(user.distance / 1000)} km</div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default TrainGeneralInfo;
