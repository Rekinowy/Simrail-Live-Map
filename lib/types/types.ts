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
