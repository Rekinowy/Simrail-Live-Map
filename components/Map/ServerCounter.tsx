import { ServerCounterProps } from "@/lib/types/types";
import { FaUsers } from "react-icons/fa";
import { GiLever } from "react-icons/gi";
import { TbTrain } from "react-icons/tb";

const ServerCounter = ({
  serverCode,
  totalTrains,
  userTrainsCount,
  totalStations,
  userStationsCount,
}: ServerCounterProps) => {
  return (
    <div className="absolute bottom-5 md:bottom-4 left-3 z-[1200] h-10 md:h-12 flex gap-2 items-center p-2 text-slate-700/90 dark:text-light_gray/90 bg-light_primary/80 dark:bg-primary/80 shadow-xl border-1 border-slate-400 dark:border-slate-800 rounded-lg ">
      <div className="font-medium">{serverCode.toUpperCase()}</div>
      <div className="border-l-2 w-fit h-full dark:border-light_primary/40 border-primary/40 " />
      <div className="text-xs md:text-sm">
        <div className="flex items-center font-medium gap-2">
          <TbTrain className="w-3 md:w-4 h-3 md:h-4" />
          {userTrainsCount}/{totalTrains}
        </div>
        <div className="flex items-center font-medium gap-2">
          <GiLever className="w-3 md:w-4 h-3 md:h-4" />
          {userStationsCount}/{totalStations}
        </div>
      </div>
    </div>
  );
};
export default ServerCounter;
