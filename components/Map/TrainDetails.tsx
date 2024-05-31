import TrainGeneralInfo from "./TrainGeneralInfo";
import TrainTimetable from "./TrainTimetable";
import useSWR from "swr";
import { trains } from "@/lib/constants";
import { useTranslation } from "react-i18next";

import { MdOutlinePushPin, MdPushPin } from "react-icons/md";

import { fetcher } from "../Map";
import { TrainDetailsType } from "@/lib/types/types";
import { PiPath, PiPathBold } from "react-icons/pi";
import TrainDetailsLite from "./TrainDetailsLite";

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
  showDetailsLite,
}: TrainDetailsType) => {
  const { t } = useTranslation();

  // const username = user?.name || "User";
  const username = "Rekionowyyyyyyyyyy";

  const timetable = useSWR(`https://simrail-edr.de/api/trainTimeTable/train/${serverCode}/${trainNumber}`, fetcher, {
    refreshInterval: 2500,
  });

  return showDetailsLite ? (
    <TrainDetailsLite
      trainNumber={trainNumber}
      trainName={trainName}
      departure={departure}
      destination={destination}
      speed={speed}
      user={user}
      vehicles={vehicles}
      serverCode={serverCode}
      view={view}
      setView={setView}
      follow={follow}
      setFollow={setFollow}
      showPath={showPath}
      setShowPath={setShowPath}
      username={username}
      timetable={timetable}
      showDetailsLite={showDetailsLite}
    />
  ) : (
    <>
      <div className="hidden md:flex absolute flex-col gap-4 top-2.5 right-3 w-64 lg:w-72 max-h-[80dvh] p-4 z-[1000] rounded-xl border-1 shadow-lg text-base border-slate-400 dark:border-slate-800 text-primary_dark dark:text-white bg-light_primary/90 dark:bg-primary/90 backdrop-blur-sm">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col h-24 lg:h-28 w-24 lg:w-28 justify-center brightness-125 dark:brightness-105">
            <img src={"/trains/" + trains[vehicles[0]?.name]?.img} alt="train" />
          </div>
          <div className="flex flex-col items-center leading-5">
            <h1 className="text-lg lg:text-xl">
              {trainName} <span className="font-bold">{trainNumber}</span>
            </h1>
            <span className="text-sm lg:text-base">{trains[vehicles[0]?.name]?.name}</span>
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
        {view === "timetable" && <TrainTimetable timetable={timetable.data?.data} serverCode={serverCode} />}
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

      <TrainDetailsLite
        trainNumber={trainNumber}
        trainName={trainName}
        departure={departure}
        destination={destination}
        speed={speed}
        user={user}
        vehicles={vehicles}
        serverCode={serverCode}
        view={view}
        setView={setView}
        follow={follow}
        setFollow={setFollow}
        showPath={showPath}
        setShowPath={setShowPath}
        username={username}
        timetable={timetable}
        showDetailsLite={showDetailsLite}
      />
    </>
  );
};

export default TrainDetails;
