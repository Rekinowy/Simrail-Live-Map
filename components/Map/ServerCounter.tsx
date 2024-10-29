import { ServerCounterProps } from "@/lib/types/types";
import { FaUsers } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const ServerCounter = ({ serverCode, totalTrains, userTrainsCount }: ServerCounterProps) => {
  return (
    <div className="absolute bottom-5 md:bottom-4 left-3 z-[1200] flex gap-2 items-center p-2 h-9 md:h-10 text-slate-700/90 dark:text-light_gray/90 bg-light_primary/80 dark:bg-primary/80 shadow-xl border-1 border-slate-400 dark:border-slate-800 rounded-lg text-xs md:text-sm">
      <div className="font-semibold">{serverCode.toUpperCase()}</div>
      <div className="border-l-2 w-fit h-full dark:border-light_primary/40 border-primary/40 "></div>
      <div className="flex items-center font-medium gap-2">
        <FaUsers className="w-3 md:w-4 h-3 md:h-4" />
        {userTrainsCount}/{totalTrains}
      </div>
    </div>
  );
};
export default ServerCounter;
