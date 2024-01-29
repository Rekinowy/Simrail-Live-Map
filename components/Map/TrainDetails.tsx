import { useState } from "react";
import TrainGeneralInfo from "./TrainGeneralInfo";
import TrainTimetable from "./TrainTimetable";
import useSWR from "swr";
import { trainsImg } from "@/constants";

type TrainDetailsType = {
  trainNumber: string;
  trainName: string;
  departure: string;
  destination: string;
  speed: number;
  user: { username: string; avatar: string };
  vehicles: string[];
  serverCode: string;
  view: string;
  setView: (view: string) => void;
};

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
}: TrainDetailsType) => {
  const username = user?.username || "User";

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const timetable = useSWR(
    `https://simrail-edr.de/api/trainTimeTable/train/${serverCode}/${trainNumber}`,
    fetcher,
    { refreshInterval: 2000 }
  );

  return (
    <>
      <div className="hidden lg:flex absolute flex-col gap-4 top-2.5 right-3 w-80 max-h-[80dvh] p-4 z-[1000] rounded-xl border-2 border-slate-800 shadow-lg text-white text-base bg-primary/80 backdrop-blur-sm">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col h-28 w-28 justify-center">
            <img src={"/trains/" + trainsImg[vehicles[0]]} alt="train" />
          </div>
          <div className="flex flex-col items-center leading-5">
            <h1 className="text-xl">
              {trainName} <span className="font-bold">{trainNumber}</span>
            </h1>
            <span className="text-base">{vehicles[0]}</span>
          </div>
        </div>
        <div>
          <div className="flex flex-grow font-light text-slate-400">
            <button
              onClick={() => setView("general")}
              className={`w-full p-2 border-b border-transparent ${
                view === "general" && "text-white font-normal border-white"
              } ${
                view !== "general" &&
                "hover:border-slate-400  hover:text-slate-300"
              }`}
            >
              General
            </button>
            <button
              onClick={() => setView("timetable")}
              className={`w-full p-2 border-b border-transparent  ${
                view === "timetable" && "text-white font-normal border-white"
              } ${
                view !== "timetable" &&
                "hover:border-slate-400 hover:text-slate-300"
              }`}
            >
              Timetable
            </button>
          </div>
          <div className="border-t opacity-30"></div>
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
        {view === "timetable" && (
          <TrainTimetable timetable={timetable.data?.data} />
        )}
      </div>

      <div className="flex lg:hidden absolute py-2 w-[80%] max-w-[380px] justify-evenly bottom-4 z-[1000] left-1/2 transform -translate-x-1/2 rounded-xl border-2 border-slate-800 shadow-lg text-white bg-primary bg-opacity-90 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <div className="flex flex-col h-16 w-16 justify-center">
            <img src={"/trains/" + trainsImg[vehicles[0]]} alt="train" />
          </div>
          <div className="flex flex-col items-center leading-5">
            <h1 className="text-sm text-center">
              {trainName} <span className="font-bold">{trainNumber}</span>
            </h1>
            <span className="text-xs text-center">{vehicles[0]}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="border-l border-t opacity-30"></div>
          <div className="flex flex-col min-w-[120px] justify-center">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <img src="/speed.png" alt="" className="w-4" />
                <p className="font font-medium">{speed.toFixed()} km/h</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <img
                    src="/dep.png"
                    alt="Departure icon"
                    className="w-4 h-4"
                  />
                  <p className="capitalize leading-2">
                    {departure.charAt(1) === departure.charAt(1).toUpperCase()
                      ? departure.toLowerCase()
                      : departure}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="/des.png"
                    alt="Departure icon"
                    className="w-4 h-4"
                  />
                  <p className="capitalize leading-2">
                    {destination.charAt(1) ===
                    destination.charAt(1).toUpperCase()
                      ? destination.toLowerCase()
                      : destination}
                  </p>
                </div>
              </div>
            </div>
            {user && (
              <>
                <div className="border-t my-2 opacity-30"></div>
                <div className="flex gap-3 items-center">
                  <img src="/user.png" className="w-4" />
                  <span className="font-medium">{username}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainDetails;
