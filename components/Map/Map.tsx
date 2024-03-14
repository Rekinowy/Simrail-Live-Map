"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import useSWR from "swr";
import TrainMarker from "./TrainMarker";
import StationMarker from "./StationMarker";
import { useEffect, useState } from "react";
import Control from "react-leaflet-custom-control";
import Link from "next/link";
import { trainStations, trainsImg } from "@/constants";
import { Icon } from "leaflet";
import SettingsTab from "./SettingsTab";
import { NextUIProvider } from "@nextui-org/system";
import SearchBox from "./SearchBox";
import MapControl from "./MapControl";
import TrainDetails from "./TrainDetails";
import { ImArrowLeft } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "@/context/ThemeContext";
import { GiLever } from "react-icons/gi";

const stationIcon = new Icon({
  iconUrl: "/station.png",
  iconSize: [18, 18],
  iconAnchor: [10, 10],
  popupAnchor: [3, -12],
});

export type TrainDataType = {
  id: number;
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

export default function Map({ code }: { code: string }) {
  const [selectedMarker, setSelectedMarker] = useState("");
  const [showTrains, setShowTrains] = useState(true);
  const [showStations, setShowStations] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(8);
  const [openSettings, setOpenSettings] = useState(false);
  const [selectedLocos, setSelectedLocos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { theme, toggleTheme } = useTheme();

  const [filteredResults, setFilteredResults] = useState<SearchResultType[]>(
    []
  );
  const [trainLabelZoomLevel, setTrainLabelZoomLevel] = useState(() => {
    const saved = localStorage.getItem("trainLabelZoomLevel");
    if (saved) {
      return JSON.parse(saved);
    }
    return 12;
  });
  const [stationLabelZoomLevel, setStationLabelZoomLevel] = useState(() => {
    const saved = localStorage.getItem("stationLabelZoomLevel");
    if (saved) {
      return JSON.parse(saved);
    }
    return 12;
  });
  const [trainStopsZoomLevel, setTrainStopsZoomLevel] = useState(() => {
    const saved = localStorage.getItem("trainStopsZoomLevel");
    if (saved) {
      return JSON.parse(saved);
    }
    return 12;
  });
  const [showMarkerLabels, setShowMarkerLabels] = useState(() => {
    const saved = localStorage.getItem("showMarkerLabels");
    if (saved) {
      return JSON.parse(saved);
    }
    return true;
  });
  const [showStationLabels, setShowStationLabels] = useState(() => {
    const saved = localStorage.getItem("showStationLabels");
    if (saved) {
      return JSON.parse(saved);
    }
    return true;
  });
  const [showTrainStops, setShowTrainStops] = useState(() => {
    const saved = localStorage.getItem("showTrainStops");
    if (saved) {
      return JSON.parse(saved);
    }
    return true;
  });
  const [showOnlyAvail, setShowOnlyAvail] = useState(() => {
    const saved = localStorage.getItem("showOnlyAvail");
    if (saved) {
      return JSON.parse(saved);
    }
    return false;
  });
  const [trainDetailsView, setTrainDetailsView] = useState(() => {
    const saved = localStorage.getItem("trainDetailsView");
    if (saved) {
      return JSON.parse(saved);
    }
    return "general";
  });
  const [followTrain, setFollowTrain] = useState(() => {
    const saved = localStorage.getItem("followTrain");
    if (saved) {
      return JSON.parse(saved);
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem("showMarkerLabels", JSON.stringify(showMarkerLabels));
    localStorage.setItem(
      "showStationLabels",
      JSON.stringify(showStationLabels)
    );
  }, [showMarkerLabels, showStationLabels]);
  useEffect(() => {
    localStorage.setItem(
      "trainLabelZoomLevel",
      JSON.stringify(trainLabelZoomLevel)
    );
    localStorage.setItem(
      "stationLabelZoomLevel",
      JSON.stringify(stationLabelZoomLevel)
    );
  }, [trainLabelZoomLevel, stationLabelZoomLevel]);
  useEffect(() => {
    localStorage.setItem(
      "trainStopsZoomLevel",
      JSON.stringify(trainStopsZoomLevel)
    );
  }, [trainStopsZoomLevel]);
  useEffect(() => {
    localStorage.setItem("showTrainStops", JSON.stringify(showTrainStops));
  }, [showTrainStops]);
  useEffect(() => {
    localStorage.setItem("showOnlyAvail", JSON.stringify(showOnlyAvail));
  }, [showOnlyAvail]);
  useEffect(() => {
    localStorage.setItem("trainDetailsView", JSON.stringify(trainDetailsView));
  }, [trainDetailsView]);
  useEffect(() => {
    localStorage.setItem("followTrain", JSON.stringify(followTrain));
  }, [followTrain]);

  const TRAINS_API_URL = `https://simrail-edr.de/api/train/${code}`;
  const STATIONS_API_URL = `https://simrail-edr.de/api/stations/${code}`;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const trains = useSWR(TRAINS_API_URL, fetcher, {
    refreshInterval: 5000,
  });

  const stations = useSWR(STATIONS_API_URL, fetcher, {
    refreshInterval: 5000,
  });

  // Search data filtering
  useEffect(() => {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    let searchResults: SearchResultType[] = [];

    if (searchValue.length > 0) {
      if (trains.data?.data) {
        const trainResults = trains.data.data
          .filter(
            (train: TrainDataType) =>
              train.train_number
                .toString()
                .toLowerCase()
                .includes(lowerCaseSearchValue) ||
              (train.steam_user?.name &&
                train.steam_user.name
                  .toLowerCase()
                  .includes(lowerCaseSearchValue))
          )
          .map((train: TrainDataType) => ({
            id: train.id,
            label: train.train_number,
            username: train.steam_user?.name || "",
            image: `/trains/${trainsImg[train.vehicle[0]?.name]}`,
            type: "train",
          }));
        searchResults = searchResults.concat(trainResults);
      }

      if (stations.data?.data) {
        const stationResults = stations.data.data
          .filter(
            (station: StationDataType) =>
              station.name.toLowerCase().includes(lowerCaseSearchValue) ||
              (station.dispatched_by[0]?.steam_user?.name &&
                station.dispatched_by[0]?.steam_user?.name
                  .toLowerCase()
                  .includes(lowerCaseSearchValue))
          )
          .map((station: StationDataType) => ({
            id: station.id,
            label: station.name,
            username: station.dispatched_by[0]?.steam_user?.name || "",
            image: (
              <GiLever className="w-8 h-8 text-primary dark:text-light_gray" />
            ),
            type: "station",
          }));
        searchResults = searchResults.concat(stationResults);
      }
    }

    setFilteredResults(searchResults);
  }, [searchValue, trains.data?.data, stations.data?.data]);

  return (
    <NextUIProvider>
      <MapContainer
        className="flex w-full h-[100dvh]"
        center={[51.2546195, 20.1220594]}
        zoom={8}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; SimRail Live Map'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles transition-all"
        />

        <Control prepend position="topleft">
          <Link
            href="/"
            className="flex justify-center items-center w-[30px] h-[30px] rounded-sm shadow-sm"
          >
            <ImArrowLeft className="text-primary dark:text-light_gray" />
          </Link>
        </Control>
        <Control position="topleft">
          <button
            className="flex justify-center items-center w-[30px] h-[30px] rounded-sm shadow-sm"
            onClick={() => setOpenSettings((prev) => !prev)}
          >
            <IoMdSettings className="w-4 h-4 text-primary dark:text-light_gray" />
          </button>
        </Control>
        <Control position="topleft">
          <button
            className="flex justify-center items-center w-[30px] h-[30px] rounded-sm shadow-sm"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <MdDarkMode className="w-4 h-4 text-primary dark:text-light_gray" />
            ) : (
              <MdLightMode className="w-4 h-4 text-primary dark:text-light_gray" />
            )}
          </button>
        </Control>

        {showTrainStops &&
          zoomLevel >= trainStopsZoomLevel &&
          trainStations.map((station: any) => {
            return (
              <Marker
                key={station.name}
                position={station.pos}
                icon={stationIcon}
                zIndexOffset={-100}
                eventHandlers={{
                  mouseover: (event) => {
                    event.target.openPopup();
                  },
                  mouseout: (event) => {
                    event.target.closePopup();
                  },
                }}
              >
                <Popup
                  closeButton={false}
                  offset={[-2, 10]}
                  className="custom-popup train-stop"
                >
                  <div className="w-full text-center">{station.name}</div>
                </Popup>
              </Marker>
            );
          })}

        {trains.data?.data &&
          trains.data.data.map((train: TrainDataType) => {
            return (
              <TrainMarker
                key={train.id}
                lat={train.latitude}
                lng={train.longitude}
                speed={train.velocity}
                trainNumber={train.train_number}
                trainName={train.train_name}
                vehicles={train.vehicle}
                departure={train.start_station}
                destination={train.end_station}
                user={train?.steam_user}
                selectedTrain={selectedMarker}
                setSelectedTrain={setSelectedMarker}
                zoomLevel={zoomLevel}
                showTrains={showTrains}
                showOnlyAvail={showOnlyAvail}
                showMarkerLabels={showMarkerLabels}
                labelZoomLevel={trainLabelZoomLevel}
                selectedLocos={selectedLocos}
                serverCode={code}
                follow={followTrain}
              />
            );
          })}

        {stations.data?.data.map((station: StationDataType) => {
          return (
            <StationMarker
              key={station.id}
              stationName={station.name}
              stationPrefix={station.prefix}
              stationImage={station.main_image_url}
              difficulty={station.difficulty_level}
              lat={station.latitude}
              lng={station.longitude}
              user={station.dispatched_by[0]?.steam_user}
              selectedStation={selectedMarker}
              setSelectedStation={setSelectedMarker}
              zoomLevel={zoomLevel}
              showStations={showStations}
              showOnlyAvail={showOnlyAvail}
              showMarkerLabels={showStationLabels}
              labelZoomLevel={stationLabelZoomLevel}
            />
          );
        })}

        <MapControl
          setOpenSettings={setOpenSettings}
          setZoomLevel={setZoomLevel}
          setSelectedMarker={setSelectedMarker}
        />
      </MapContainer>

      {trains.data?.data.map((train: TrainDataType) => {
        return (
          selectedMarker == train.train_number && (
            <TrainDetails
              key={train.id}
              trainNumber={train.train_number}
              trainName={train.train_name}
              vehicles={train.vehicle}
              departure={train.start_station}
              destination={train.end_station}
              speed={train.velocity}
              user={train.steam_user}
              serverCode={code}
              view={trainDetailsView}
              setView={setTrainDetailsView}
              follow={followTrain}
              setFollow={setFollowTrain}
            />
          )
        );
      })}

      <SearchBox
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        filteredResults={filteredResults}
        setSelectedMarker={setSelectedMarker}
        setSelectedLocos={setSelectedLocos}
      />
      {openSettings && (
        <SettingsTab
          setOpenSettings={setOpenSettings}
          showTrainStops={showTrainStops}
          setShowTrainStops={setShowTrainStops}
          showOnlyAvail={showOnlyAvail}
          setShowOnlyAvail={setShowOnlyAvail}
          showMarkerLabels={showMarkerLabels}
          setShowMarkerLabels={setShowMarkerLabels}
          showStationLabels={showStationLabels}
          setShowStationLabels={setShowStationLabels}
          trainLabelZoomLevel={trainLabelZoomLevel}
          setTrainLabelZoomLevel={setTrainLabelZoomLevel}
          stationLabelZoomLevel={stationLabelZoomLevel}
          setStationLabelZoomLevel={setStationLabelZoomLevel}
          trainStopsZoomLevel={trainStopsZoomLevel}
          setTrainStopsZoomLevel={setTrainStopsZoomLevel}
          selectedLocos={selectedLocos}
          setSelectedLocos={setSelectedLocos}
          showTrains={showTrains}
          setShowTrains={setShowTrains}
          showStations={showStations}
          setShowStations={setShowStations}
        />
      )}
    </NextUIProvider>
  );
}
