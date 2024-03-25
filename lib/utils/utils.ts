import { trainsImg } from "../constants";
import { SearchResultType, StationDataType, TrainDataType } from "../types/types";

export const filterSearchData = (
  searchValue: string,
  trainsData: TrainDataType[] | undefined,
  stationsData: StationDataType[] | undefined
): SearchResultType[] => {
  const lowerCaseSearchValue = searchValue.toLowerCase();
  let searchResults: SearchResultType[] = [];

  if (searchValue.length > 0) {
    if (trainsData) {
      const trainResults = trainsData
        .filter(
          (train: TrainDataType) =>
            train.train_number.toString().toLowerCase().includes(lowerCaseSearchValue) ||
            (train.steam_user?.name && train.steam_user.name.toLowerCase().includes(lowerCaseSearchValue))
        )
        .map((train) => ({
          id: train.id,
          label: train.train_number,
          username: train.steam_user?.name || "",
          image: `/trains/${trainsImg[train.vehicle[0]?.name]}`,
          type: "train" as "train",
        }));
      searchResults = searchResults.concat(trainResults);
    }

    if (stationsData) {
      const stationResults = stationsData
        .filter(
          (station: StationDataType) =>
            station.name.toLowerCase().includes(lowerCaseSearchValue) ||
            (station.dispatched_by[0]?.steam_user?.name &&
              station.dispatched_by[0]?.steam_user?.name.toLowerCase().includes(lowerCaseSearchValue))
        )
        .map((station: StationDataType) => ({
          id: station.id,
          label: station.name,
          username: station.dispatched_by[0]?.steam_user?.name || "",
          image: "",
          type: "station" as "station",
        }));
      searchResults = searchResults.concat(stationResults);
    }
  }

  return searchResults;
};

export const getUserInfo = async (user: string) => {
  try {
    const query = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_WEB_API_KEY}&format=json&steamids=${user}`
    );
    const response = await query.json();
    const username = response.response.players[0].personaname;
    const avatar = response.response.players[0].avatar;

    return { username, avatar };
  } catch (err) {
    console.log(err);
  }
};

export const getTimetable = async (serverCode: string, trainNumber: string) => {
  try {
    const query = await fetch(
      `https://api1.aws.simrail.eu:8082/api/getAllTimetables?serverCode=${serverCode}&train=${trainNumber}`
    );
    const response = await query.json();

    return { response };
  } catch (err) {
    console.log(err);
  }
};

export const getMapInfo = async (link: string) => {
  try {
    const query = await fetch(link);
    const response = await query.json();

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const calcDelay = (
  timezoneOffset: number,
  serverCode: string,
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
    Math.abs(actualDate.getTime() - scheduledDate2.getTime()) > 12 * 60 * 60 * 1000
      ? new Date(scheduledDate2.getTime() + 24 * 60 * 60 * 1000)
      : scheduledDate2;
  let differenceInMinutes = Math.floor((actualDate.getTime() - scheduledDateAdjusted.getTime()) / (1000 * 60));

  if (differenceInMinutes > 1000) {
    differenceInMinutes -= 1440;
  } else if (differenceInMinutes < -1000) {
    differenceInMinutes += 1440;
  }

  if (["pl2", "pl4", "fr1", "es1", "cz1", "de1", "de3"].includes(serverCode) && timezoneOffset !== 1) {
    differenceInMinutes += (timezoneOffset + 1) * 60;
  } else if (["pl3", "de4"].includes(serverCode) && timezoneOffset !== -10) {
    differenceInMinutes += (timezoneOffset - 10) * 60;
  } else if (["pl8"].includes(serverCode) && timezoneOffset !== -6) {
    differenceInMinutes += (timezoneOffset - 6) * 60;
  } else if (["ua1"].includes(serverCode) && timezoneOffset !== 2) {
    differenceInMinutes += (timezoneOffset + 2) * 60;
  } else if (["en2"].includes(serverCode) && timezoneOffset !== -12) {
    differenceInMinutes += (timezoneOffset - 12) * 60;
  } else if (["en3"].includes(serverCode) && timezoneOffset !== -5) {
    differenceInMinutes += (timezoneOffset - 5) * 60;
  } else if (["cn1"].includes(serverCode) && timezoneOffset !== 8) {
    differenceInMinutes += (timezoneOffset + 8) * 60;
  }

  if (!actual) return;

  if (type === "departure" && differenceInMinutes >= 1 && stopType === "PH") return differenceInMinutes - 1;
  return differenceInMinutes;
};

export const formatTime = (time: string) => {
  if (!time) return;
  return new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDelay = (delay: number, currentPoint: any, previousPoint: any) => {
  const currentDateTime = new Date(currentPoint);
  const previousDateTime = new Date(previousPoint);

  if (currentDateTime > previousDateTime) {
    return delay >= 0 ? `(+${delay})` : `(${delay})`;
  } else {
    return "";
  }
};
