import { calcDelay, formatDelay, formatTime } from "@/lib/utils/utils";
import { useEffect, useRef } from "react";
import Spinner from "../UI/Spinner";
import { useTranslation } from "react-i18next";
import { GoAlertFill } from "react-icons/go";

const TrainTimetable = ({
  timetable,
  serverCode,
  timeOffset,
  showDetailsLite,
}: {
  timetable: any[];
  serverCode: string;
  timeOffset: number;
  showDetailsLite: boolean;
}) => {
  const { t } = useTranslation();
  const lastPassedStationRef = useRef(null);
  let timezoneOffset = timeOffset || 0;

  const lastPassedStationIndex = (() => {
    let lastIndex = -1;

    for (let i = 0; i < timetable?.length; i++) {
      if (timetable[i].passed_station) {
        const currentDate = new Date(timetable[i].passed_station);
        const lastDate = lastIndex !== -1 ? new Date(timetable[lastIndex].passed_station) : null;

        if (!lastDate || currentDate > lastDate) {
          lastIndex = i;
        }
      }
    }

    return lastIndex;
  })();

  useEffect(() => {
    if (lastPassedStationRef.current) {
      (lastPassedStationRef.current as HTMLElement).scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [lastPassedStationIndex]);

  return (
    <>
      {!timetable ? (
        <Spinner />
      ) : timetable.length === 0 ? (
        <div className="py-4 text-center opacity-70">
          <h1 className="text-sm pb-2">{t("timetable_unavailable")}</h1>
          <h2>Sorry! 😟</h2>
        </div>
      ) : (
        <>
          {/* <div className="flex gap-3 px-2 pb-1 items-center text-gray-700 dark:text-gray-300">
            <div>
              <GoAlertFill />
            </div>
            <div className="text-xs">{t("timetable_alert")}</div>
          </div> */}
          <ul className="flex flex-col mx-2 md:mx-0 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-light_primary_dark dark:scrollbar-thumb-primary_dark/80 scrollbar-track-light_primary_light/60 dark:scrollbar-track-primary/70 scrollbar-thumb-rounded-lg">
            {timetable?.map(
              (
                point: {
                  id: number;
                  name: string;
                  scheduled_arrival: string;
                  scheduled_departure: string;
                  arrived_station: string;
                  passed_station: string;
                  stop_type: string;
                  terminal: string;
                  track: string;
                },
                index
              ) => {
                const isBeforeOrLastPassedStation = index <= (lastPassedStationIndex ?? -1);
                const isFirstNonPassedStation = index === (lastPassedStationIndex ?? -1) + 1;

                const scheduledArrival = formatTime(point.scheduled_arrival);
                const scheduledDeparture = formatTime(point.scheduled_departure);
                const actualArrival = formatTime(point.arrived_station);
                const actualDeparture = formatTime(point.passed_station);

                const arrivalDelay = calcDelay(
                  timezoneOffset,
                  serverCode,
                  point.arrived_station,
                  point.scheduled_arrival,
                  point.stop_type,
                  "arrival"
                );
                const departureDelay = calcDelay(
                  timezoneOffset,
                  serverCode,
                  point.passed_station,
                  point.scheduled_departure,
                  point.stop_type,
                  "departure"
                );

                return (
                  <li
                    ref={index === lastPassedStationIndex ? lastPassedStationRef : null}
                    key={point.id}
                    className="flex gap-4
            "
                  >
                    <div className="relative flex justify-center items-center">
                      <div
                        className={`absolute w-1 ${
                          index === 0 ? "h-1/2 bottom-0" : index === timetable.length - 1 ? "h-1/2 top-0" : "h-full"
                        } bg-slate-200 dark:bg-slate-700`}
                      ></div>
                      <div
                        className={`w-4 h-4 z-10 rounded-full ${
                          isBeforeOrLastPassedStation
                            ? "bg-slate-200 dark:bg-slate-700"
                            : isFirstNonPassedStation
                            ? actualArrival
                              ? "bg-lime-600 dark:bg-lime-700"
                              : "bg-slate-400 dark:bg-slate-300"
                            : "bg-slate-100 dark:bg-slate-600"
                        }`}
                      ></div>
                    </div>
                    <div
                      className={`flex w-full gap-1 p-2 my-2 rounded-md border  ${
                        isFirstNonPassedStation
                          ? actualArrival
                            ? "border-lime-600 bg-light_primary_dark dark:border-lime-700 dark:bg-primary_dark"
                            : "border-slate-500 bg-light_primary_dark dark:border-slate-400 dark:bg-primary_dark"
                          : "border-slate-400/50 bg-light_primary_dark/40 dark:border-slate-800 dark:bg-primary_dark/70 "
                      } ${isBeforeOrLastPassedStation && "opacity-60"}`}
                    >
                      <div className={`flex flex-col w-full gap-1 ${showDetailsLite ? "text-xs" : "text-sm"}`}>
                        <div className="capitalize text-primary font-medium dark:font-normal dark:text-slate-100">
                          {point.name.charAt(1) === point.name.charAt(1).toUpperCase()
                            ? point.name.toLowerCase()
                            : point.name}
                        </div>
                        <div className=" text-primary dark:text-slate-300">
                          <p>
                            {point.scheduled_arrival && scheduledArrival !== scheduledDeparture && (
                              <>
                                {scheduledArrival}
                                {arrivalDelay != 0 && arrivalDelay && lastPassedStationIndex + 2 > index && (
                                  <span
                                    className={`${
                                      showDetailsLite ? "text-[10px]" : "text-xs"
                                    } font-medium dark:font-normal ${
                                      arrivalDelay < 0
                                        ? "text-lime-700 dark:text-lime-600"
                                        : arrivalDelay < 10
                                        ? "text-yellow-600 dark:text-yellow-500"
                                        : "text-red-600 dark:text-red-400"
                                    }`}
                                  >
                                    {" "}
                                    {formatDelay(
                                      arrivalDelay,
                                      point.arrived_station,
                                      timetable[index - 1]?.arrived_station
                                    )}{" "}
                                  </span>
                                )}
                                <span>{" — "}</span>
                              </>
                            )}
                            {scheduledDeparture}
                            {lastPassedStationIndex + 1 > index && departureDelay != 0 && departureDelay && (
                              <span
                                className={`${
                                  showDetailsLite ? "text-[10px]" : "text-xs"
                                } font-medium dark:font-normal ${
                                  departureDelay < 0
                                    ? "text-lime-700 dark:text-lime-600"
                                    : departureDelay < 10
                                    ? "text-yellow-600 dark:text-yellow-500"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {" "}
                                {formatDelay(
                                  departureDelay,
                                  point?.passed_station,
                                  timetable[index - 1]?.passed_station
                                )}{" "}
                              </span>
                            )}
                            {lastPassedStationIndex < index &&
                              scheduledArrival == scheduledDeparture &&
                              actualArrival &&
                              !actualDeparture &&
                              arrivalDelay != 0 &&
                              arrivalDelay && (
                                <span
                                  className={`${
                                    showDetailsLite ? "text-[10px]" : "text-xs"
                                  } font-medium dark:font-normal  ${
                                    arrivalDelay < 0
                                      ? "text-lime-700 dark:text-lime-600"
                                      : arrivalDelay < 10
                                      ? "text-yellow-600 dark:text-yellow-500"
                                      : "text-red-600 dark:text-red-400"
                                  }`}
                                >
                                  {" "}
                                  {formatDelay(
                                    arrivalDelay,
                                    point?.arrived_station,
                                    timetable[index - 1]?.passed_station
                                  )}{" "}
                                </span>
                              )}
                          </p>
                        </div>
                      </div>
                      {point.stop_type !== "PH" &&
                        scheduledArrival &&
                        point.stop_type &&
                        scheduledArrival !== scheduledDeparture && (
                          <div className="h-fit min-w-[30px] px-1 mt-0.5 text-[10px] leading-4 lg:text-xs text-center rounded-md text-slate-200 dark:text-slate-300 bg-orange-700/70 dark:bg-orange-800/50 border border-orange-700/70 dark:border-orange-800/50 ">
                            pt
                          </div>
                        )}
                      {point.stop_type == "PH" && (
                        <div className="flex flex-col gap-2">
                          <div
                            className={`min-w-[32px] px-1 mt-0.5 text-[10px]
                        leading-4 text-center rounded-md text-slate-200 dark:text-slate-300 border bg-lime-600 border-lime-700 dark:bg-lime-800 dark:border-lime-700`}
                          >
                            ph
                          </div>
                          {point.terminal && (
                            <div className="min-w-[32px] px-0.5 text-[10px] leading-4 lg:text-xs text-center rounded-md text-slate-200 dark:text-slate-300 bg-slate-600 dark:bg-slate-700 border border-slate-700 dark:border-slate-600">
                              {point.terminal}/{point.track}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        </>
      )}
    </>
  );
};
export default TrainTimetable;
