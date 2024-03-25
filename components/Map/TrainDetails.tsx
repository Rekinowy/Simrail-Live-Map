import TrainGeneralInfo from "./TrainGeneralInfo";
import TrainTimetable from "./TrainTimetable";
import useSWR from "swr";
import { trainsImg } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import { SlSpeedometer } from "react-icons/sl";
import { RiMapPin2Fill, RiMapPin2Line } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { BsCalendar2Week, BsCalendar2WeekFill } from "react-icons/bs";
import { fetcher } from "../Map";
import { TrainDetailsType } from "@/lib/types/types";
import { PiPath, PiPathBold } from "react-icons/pi";

const TrainDetails = ({
  trainNumber,
  trainName,
  departure,
  destination,
  speed,
  user,
  vehicles,
  serverCode,
  view,
  setView,
  follow,
  setFollow,
  showPath,
  setShowPath,
}: TrainDetailsType) => {
  const { t } = useTranslation();

  const username = user?.name || "User";

  const timetable = useSWR(`https://simrail-edr.de/api/trainTimeTable/train/${serverCode}/${trainNumber}`, fetcher, {
    refreshInterval: 2500,
  });

  return (
    <>
      <div className="hidden md:flex absolute flex-col gap-4 top-2.5 right-3 w-64 lg:w-72 max-h-[80dvh] p-4 z-[1000] rounded-xl border-1 shadow-lg text-base border-slate-400 dark:border-slate-800 text-primary_dark dark:text-white bg-light_primary/90 dark:bg-primary/90 backdrop-blur-sm">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col h-24 lg:h-28 w-24 lg:w-28 justify-center brightness-125 dark:brightness-105">
            <img src={"/trains/" + trainsImg[vehicles[0]?.name]} alt="train" />
          </div>
          <div className="flex flex-col items-center leading-5">
            <h1 className="text-lg lg:text-xl">
              {trainName} <span className="font-bold">{trainNumber}</span>
            </h1>
            <span className="text-sm lg:text-base">{vehicles[0]?.name}</span>
          </div>
        </div>
        <div>
          <div className="flex flex-grow font-light text-slate-600 dark:text-slate-400">
            <button
              onClick={() => setView("general")}
              className={`w-full p-2 text-sm lg:text-base border-b border-transparent ${
                view === "general" && "font-medium text-primary_dark border-black dark:text-white dark:border-white"
              } ${
                view !== "general" &&
                " hover:border-slate-400 hover:text-slate-800 dark:hover:border-slate-300  dark:hover:text-slate-300"
              }`}
            >
              {t("general")}
            </button>
            <button
              onClick={() => setView("timetable")}
              className={`w-full p-2 text-sm lg:text-base border-b border-transparent  ${
                view === "timetable" && "font-medium text-primary_dark border-black dark:text-white dark:border-white"
              } ${
                view !== "timetable" &&
                " hover:border-slate-400 hover:text-slate-800 dark:hover:border-slate-300  dark:hover:text-slate-300"
              }`}
            >
              {t("timetable")}
            </button>
          </div>
          <div className="border-t opacity-30 border-primary_dark dark:border-white"></div>
        </div>
        {view === "general" && (
          <TrainGeneralInfo
            departure={departure}
            destination={destination}
            speed={speed}
            user={user}
            username={username}
          />
        )}
        {view === "timetable" && <TrainTimetable timetable={timetable.data?.data} />}
        <button
          className={`absolute top-3 right-3 flex items-center gap-1 p-1 rounded-lg  ${
            follow ? "bg-light_primary_dark dark:bg-primary_dark" : "bg-light_primary dark:bg-primary"
          } border-1  text-xs border-slate-400 dark:border-slate-600 text-primary_light dark:text-light_gray hover:bg-slate-400 dark:hover:bg-slate-700`}
          onClick={() => setFollow((prev) => !prev)}
        >
          {follow ? <MdPushPin className="w-5 h-5" /> : <MdOutlinePushPin className="w-5 h-5" />}
        </button>
        <button
          className={`absolute top-3 left-3 flex items-center gap-1 p-1 rounded-lg  ${
            showPath ? "bg-light_primary_dark dark:bg-primary_dark" : "bg-light_primary dark:bg-primary"
          } border-1  text-xs border-slate-400 dark:border-slate-600 text-primary_light dark:text-light_gray hover:bg-slate-400 dark:hover:bg-slate-700`}
          onClick={() => setShowPath((prev) => !prev)}
        >
          {showPath ? <PiPathBold className="w-5 h-5" /> : <PiPath className="w-5 h-5" />}
        </button>
      </div>

      {/* mobile devices */}
      <div
        className={`flex flex-col md:hidden absolute px-1 py-2 w-[80%] max-w-[280px] bottom-6 z-[1000] left-1/2 transform -translate-x-1/2 rounded-xl border-1 border-slate-400 dark:border-slate-800 text-primary_dark dark:text-white bg-light_primary/90 dark:bg-primary/90  backdrop-blur-sm ${
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
                <div className="flex gap-2 items-center">
                  <FaUserAlt className="w-4 text-primary_dark dark:text-light_gray" />
                  <span className="font-medium">{username}</span>
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
    </>
  );
};

export default TrainDetails;
