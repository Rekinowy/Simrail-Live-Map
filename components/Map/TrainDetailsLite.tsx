import TrainTimetable from "./TrainTimetable";
import TrainInfoLite from "./TrainInfoLite";
import { SlSpeedometer } from "react-icons/sl";
import { RiMapPin2Fill, RiMapPin2Line } from "react-icons/ri";
import { FaRoute, FaUserAlt } from "react-icons/fa";
// import { BsCalendar2Week, BsCalendar2WeekFill } from "react-icons/bs";
import { PiPath, PiPathBold } from "react-icons/pi";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { trains } from "@/lib/constants";
import { TrainDetailsType } from "@/lib/types/types";
import React from "react";
import { IoInformationCircle, IoInformationCircleOutline } from "react-icons/io5";
import { Tooltip } from "@nextui-org/tooltip";
import { tooltipDelay } from "@/lib/constants/uistyles";
import { useTranslation } from "react-i18next";

const tooltipStyle = {
  base: ["before:bg-light_primary_light dark:before:bg-primary_dark"],
  content: [
    "p-1.5 shadow-xl rounded-md",
    "text-[10px] text-primary dark:text-light_gray bg-light_primary_light dark:bg-primary_dark",
  ],
};
const TrainDetailsLite = ({
  view,
  trainName,
  trainNumber,
  vehicles,
  speed,
  departure,
  destination,
  user,
  username,
  follow,
  setFollow,
  showPath,
  setShowPath,
  setView,
  serverCode,
  timeOffset,
  signal,
  signalSpeed,
  signalDistance,
  showSignalInfo,
  wagons,
  totalLength,
  totalWeight,
  isDLC,
  timetableIndex,
}: TrainDetailsType & {
  username: string;
  wagons: { list: { name: string; count: number }[]; counter: number };
  totalLength: number;
  totalWeight: number;
  isDLC: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col absolute px-2 py-2 w-[80%] max-w-[280px] md:max-w-[260px] bottom-8 right-1/2 md:right-3 z-[1000] max-md:transform max-md:translate-x-1/2 rounded-lg border-1 border-slate-400 dark:border-slate-800 text-primary_dark dark:text-white bg-light_primary/90 dark:bg-primary/90 backdrop-blur-sm ${
        view === "timetable" ? "max-h-[70dvh]" : "max-h-[30dvh]"
      } transition-all`}
    >
      <div className="flex">
        <div className="flex flex-col w-4/12 items-center justify-center">
          <div className="flex flex-col h-14 w-14 justify-center brightness-125 dark:brightness-105">
            <img src={"/trains/" + trains[vehicles[0]]?.img} alt="train" />
          </div>
          <div className="flex flex-col items-center leading-5">
            <h1 className="text-xs text-center">
              {trainName} <span className="font-bold">{trainNumber}</span>
            </h1>
            <p className="text-center leading-3 text-[10px]">{trains[vehicles[0]]?.name}</p>
          </div>
          {isDLC && (
            <Tooltip
              content={t("Details:dlc_cp")}
              delay={tooltipDelay}
              showArrow={true}
              classNames={tooltipStyle}
              placement="bottom"
            >
              <div className="border border-primary dark:border-light_primary_dark mt-1 bg-light_primary_dark dark:bg-primary_light px-1 rounded-[3px] text-[8px] leading-3 font-medium opacity-80 cursor-help">
                DLC
              </div>
            </Tooltip>
          )}
        </div>
        <div className="border-l w-fit border-t opacity-30 border-primary dark:border-white ml-2"></div>
        <div className="flex flex-col w-7/12 mx-2 justify-center text-xs">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 ">
              <div>
                <SlSpeedometer className="w-4 h-3 text-primary_dark dark:text-light_gray" />
              </div>
              <p className="font font-medium">{speed.toFixed()} km/h</p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div>
                  <RiMapPin2Line className="w-4 h-4 text-primary_dark dark:text-light_gray" />
                </div>
                <p className="capitalize leading-2">
                  {departure.charAt(1) === departure.charAt(1).toUpperCase() ? departure.toLowerCase() : departure}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <RiMapPin2Fill className="w-4 h-4 text-primary_dark dark:text-light_gray" />
                </div>
                <p className="capitalize leading-2">
                  {destination.charAt(1) === destination.charAt(1).toUpperCase()
                    ? destination.toLowerCase()
                    : destination}
                </p>
              </div>
            </div>
          </div>
          {user.type === "user" && (
            <>
              <div className="border-t my-2 opacity-30 border-primary dark:border-white" />
              <div className="flex flex-col gap-0.5">
                <div className="flex gap-2 items-center max-w-[140px] md:max-w-[120px]">
                  <FaUserAlt className="w-4 text-primary_dark dark:text-light_gray" />
                  <span className="font-medium truncate">{username}</span>
                </div>
                {user.distance && user.distance !== 0 && (
                  <div className="flex gap-2 items-center max-w-[140px] md:max-w-[120px]">
                    <FaRoute className="w-4 h-2.5 text-primary_dark dark:text-light_gray" />
                    <span className="truncate text-[11px]">{Math.round(user.distance / 1000)} km</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Tooltip
            content={t("Details:pin_train")}
            delay={tooltipDelay}
            showArrow={true}
            classNames={tooltipStyle}
            placement="right"
          >
            <button
              className={`w-7 h-7 p-1 rounded-lg text-light_gray ${
                follow ? "bg-light_primary_dark dark:bg-primary_dark" : "bg-light_primary dark:bg-primary"
              } border-2 border-slate-400 dark:border-slate-600 text-primary_light dark:text-light_gray hover:bg-slate-400 dark:hover:bg-slate-600`}
              onClick={() => setFollow((prev) => !prev)}
            >
              {follow ? <MdPushPin /> : <MdOutlinePushPin />}
            </button>
          </Tooltip>
          <Tooltip
            content={t("Details:draw_route")}
            delay={tooltipDelay}
            showArrow={true}
            classNames={tooltipStyle}
            placement="right"
          >
            <button
              className={`w-7 h-7 p-1 rounded-lg text-light_gray ${
                showPath ? "bg-light_primary_dark dark:bg-primary_dark" : "bg-light_primary dark:bg-primary"
              } border-2 border-slate-400 dark:border-slate-600 text-primary_light dark:text-light_gray hover:bg-slate-400 dark:hover:bg-slate-600`}
              onClick={() => setShowPath((prev) => !prev)}
            >
              {showPath ? <PiPathBold /> : <PiPath />}
            </button>
          </Tooltip>
          <Tooltip
            content={t("Details:details")}
            delay={tooltipDelay}
            showArrow={true}
            classNames={tooltipStyle}
            placement="right"
          >
            <button
              className={`w-7 h-7 p-0.5 rounded-lg ${
                view === "timetable" ? "bg-light_primary_dark dark:bg-primary_dark" : "bg-light_primary dark:bg-primary"
              } border-2 border-slate-400 dark:border-slate-600 text-primary_light dark:text-light_gray hover:bg-slate-400 dark:hover:bg-slate-600`}
              onClick={() => setView(view === "general" ? "timetable" : "general")}
            >
              {view === "timetable" ? (
                <IoInformationCircle className="w-4 h-4 m-auto" />
              ) : (
                <IoInformationCircleOutline className="w-4 h-4 m-auto" />
              )}
            </button>
          </Tooltip>
          {/* <button
            className={`w-7 h-7 p-0.5 rounded-lg ${
              view === "timetable" ? "bg-light_primary_dark dark:bg-primary_dark" : "bg-light_primary dark:bg-primary"
              } border-2 border-slate-400 dark:border-slate-600 text-primary_light dark:text-light_gray hover:bg-slate-400 dark:hover:bg-slate-600`}
            onClick={() => setView(view === "general" ? "timetable" : "general")}
          >
            {view === "timetable" ? (
              <BsCalendar2WeekFill className="w-3.5 h-3.5 m-auto" />
            ) : (
              <BsCalendar2Week className="w-3.5 h-3.5 m-auto" />
            )}
          </button> */}
        </div>
      </div>
      {view === "timetable" && (
        <>
          <div className="border-t m-2 opacity-20 border-primary dark:border-white" />

          <TrainInfoLite
            signal={signal}
            showSignalInfo={showSignalInfo}
            signalSpeed={signalSpeed}
            signalDistance={signalDistance}
            speed={speed}
            totalLength={totalLength}
            totalWeight={totalWeight}
            wagons={wagons}
          />
        </>
      )}
      {view === "timetable" && (
        <>
          <div className="border-t m-2 opacity-20 border-primary dark:border-white"></div>

          <TrainTimetable
            trainNumber={trainNumber}
            serverCode={serverCode}
            timeOffset={timeOffset}
            showDetailsLite
            timetableIndex={timetableIndex}
          />
        </>
      )}
    </div>
  );
};
export default TrainDetailsLite;
