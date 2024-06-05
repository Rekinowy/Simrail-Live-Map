import { UserType } from "@/lib/types/types";
import { FaRegStar, FaStar, FaUserAlt } from "react-icons/fa";
import { PiTimerBold } from "react-icons/pi";

const StationDetailsLite = ({
  stationName,
  stationPrefix,
  difficulty,
  user,
}: {
  stationName: string;
  stationPrefix: string;
  difficulty: number;
  user: UserType;
}) => {
  return (
    <div className="absolute flex w-[80%] max-w-[280px] md:max-w-[260px] justify-evenly gap-2 bottom-8 right-1/2 md:right-3 max-md:transform max-md:translate-x-1/2 p-2 z-[1000] rounded-xl border-1 border-slate-400 dark:border-slate-800 text-primary_dark dark:text-white text-base bg-light_primary dark:bg-primary bg-opacity-90 backdrop-blur-sm transition-all">
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
              <span className="font-medium text-sm overflow-hidden text-overflow-ellipsis break-words">
                {user.name}
              </span>
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
  );
};

export default StationDetailsLite;
