import { getImageByName } from "@/lib/utils/utils";
import { Train } from "./SpawnList";
import { routesData, routesDataAlt } from "@/lib/constants/routesData";
import { RiMapPin2Fill, RiMapPin2Line } from "react-icons/ri";
import { TbWeight } from "react-icons/tb";
import { PiArrowsHorizontalBold } from "react-icons/pi";
import { LuTimer } from "react-icons/lu";
import { SiSpeedtest } from "react-icons/si";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@nextui-org/tooltip";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";

interface SpawnListItemProps {
  train: Train;
  currentTime: string;
  isSelected: boolean;
  onSelect: () => void;
  availableTrains: [{ number: string; type: string }];
  setSelectedMarker: (value: string) => void;
  setShowSpawnList: (value: boolean) => void;
  setSelectedTrainId: (value: string | null) => void;
}

const SpawnListItem: React.FC<SpawnListItemProps> = ({
  train,
  currentTime,
  isSelected,
  onSelect,
  availableTrains,
  setSelectedMarker,
  setShowSpawnList,
  setSelectedTrainId,
}) => {
  let allData = routesData;
  const { t } = useTranslation();

  const spawnTime = train.spawnTime;
  let isOnMap = false;
  const [spawnHours, spawnMinutes] = spawnTime.split(":").map(Number);
  const [currentHours, currentMinutes, currentSeconds] = currentTime.split(":").map(Number);

  const spawnDate = new Date(0, 0, 0, spawnHours, spawnMinutes);
  const currentDate = new Date(0, 0, 0, currentHours, currentMinutes);
  let difference = (spawnDate.getTime() - currentDate.getTime()) / (1000 * 60);

  const moeTrainIds = ["23903", "32912", "23969", "32976", "24903", "24911", "42904", "42914"];

  if (difference < 0) {
    difference += 1440;
  }

  let category = "";
  let vmax = null;
  let routeTime = null;
  let origin = "";
  let destination = "";
  let spawnStart = "";
  let spawnEnd = "";

  if (
    (Number(train.id) >= 335000 && Number(train.id) <= 335900 && Number(train.id) % 2 === 0) ||
    (Number(train.id) >= 336000 && Number(train.id) <= 336900 && Number(train.id) % 2 === 0) ||
    Number(train.id) == 24205 ||
    Number(train.id) == 42200 ||
    Number(train.id) == 42202
  ) {
    allData = routesDataAlt;
  }

  for (const data of allData) {
    if (Number(train.id) >= data.min && Number(train.id) <= data.max) {
      category = data.category;
      vmax = data.vmax;
      routeTime = data.time;
      origin = data.origin;
      destination = data.destination;
      spawnStart = data.spawnStart;
      spawnEnd = data.spawnEnd;
      break;
    }
  }

  if (moeTrainIds.includes(train.id)) {
    category = "MOE";
  }

  const tooltipStyle = {
    base: ["before:bg-light_primary_light dark:before:bg-primary_dark"],
    content: [
      "p-1.5 shadow-xl rounded-md",
      "text-[10px] text-primary dark:text-light_gray bg-light_primary_light dark:bg-primary_dark",
    ],
  };

  const liClassName = () => {
    if (isSelected && difference === 0) {
      return "bg-green-600/80 dark:bg-green-800/80";
    } else if (isSelected) {
      return "bg-light_primary/90 dark:bg-primary/95";
    } else if (difference === 0) {
      return "bg-green-600/50 hover:bg-green-600/70 dark:bg-green-900/75 hover:dark:bg-green-800/60";
    } else {
      return "bg-light_primary/50 hover:bg-light_primary_dark/80 dark:bg-primary/60 dark:hover:bg-primary_light/60";
    }
  };

  for (const availableTrain of availableTrains) {
    if (availableTrain.number === train.id) {
      isOnMap = true;
      break;
    }
  }

  if (isSelected && isOnMap) {
    setSelectedTrainId(null);
    setSelectedMarker(train.id);
    setShowSpawnList(false);
  }

  return (
    <li
      className={`relative flex z-10 ${liClassName()} cursor-pointer border-b border-slate-400 dark:border-slate-800 dark:text-gray-200 transition-all`}
    >
      <button onClick={onSelect} className="flex flex-col w-full px-2 py-1 gap-2">
        <div className="flex w-full gap-1 items-center">
          <div className="flex flex-col w-full gap-1">
            <div className="flex gap-2 items-center ">
              <div className="flex justify-center items-center w-10 h-10 brightness-125 dark:brightness-105">
                <img width={40} height={40} src={getImageByName(train.locos[0])} />
              </div>
              <div className="text-left">
                <div className="flex gap-1 text-xs">
                  <div>{category}</div> <div className="font-medium">{train.id}</div>{" "}
                  {train.isDLC && (
                    <Tooltip
                      content={t("Details:dlc_cp")}
                      delay={1000}
                      showArrow={true}
                      classNames={tooltipStyle}
                      placement="top"
                    >
                      <div className="h-3 border border-primary dark:border-light_primary_dark bg-light_primary_dark dark:bg-primary_light m-0.5 px-0.5 rounded-[4px] text-[8px] leading-[11px] font-medium opacity-80 cursor-help">
                        DLC
                      </div>
                    </Tooltip>
                  )}
                </div>
                <h2 className="text-[11px] text-gray-700 dark:text-gray-400">{train.locos[0]}</h2>
                {train.locos.length > 1 && (
                  <h3 className="text-[10px] text-gray-600 dark:text-gray-500 leading-[10px] text-nowrap">
                    {train.locos.slice(1).join(", ")}
                  </h3>
                )}
              </div>
            </div>
            <div className="dark:text-gray-300">
              <div className="text-xs text-left h-[14px]">{spawnStart}</div>
              <div className="text-xs text-right h-[14px]">→ {spawnEnd}</div>
            </div>
          </div>
          <div className="border-l h-5/6 dark:border-light_primary/40 border-primary/40 mx-1" />
          {difference == 0 ? (
            isOnMap ? (
              <div className="flex flex-col w-1/4 justify-center items-center">
                <IoCheckmarkDoneSharp className="w-8 h-8" />
                <p className="text-[9px]">{t("Searchbox:on_map")}</p>
              </div>
            ) : (
              <div className="flex flex-col w-1/4 justify-center items-center">
                <GiSandsOfTime className="w-6 h-9" />
                <p className="text-[9px]">{t("Searchbox:waiting")}</p>
              </div>
            )
          ) : (
            <div className="flex flex-col w-1/4 justify-center">
              <p className="text-[9px]">{t("Searchbox:spawn_in")}:</p>
              <h3 className="font-medium text-base">{difference}&prime;</h3>
              <p className="text-[10px] pt-1.5">({train.spawnTime})</p>
            </div>
          )}
        </div>
        {isSelected && (
          <div className="flex justify-between w-full text-gray-600 dark:text-gray-400 ">
            <div className="text-[11px]">
              <div className="text-left h-[14px] flex items-center gap-1 truncate">
                <RiMapPin2Line className="w-2.5 h-2.5 text-primary_dark dark:text-light_gray" />
                {origin}
              </div>
              <div className="text-left h-[14px] flex items-center gap-1 truncate">
                <RiMapPin2Fill className="w-2.5 2.5 text-primary_dark dark:text-light_gray" />
                {destination}
              </div>
            </div>
            <div className="flex gap-1 sm:gap-2 text-[10px] ">
              <div className="flex flex-col">
                {train.length && (
                  <div className="flex gap-0.5">
                    <PiArrowsHorizontalBold className="w-2.5 h-3.5" />
                    {train.length} m
                  </div>
                )}
                {vmax && (
                  <div className="flex gap-0.5 truncate">
                    <SiSpeedtest className="w-2.5 h-3.5" />
                    {vmax} km/h
                  </div>
                )}
              </div>
              <div className="flex flex-col ">
                {train.weight && (
                  <div className="flex gap-0.5">
                    <TbWeight className="w-2.5 h-3.5" />
                    {train.weight} t
                  </div>
                )}
                {routeTime && (
                  <div className="flex gap-0.5">
                    <LuTimer className="w-2.5 h-3.5" />
                    {routeTime}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </button>
    </li>
  );
};
export default SpawnListItem;
