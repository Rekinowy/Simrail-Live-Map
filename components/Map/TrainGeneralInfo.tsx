import { SlSpeedometer } from "react-icons/sl";
import { RiMapPin2Fill, RiMapPin2Line } from "react-icons/ri";
import { FaRoute, FaUserAlt } from "react-icons/fa";
import { TrainGeneralType } from "@/lib/types/types";

const TrainGeneralInfo = ({ departure, destination, speed, user, username }: TrainGeneralType) => {
  return (
    <>
      <div className="flex flex-col min-w-[120px] justify-center text-sm lg:text-base">
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
