export type TrainsImgType = {
  [key: string]: string;
};

export type TrainDataType = {
  id: string;
  latitude: number;
  longitude: number;
  velocity: number;
  train_number: string;
  train_name: string;
  vehicle: { name: string }[];
  start_station: string;
  end_station: string;
  steam_user: any;
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
  difficulty_level: number;
  prefix: string;
  latitude: number;
  longitude: number;
  dispatched_by: {
    steam_user: { name: string; avatar: string; dispatcher_time: number };
  }[];
  main_image_url: string;
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
  vehicles: { name: string }[];
  departure: string;
  destination: string;
  user: {
    name: string;
    avatar: string;
  };
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
  user: { name: string; avatar: string; distance_meter: number };
  username: string;
};

export type StationMarkerProps = {
  stationName: string;
  stationPrefix: string;
  stationImage: string;
  difficulty: number;
  lat: number;
  lng: number;
  user: { name: string; avatar: string; dispatcher_time: number };
  selectedStation: string;
  setSelectedStation: (station: string) => void;
  zoomLevel: number;
  showStations: boolean;
  showOnlyAvail: boolean;
  showMarkerLabels: boolean;
  labelZoomLevel: number;
};

export type TrainDetailsType = {
  trainNumber: string;
  trainName: string;
  departure: string;
  destination: string;
  speed: number;
  user: { name: string; avatar: string; distance_meter: number };
  vehicles: { name: string }[];
  serverCode: string;
  view: string;
  setView: (view: string) => void;
  follow: boolean;
  setFollow: React.Dispatch<React.SetStateAction<boolean>>;
  showPath: boolean;
  setShowPath: React.Dispatch<React.SetStateAction<boolean>>;
};

export type StationDetailsType = {
  stationName: string;
  stationPrefix: string;
  stationImage: string;
  difficulty: number;
  user: { name: string; avatar: string; dispatcher_time: number };
  username: string;
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
};
