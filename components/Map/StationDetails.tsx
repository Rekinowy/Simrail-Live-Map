import { StationDetailsType } from "@/lib/types/types";

import { FaRegStar, FaStar, FaUserAlt } from "react-icons/fa";
import { PiTimerBold } from "react-icons/pi";
import StationDetailsLite from "./StationDetailsLite";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

const StationDetails = ({
  stationName,
  stationPrefix,
  stationImage,
  difficulty,
  user,
  username,
  showDetailsLite,
}: StationDetailsType) => {
  const isMobile = useMediaQuery({ maxWidth: 839 });
  const showLite = showDetailsLite || isMobile;

  return showLite ? (
    <StationDetailsLite stationName={stationName} stationPrefix={stationPrefix} difficulty={difficulty} user={user} />
  ) : (
    <div className="absolute flex flex-col gap-4 top-2.5 right-3 w-64 lg:w-72 p-4 z-[1000] rounded-xl border-1 text-base border-slate-400 dark:border-slate-800 text-primary_dark dark:text-white bg-light_primary dark:bg-primary bg-opacity-90 backdrop-blur-sm">
      <div className="flex flex-col gap-3">
        <div className="relative h-full w-full rounded-lg shadow-xl overflow-hidden">
          <img src={stationImage} alt="Station image" width={291} height={125} className="object-cover relative" />
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
              {user.score === null || user.score === undefined ? (
                <div className=" flex gap-1.5 font-medium overflow-hidden text-overflow-ellipsis break-words">
                  {username}
                </div>
              ) : (
                <Link
                  className="group flex gap-1.5 font-medium overflow-hidden text-overflow-ellipsis break-words !text-primary_dark dark:!text-white hover:underline"
                  href={user.profileUrl}
                  target="_blank"
                >
                  {username} <FiExternalLink className="w-2.5 h-5 opacity-50 group-hover:opacity-100" />
                </Link>
              )}
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
  );
};
export default StationDetails;
