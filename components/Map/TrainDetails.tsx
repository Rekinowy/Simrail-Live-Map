import TrainGeneralInfo from "./TrainGeneralInfo";
import TrainTimetable from "./TrainTimetable";
import { trains } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";
import { TrainDetailsType } from "@/lib/types/types";
import { PiPath, PiPathBold } from "react-icons/pi";
import TrainDetailsLite from "./TrainDetailsLite";
import { transformVehicles } from "@/lib/utils/utils";
import { cargoTrainsData } from "@/lib/constants/cargoTrainsData";
import { Tooltip } from "@nextui-org/tooltip";
import { tooltipDelay } from "@/lib/constants/uistyles";

const tooltipStyle = {
  base: ["before:bg-light_primary_light dark:before:bg-primary_dark"],
  content: [
    "p-1.5 shadow-xl rounded-md",
    "text-[10px] text-primary dark:text-light_gray bg-light_primary_light dark:bg-primary_dark",
  ],
};

const TrainDetails = ({
  trainNumber,
  trainName,
  departure,
  destination,
  speed,
  user,
  signal,
  signalSpeed,
  signalDistance,
  vehicles,
  timeOffset,
  serverCode,
  view,
  setView,
  follow,
  setFollow,
  showPath,
  setShowPath,
  showDetailsLite,
  showSignalInfo,
  isDLC,
}: TrainDetailsType) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ maxWidth: 839 });
  const showLite = showDetailsLite || isMobile;

  const username = user?.name || "User";

  const vehicleData = transformVehicles(vehicles);
  const wagons = vehicleData.wagons;
  const locomotives = vehicleData.locomotives;
  let totalLength = Math.round(vehicleData.totalLength);
  let totalWeight = Math.round(vehicleData.totalWeight);

  // if (trainNumber.length >= 6 && cargoTrainsData[trainNumber as keyof typeof cargoTrainsData]) {
  //   totalLength = cargoTrainsData[trainNumber as keyof typeof cargoTrainsData].length;
  //   totalWeight = cargoTrainsData[trainNumber as keyof typeof cargoTrainsData].weight;
  // }
  if (trainNumber.length >= 6) {
    totalLength = 0;
    totalWeight = 0;
  }

  return showLite ? (
    <TrainDetailsLite
      trainNumber={trainNumber}
      trainName={trainName}
      departure={departure}
      destination={destination}
      speed={speed}
      signal={signal}
      signalSpeed={signalSpeed}
      signalDistance={signalDistance}
      user={user}
      vehicles={vehicles}
      timeOffset={timeOffset}
      serverCode={serverCode}
      view={view}
      setView={setView}
      follow={follow}
      setFollow={setFollow}
      showPath={showPath}
      setShowPath={setShowPath}
      username={username}
      showDetailsLite={showDetailsLite}
      showSignalInfo={showSignalInfo}
      wagons={wagons}
      totalLength={totalLength}
      totalWeight={totalWeight}
      isDLC={isDLC}
    />
  ) : (
    <div className="flex absolute flex-col gap-4 top-2.5 right-3 w-64 lg:w-72 max-h-[80dvh] p-4 z-[1000] rounded-lg border-1 shadow-lg text-base border-slate-400 dark:border-slate-800 text-primary_dark dark:text-white bg-light_primary/90 dark:bg-primary/90 backdrop-blur-sm">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col h-24 lg:h-28 w-24 lg:w-28 justify-center brightness-125 dark:brightness-105">
          <img src={"/trains/" + trains[vehicles[0]]?.img} alt="train" />
        </div>
        <div className="flex flex-col items-center leading-5">
          <h1 className="text-lg lg:text-xl text-center">
            {trainName} <span className="font-bold">{trainNumber}</span>
          </h1>
          <h2 className="text-sm lg:text-base">{trains[locomotives[0]]?.name}</h2>

          {locomotives.length > 1 && (
            <p className="text-xs text-gray-300">
              {locomotives.slice(1).map((locomotive, index) => (
                <span key={index}>
                  {trains[locomotive]?.name}
                  {index !== locomotives.length - 2 && ", "}
                </span>
              ))}
            </p>
          )}
          {isDLC && (
            <Tooltip
              content={t("Details:dlc_cp")}
              delay={500}
              showArrow={true}
              classNames={tooltipStyle}
              placement="bottom"
            >
              <div className="border border-primary dark:border-light_primary_dark mt-2 bg-light_primary_dark dark:bg-primary_light px-1 rounded-[4px] text-[10px] leading-4 font-medium opacity-80 cursor-help">
                DLC
              </div>
            </Tooltip>
          )}
        </div>
      </div>
      <div>
        <div className="flex flex-grow font-light text-slate-600 dark:text-slate-400">
          <button
            onClick={() => setView("general")}
            className={`w-full p-2 text-sm lg:text-base border-b border-transparent ${
              view === "general" && "font-medium text-primary_dark border-black dark:text-white dark:border-white"
            } ${
              view !== "general" &&
              " hover:border-slate-400 hover:text-slate-800 dark:hover:border-slate-300  dark:hover:text-slate-300"
            }`}
          >
            {t("general")}
          </button>
          <button
            onClick={() => setView("timetable")}
            className={`w-full p-2 text-sm lg:text-base border-b border-transparent  ${
              view === "timetable" && "font-medium text-primary_dark border-black dark:text-white dark:border-white"
            } ${
              view !== "timetable" &&
              " hover:border-slate-400 hover:text-slate-800 dark:hover:border-slate-300  dark:hover:text-slate-300"
            }`}
          >
            {t("timetable")}
          </button>
        </div>
        <div className="border-t opacity-30 border-primary_dark dark:border-white"></div>
      </div>
      {view === "general" && (
        <TrainGeneralInfo
          departure={departure}
          destination={destination}
          speed={speed}
          signal={signal}
          signalSpeed={signalSpeed}
          signalDistance={signalDistance}
          user={user}
          username={username}
          showSignalInfo={showSignalInfo}
          wagons={wagons}
          totalLength={totalLength}
          totalWeight={totalWeight}
        />
      )}
      {view === "timetable" && (
        <TrainTimetable
          trainNumber={trainNumber}
          serverCode={serverCode}
          timeOffset={timeOffset}
          showDetailsLite={showDetailsLite}
        />
      )}
      <Tooltip
        content={t("Details:pin_train")}
        delay={tooltipDelay}
        showArrow={true}
        classNames={tooltipStyle}
        placement="left"
      >
        <button
          className={`absolute top-3 right-3 flex items-center gap-1 p-1 rounded-lg  ${
            follow ? "bg-light_primary_dark dark:bg-primary_dark" : "bg-light_primary dark:bg-primary"
          } border-1  text-xs border-slate-400 dark:border-slate-600 text-primary_light dark:text-light_gray hover:bg-slate-400 dark:hover:bg-slate-700`}
          onClick={() => setFollow((prev) => !prev)}
        >
          {follow ? <MdPushPin className="w-5 h-5" /> : <MdOutlinePushPin className="w-5 h-5" />}
        </button>
      </Tooltip>
      <Tooltip
        content={t("Details:draw_route")}
        delay={tooltipDelay}
        showArrow={true}
        classNames={tooltipStyle}
        placement="right"
      >
        <button
          className={`absolute top-3 left-3 flex items-center gap-1 p-1 rounded-lg  ${
            showPath ? "bg-light_primary_dark dark:bg-primary_dark" : "bg-light_primary dark:bg-primary"
          } border-1  text-xs border-slate-400 dark:border-slate-600 text-primary_light dark:text-light_gray hover:bg-slate-400 dark:hover:bg-slate-700`}
          onClick={() => setShowPath((prev) => !prev)}
        >
          {showPath ? <PiPathBold className="w-5 h-5" /> : <PiPath className="w-5 h-5" />}
        </button>
      </Tooltip>
    </div>
  );
};

export default TrainDetails;
