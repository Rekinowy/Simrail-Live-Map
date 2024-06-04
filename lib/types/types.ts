import { LatLngExpression } from "leaflet";

export type TrainsType = {
  [key: string]: {
    img: string;
    name: string;
  };
};

export type UserType = {
  name: string;
  avatar: string;
  type: "bot" | "user";
  distance: number;
  dispatcher_time: number;
};

export type TrainDataType = {
  id: string;
  lat: number;
  lng: number;
  velocity: number;
  number: string;
  name: string;
  vehicles: [string];
  departure: string;
  destination: string;
  user: UserType;
  timezone_offset: number;
  view: string;
  setView: (view: string) => void;
  followTrain: boolean;
  setFollowTrain: (follow: boolean) => void;
  showPath: boolean;
  setShowPath: (showPath: boolean) => void;
};

export type StationDataType = {
  id: string;
  name: string;
  prefix: string;
  difficulty: number;
  image: string;
  lat: number;
  lng: number;
  user: UserType;
};

export type SearchResultType = {
  id: string;
  label: string;
  username: string;
  image: string;
  type: "train" | "station";
};

export type SearchBoxProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  setSelectedMarker: (value: string) => void;
  setSelectedLocos: (value: any) => void;
  filteredResults: SearchResultType[];
};

export type SearchItemProps = {
  item: SearchResultType;
  setSelectedMarker: (label: string) => void;
  setSearchValue: (value: string) => void;
  setSelectedLocos: (locos: any[]) => void;
};

export type TrainMarkerProps = {
  lat: number;
  lng: number;
  speed: number;
  trainNumber: string;
  trainName: string;
  vehicles: [string];
  departure: string;
  destination: string;
  user: UserType;
  selectedTrain: string;
  setSelectedTrain: (train: string) => void;
  zoomLevel: number;
  showTrains: boolean;
  showOnlyAvail: boolean;
  showMarkerLabels: boolean;
  labelZoomLevel: number;
  selectedLocos: string[];
  serverCode: string;
  follow: boolean;
};

export type TrainGeneralType = {
  departure: string;
  destination: string;
  speed: number;
  user: UserType;
  username: string;
};

export type StationMarkerProps = {
  stationName: string;
  stationPrefix: string;
  stationImage: string;
  difficulty: number;
  lat: number;
  lng: number;
  user: UserType;
  selectedStation: string;
  setSelectedStation: (station: string) => void;
  zoomLevel: number;
  showStations: boolean;
  showOnlyAvail: boolean;
  showMarkerLabels: boolean;
  labelZoomLevel: number;
  showDetailsLite: boolean;
};

export type TrainDetailsType = {
  trainNumber: string;
  trainName: string;
  departure: string;
  destination: string;
  speed: number;
  user: UserType;
  vehicles: [string];
  timeOffset: number;
  serverCode: string;
  view: string;
  setView: (view: string) => void;
  follow: boolean;
  setFollow: React.Dispatch<React.SetStateAction<boolean>>;
  showPath: boolean;
  setShowPath: React.Dispatch<React.SetStateAction<boolean>>;
  showDetailsLite: boolean;
};

export type StationDetailsType = {
  stationName: string;
  stationPrefix: string;
  stationImage: string;
  difficulty: number;
  user: UserType;
  username: string;
  showDetailsLite: boolean;
};

export type SettingsTabTypes = {
  setOpenSettings: (value: boolean) => void;
  showTrainStops: boolean;
  setShowTrainStops: (value: boolean) => void;
  showOnlyAvail: boolean;
  setShowOnlyAvail: (value: boolean) => void;
  showMarkerLabels: boolean;
  setShowMarkerLabels: (value: boolean) => void;
  showStationLabels: boolean;
  setShowStationLabels: (value: boolean) => void;
  trainLabelZoomLevel: number;
  setTrainLabelZoomLevel: (value: any) => void;
  stationLabelZoomLevel: number;
  setStationLabelZoomLevel: (value: any) => void;
  trainStopsZoomLevel: number;
  setTrainStopsZoomLevel: (value: any) => void;
  selectedLocos: string[];
  setSelectedLocos: (value: any) => void;
  showTrains: boolean;
  setShowTrains: (value: boolean) => void;
  showStations: boolean;
  setShowStations: (value: boolean) => void;
  showDetailsLite: boolean;
  setShowDetailsLite: (value: boolean) => void;
};

export type StationsPosType = { [key: string]: LatLngExpression };
