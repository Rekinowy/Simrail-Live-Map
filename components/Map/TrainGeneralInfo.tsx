import { SlSpeedometer } from "react-icons/sl";
import { RiMapPin2Fill, RiMapPin2Line } from "react-icons/ri";
import { FaRoute, FaUserAlt } from "react-icons/fa";
import { TrainGeneralType } from "@/lib/types/types";
import { PiTrafficSignalBold } from "react-icons/pi";

const TrainGeneralInfo = ({
  departure,
  destination,
  speed,
  signal,
  signalSpeed,
  signalDistance,
  user,
  username,
}: TrainGeneralType) => {
  let signalName = "";
  if (signal) {
    signalName = signal.split("@")[0];
  }

  const displaySignalSpeed = signalSpeed === 32767 ? "Vmax" : `${signalSpeed} km/h`;
  const displaySignalDistance =
    signalDistance < 1000 ? `${Math.round(signalDistance)} m` : `${(signalDistance / 1000).toFixed(2)} km`;

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
          </div>
          {signal && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="relative flex flex-col w-5 items-center gap-1">
                  <PiTrafficSignalBold className="relative w-5 h-5 text-primary_dark dark:text-light_gray " />
                  <div
                    className={`absolute w-1.5 h-1.5 rounded-full shadow-[0_0px_10px_3px_rgba(0,0,0,0.2)]  ${signalStyle}`}
                  ></div>
                  <p className="font-semibold text-[7px] leading-[8px] text-primary_dark dark:text-light_gray">
                    {signalName}
                  </p>
                </div>
                {/* <p className="font-normal">
                  {displaySignalSpeed} <span className="font-normal">({displaySignalDistance})</span>
                </p> */}
                <div>
                  <p className="text-xs font-medium dark:font-normal lg:text-sm leading-4">{displaySignalSpeed}</p>
                  <p className="text-[10px] font-medium dark:font-normal lg:text-xs leading-4 lg:leading-5">
                    ({displaySignalDistance})
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {user.type === "user" && (
          <>
            <div className="border-t my-3 opacity-30 border-primary dark:border-white"></div>
            <div className="flex gap-3 items-center">
              <FaUserAlt className="w-5 h-3.5 text-primary_dark dark:text-light_gray" />
              <span className="font-medium overflow-hidden text-overflow-ellipsis break-words">{username}</span>
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
