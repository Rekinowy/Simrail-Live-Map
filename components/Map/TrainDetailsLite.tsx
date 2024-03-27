import TrainTimetable from "./TrainTimetable";
import { SlSpeedometer } from "react-icons/sl";
import { RiMapPin2Fill, RiMapPin2Line } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { BsCalendar2Week, BsCalendar2WeekFill } from "react-icons/bs";
import { PiPath, PiPathBold } from "react-icons/pi";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { trainsImg } from "@/lib/constants";
import { TrainDetailsType } from "@/lib/types/types";
import React from "react";

const TrainDetailsLite = ({
  view,
  trainName,
  trainNumber,
  vehicles,
  speed,
  departure,
  destination,
  user,
  follow,
  setFollow,
  showPath,
  setShowPath,
  setView,
  username,
  timetable,
  showDetailsLite,
}: TrainDetailsType & {
  username: string;
  timetable: any;
}) => {
  return (
    <div
      className={`${
        !showDetailsLite && "md:hidden"
      } flex flex-col absolute px-2 py-2 w-[80%] max-w-[280px] md:max-w-[260px] bottom-8 right-1/2 md:right-3 z-[1000] max-md:transform max-md:translate-x-1/2 rounded-xl border-1 border-slate-400 dark:border-slate-800 text-primary_dark dark:text-white bg-light_primary/90 dark:bg-primary/90  backdrop-blur-sm ${
        view === "timetable" ? "max-h-[60dvh]" : "max-h-[30dvh]"
      } transition-all`}
    >
      <div className="flex">
        <div className="flex flex-col w-4/12 items-center justify-center mx-1">
          <div className="flex flex-col h-14 w-14 justify-center brightness-125 dark:brightness-105">
            <img src={"/trains/" + trainsImg[vehicles[0]?.name]} alt="train" />
          </div>
          <div className="flex flex-col items-center leading-5">
            <h1 className="text-xs text-center">
              {trainName} <span className="font-bold">{trainNumber}</span>
            </h1>
            <p className="text-center leading-3 text-[10px]">{vehicles[0]?.name}</p>
          </div>
        </div>
        <div className="border-l w-fit border-t opacity-30 border-primary dark:border-white"></div>
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
          {user && (
            <>
              <div className="border-t my-2 opacity-30 border-primary dark:border-white"></div>
              <div className="flex gap-2 items-center max-w-[140px] md:max-w-[120px]">
                <FaUserAlt className="w-4 text-primary_dark dark:text-light_gray" />
                <span className="font-medium truncate">{username}</span>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            className={`w-7 h-7 p-1 rounded-lg text-light_gray ${
              follow ? "bg-light_primary_dark dark:bg-primary_dark" : "bg-light_primary dark:bg-primary"
            } border-2 border-slate-400 dark:border-slate-600 text-primary_light dark:text-light_gray hover:bg-slate-400 dark:hover:bg-slate-600`}
            onClick={() => setFollow((prev) => !prev)}
          >
            {follow ? <MdPushPin /> : <MdOutlinePushPin />}
          </button>
          <button
            className={`w-7 h-7 p-1 rounded-lg text-light_gray ${
              showPath ? "bg-light_primary_dark dark:bg-primary_dark" : "bg-light_primary dark:bg-primary"
            } border-2 border-slate-400 dark:border-slate-600 text-primary_light dark:text-light_gray hover:bg-slate-400 dark:hover:bg-slate-600`}
            onClick={() => setShowPath((prev) => !prev)}
          >
            {showPath ? <PiPathBold /> : <PiPath />}
          </button>
          <button
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
          </button>
        </div>
      </div>
      {view === "timetable" && (
        <>
          <div className="border-t m-2 opacity-20 border-primary dark:border-white"></div>

          <TrainTimetable timetable={timetable.data?.data} />
        </>
      )}
    </div>
  );
};
export default TrainDetailsLite;
