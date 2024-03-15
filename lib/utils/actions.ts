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
