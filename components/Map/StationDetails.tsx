import { StationDetailsType } from "@/lib/types/types";
import Image from "next/image";
import { FaRegStar, FaStar, FaUserAlt } from "react-icons/fa";
import { PiTimerBold } from "react-icons/pi";
import StationDetailsLite from "./StationDetailsLite";

const StationDetails = ({
  stationName,
  stationPrefix,
  stationImage,
  difficulty,
  user,
  username,
  showDetailsLite,
}: StationDetailsType) => {
  return showDetailsLite ? (
    <div className="absolute flex w-[80%] max-w-[280px] md:max-w-[260px] justify-evenly gap-2 bottom-8 right-1/2 md:right-3 max-md:transform max-md:translate-x-1/2 p-2 z-[1000] rounded-xl border-1 border-slate-400 dark:border-slate-800 text-primary_dark dark:text-white text-base bg-light_primary dark:bg-primary bg-opacity-90 backdrop-blur-sm">
      <div className="flex flex-col min-w-[40%] justify-center items-center">
        <div className="text-sm text-center border-2 min-w-[30px] font-bold text-slate-200 border-slate-300 ring-2 ring-slate-400 dark:ring-0 rounded-[4px] px-2 py-0.5 my-2 bg-blue-700">
          {stationPrefix}
        </div>
        <div className="text-xs font-medium text-center">{stationName}</div>
      </div>
      <div className="border-l opacity-30 border-primary dark:border-white" />
      <div className="flex flex-col min-w-[50%] gap-3 items-center justify-center">
        <div className="flex gap-1 items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i}>{i < difficulty ? <FaStar className="w-2.5" /> : <FaRegStar className="w-2.5" />}</div>
          ))}
        </div>
        {user.type === "user" && (
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 max-w-[120px]">
              <div className="flex items-center">
                <FaUserAlt className="w-4 h-3 text-primary_dark dark:text-light_gray" />
              </div>
              <span className="font-medium text-sm overflow-hidden text-overflow-ellipsis break-words">{username}</span>
            </div>
            {user.dispatcher_time && user.dispatcher_time !== 0 && (
              <div className="flex gap-2">
                <PiTimerBold className="w-4 h-5 text-primary_dark dark:text-light_gray" />

                <span className="text-sm font-normal">{Math.round(user.dispatcher_time / 60)} h</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <>
      <div className="absolute hidden md:flex flex-col gap-4 top-2.5 right-3 w-64 lg:w-72 p-4 z-[1000] rounded-xl border-1 text-base border-slate-400 dark:border-slate-800 text-primary_dark dark:text-white bg-light_primary dark:bg-primary bg-opacity-90 backdrop-blur-sm">
        <div className="flex flex-col gap-3">
          <div className="relative h-full w-full rounded-lg shadow-xl overflow-hidden">
            <Image src={stationImage} alt="Station image" width={291} height={125} className="object-cover relative" />
            <div className="absolute top-1 left-1 px-1 text-md text-center font-bold min-w-[40px] text-slate-200 border-2 border-slate-300 rounded-[4px] bg-blue-700">
              {stationPrefix}
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="text-lg lg:text-xl text-center">{stationName}</div>
            </div>
            <div className="flex gap-1 items-center">
              {[...Array(5)].map((_, i) => (
                <div key={i}>{i < difficulty ? <FaStar className="w-3" /> : <FaRegStar className="w-3" />}</div>
              ))}
            </div>
          </div>
        </div>

        {user.type === "user" && (
          <>
            <div className="border-t opacity-30 border-primary dark:border-white" />
            <div className="flex flex-col gap-1">
              <div className="flex gap-3 items-center">
                <FaUserAlt className="w-4 h-3.5 text-primary_dark dark:text-light_gray" />
                <span className="font-medium text-md overflow-hidden text-overflow-ellipsis break-words">
                  {username}
                </span>
              </div>
              {user.dispatcher_time && user.dispatcher_time !== 0 && (
                <div className="flex gap-3">
                  <div className="flex items-center">
                    <PiTimerBold className="w-4 h-5 text-primary_dark dark:text-light_gray" />
                  </div>
                  <div className="text-sm font-normal lg:text-base">{Math.round(user.dispatcher_time / 60)} h</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <StationDetailsLite stationName={stationName} stationPrefix={stationPrefix} difficulty={difficulty} user={user} />
    </>
  );
};
export default StationDetails;
