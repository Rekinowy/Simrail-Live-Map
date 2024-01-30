import { useEffect, useRef } from "react";

const TrainTimetable = ({ timetable }: { timetable: any[] }) => {
  const lastPassedStationRef = useRef(null);

  const lastPassedStationIndex = (() => {
    let lastIndex = -1;

    for (let i = 0; i < timetable?.length; i++) {
      if (timetable[i].passed_station) {
        const currentDate = new Date(timetable[i].passed_station);
        const lastDate =
          lastIndex !== -1
            ? new Date(timetable[lastIndex].passed_station)
            : null;

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

  const calcDelay = (
    actual: string = "",
    scheduled: string = "",
    stopType: string,
    type: string
  ) => {
    const actualDate = new Date(actual);
    const scheduledDate = new Date(scheduled);
    const scheduledDate2 =
      scheduledDate.getFullYear() === 2023
        ? new Date(
            actualDate.getFullYear(),
            actualDate.getMonth(),
            actualDate.getDate(),
            scheduledDate.getHours(),
            scheduledDate.getMinutes(),
            scheduledDate.getSeconds()
          )
        : scheduledDate;
    const scheduledDateAdjusted =
      scheduledDate2.getDate() < actualDate.getDate() &&
      Math.abs(actualDate.getTime() - scheduledDate2.getTime()) >
        12 * 60 * 60 * 1000
        ? new Date(scheduledDate2.getTime() + 24 * 60 * 60 * 1000)
        : scheduledDate2;
    const differenceInMinutes = Math.floor(
      (actualDate.getTime() - scheduledDateAdjusted.getTime()) / (1000 * 60)
    );

    if (!actual) return;
    if (type === "departure" && differenceInMinutes >= 1 && stopType === "PH")
      return differenceInMinutes - 1;
    return differenceInMinutes;
  };

  const formatTime = (time: string) => {
    if (!time) return;
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDelay = (
    delay: number,
    currentPoint: any,
    previousPoint: any
  ) => {
    const currentDateTime = new Date(currentPoint);
    const previousDateTime = new Date(previousPoint);

    if (currentDateTime > previousDateTime) {
      return delay >= 0 ? `(+${delay})` : `(${delay})`;
    } else {
      return "";
    }
  };

  return (
    <div className="flex flex-col pr-2 overflow-y-auto scrollbar scrollbar-w-2 scrollbar-h-2 scrollbar-thumb-primary_dark/80 scrollbar-track-primary/70 scrollbar-thumb-rounded-lg">
      {timetable?.map(
        (
          point: {
            id: string;
            station: { name: string };
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
          const isBeforeOrLastPassedStation =
            index <= (lastPassedStationIndex ?? -1);
          const isFirstNonPassedStation =
            index === (lastPassedStationIndex ?? -1) + 1;

          const scheduledArrival = formatTime(point.scheduled_arrival);
          const scheduledDeparture = formatTime(point.scheduled_departure);
          const actualArrival = formatTime(point.arrived_station);
          const actualDeparture = formatTime(point.passed_station);

          const arrivalDelay = calcDelay(
            point.arrived_station,
            point.scheduled_arrival,
            point.stop_type,
            "arrival"
          );
          const departureDelay = calcDelay(
            point.passed_station,
            point.scheduled_departure,
            point.stop_type,
            "departure"
          );

          return (
            <div
              ref={
                index === lastPassedStationIndex ? lastPassedStationRef : null
              }
              key={point.id}
              className="flex gap-4"
            >
              <div className="relative flex justify-center items-center">
                <div
                  className={`absolute w-1 ${
                    index === 0
                      ? "h-1/2 bottom-0"
                      : index === timetable.length - 1
                      ? "h-1/2 top-0"
                      : "h-full"
                  } bg-slate-700`}
                ></div>
                <div
                  className={`w-4 h-4 z-10 rounded-full ${
                    isBeforeOrLastPassedStation
                      ? "bg-slate-700"
                      : isFirstNonPassedStation
                      ? actualArrival
                        ? "bg-lime-700"
                        : "bg-slate-300"
                      : "bg-slate-500"
                  }`}
                ></div>
              </div>
              <div
                className={`flex w-full gap-1 p-2 my-2 rounded-lg border-2  ${
                  isFirstNonPassedStation
                    ? actualArrival
                      ? "border-lime-700 bg-primary_dark"
                      : "border-slate-400 bg-primary_dark"
                    : "border-slate-800 bg-primary_dark/70 "
                } ${isBeforeOrLastPassedStation && "opacity-60"}`}
              >
                <div className="flex flex-col w-full gap-1">
                  <div className="capitalize text-slate-100 text-sm lg:text-base">
                    {point.station.name.charAt(1) ===
                    point.station.name.charAt(1).toUpperCase()
                      ? point.station.name.toLowerCase()
                      : point.station.name}
                  </div>
                  <div className="text-xs lg:text-sm text-slate-300">
                    <p>
                      {point.scheduled_arrival &&
                        scheduledArrival !== scheduledDeparture && (
                          <>
                            {scheduledArrival}
                            {arrivalDelay != 0 &&
                              arrivalDelay &&
                              lastPassedStationIndex + 2 > index && (
                                <span
                                  className={`text-[10px] lg:text-xs ${
                                    arrivalDelay < 0
                                      ? "text-lime-600"
                                      : arrivalDelay < 10
                                      ? "text-yellow-500"
                                      : "text-red-400"
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
                      {lastPassedStationIndex + 1 > index &&
                        departureDelay != 0 &&
                        departureDelay && (
                          <span
                            className={`text-[10px] lg:text-xs  ${
                              departureDelay < 0
                                ? "text-lime-600"
                                : departureDelay < 10
                                ? "text-yellow-500"
                                : "text-red-400"
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
                            className={`text-[10px] lg:text-xs  ${
                              arrivalDelay < 0
                                ? "text-lime-600"
                                : arrivalDelay < 10
                                ? "text-yellow-500"
                                : "text-red-400"
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
                    <div className="h-fit min-w-[30px] px-1 mt-0.5 text-[10px] leading-4 lg:text-xs text-center rounded-md text-slate-300 bg-orange-800/50 border border-orange-800/50 bg">
                      pt
                    </div>
                  )}
                {point.stop_type == "PH" && (
                  <div className="flex flex-col gap-2">
                    <div className="min-w-[30px] px-1 mt-0.5 text-[10px] leading-4 lg:text-xs text-center rounded-md text-slate-300 bg-lime-800 border border-lime-700">
                      ph
                    </div>
                    {point.terminal && (
                      <div className="min-w-[30px] px-1 text-[10px] leading-4 lg:text-xs text-center rounded-md text-slate-300 bg-slate-700 border border-slate-600">
                        {point.terminal}/{point.track}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
export default TrainTimetable;
