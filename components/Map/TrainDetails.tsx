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
      <div className="hidden md:flex absolute flex-col gap-4 top-2.5 right-3 w-64 lg:w-80 max-h-[80dvh] p-4 z-[1000] rounded-xl border-2 border-slate-800 shadow-lg text-white text-base bg-primary/80 backdrop-blur-sm">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col h-24 lg:h-28 w-24 lg:w-28 justify-center">
            <img src={"/trains/" + trainsImg[vehicles[0]]} alt="train" />
          </div>
          <div className="flex flex-col items-center leading-5">
            <h1 className="text-lg lg:text-xl">
              {trainName} <span className="font-bold">{trainNumber}</span>
            </h1>
            <span className="text-sm lg:text-base">{vehicles[0]}</span>
          </div>
        </div>
        <div>
          <div className="flex flex-grow font-light text-slate-400">
            <button
              onClick={() => setView("general")}
              className={`w-full p-2 text-sm lg:text-base border-b border-transparent ${
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
              className={`w-full p-2 text-sm lg:text-base border-b border-transparent  ${
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

      <div className="flex flex-col md:hidden absolute p-3 w-[80%] max-w-[280px] max-h-[85%] bottom-6 z-[1000] left-1/2 transform -translate-x-1/2 rounded-xl border-2 border-slate-800 shadow-lg text-white bg-primary bg-opacity-90 backdrop-blur-sm">
        <div className="flex">
          <div className="flex flex-col w-5/12 items-center justify-center mx-1">
            <div className="flex flex-col h-14 w-14 justify-center">
              <img src={"/trains/" + trainsImg[vehicles[0]]} alt="train" />
            </div>
            <div className="flex flex-col items-center leading-5">
              <h1 className="text-xs text-center">
                {trainName} <span className="font-bold">{trainNumber}</span>
              </h1>
              <span className="text-center text-[10px]">{vehicles[0]}</span>
            </div>
          </div>

          <div className="border-l w-fit border-t opacity-30"></div>
          <div className="flex flex-col w-7/12 mx-2 justify-center text-xs">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <img src="/speed.png" alt="" className="w-3" />
                <p className="font font-medium">{speed.toFixed()} km/h</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <img
                    src="/dep.png"
                    alt="Departure icon"
                    className="w-3 h-3"
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
                    className="w-3 h-3"
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
                  <img src="/user.png" alt="" className="w-3" />
                  <span className="font-medium">{username}</span>
                </div>
              </>
            )}
          </div>
        </div>
        {view === "timetable" && (
          <>
            <div className="border-t m-2 opacity-20"></div>
            <TrainTimetable timetable={timetable.data?.data} />
          </>
        )}
        <button
          className={`absolute w-7 h-7 p-1 rounded-lg ${
            view === "timetable" ? "bg-primary_dark" : "bg-primary"
          } border-2 border-slate-600 hover:border-slate-400 top-1 right-1`}
          onClick={() => setView(view === "general" ? "timetable" : "general")}
        >
          <img src="/timetable.png" alt="timetable" />
        </button>
      </div>
    </>
  );
};

export default TrainDetails;
