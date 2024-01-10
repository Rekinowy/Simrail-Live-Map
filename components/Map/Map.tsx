"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import useSWR from "swr";
import TrainMarker from "./TrainMarker";
import StationMarker from "./StationMarker";
import { useEffect, useState } from "react";
import Control from "react-leaflet-custom-control";
import Link from "next/link";
import Image from "next/image";
import { trainStations } from "@/constants";
import { Icon } from "leaflet";
import SettingsTab from "./SettingsTab";
import { NextUIProvider } from "@nextui-org/system";
import SearchBox from "./SearchBox";
import MapControl from "./MapControl";

const stationIcon = new Icon({
  iconUrl: "/station.png",
  iconSize: [18, 18],
  iconAnchor: [10, 10],
  popupAnchor: [3, -12],
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export type TrainDataType = {
  id: string;
  TrainData: { [name: string]: number & string };
  TrainNoLocal: string;
  TrainName: string;
  Vehicles: string[];
  StartStation: string;
  EndStation: string;
  userInfo: void;
};

export type StationDataType = {
  id: string;
  Name: string;
  DifficultyLevel: number;
  Prefix: string;
  Latititude: number;
  Longitude: number;
  DispatchedBy: [{ [name: string]: string }];
  MainImageURL: string;
};

export default function Map({ code }: { code: string }) {
  const [selectedMarker, setSelectedMarker] = useState("");
  const [showTrains, setShowTrains] = useState(true);
  const [showStations, setShowStations] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(8);
  const [openSettings, setOpenSettings] = useState(false);
  const [selectedLocos, setSelectedLocos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredTrains, setFilteredTrains] = useState<TrainDataType[]>([]);
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

  const trains = useSWR(
    `https://panel.simrail.eu:8084/trains-open?serverCode=${code}`,
    fetcher,
    { refreshInterval: 5000 }
  );
  const stations = useSWR(
    `https://panel.simrail.eu:8084/stations-open?serverCode=${code}`,
    fetcher,
    { refreshInterval: 5000 }
  );

  useEffect(() => {
    if (trains.data?.data && searchValue.length > 1) {
      const searchResults = trains.data.data
        .filter((train: TrainDataType) =>
          train.TrainNoLocal.includes(searchValue)
        )
        .sort(
          (a: TrainDataType, b: TrainDataType) =>
            parseInt(a.TrainNoLocal, 10) - parseInt(b.TrainNoLocal, 10)
        );
      setFilteredTrains(searchResults);
    } else {
      setFilteredTrains([]);
    }
  }, [searchValue, trains.data?.data]);

  return (
    <NextUIProvider>
      <MapContainer
        className="flex w-full h-[100dvh]"
        center={[51.2546195, 20.1220594]}
        zoom={8}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        <Control prepend position="topleft">
          <Link
            href="/"
            className="flex justify-center items-center w-[30px] h-[30px]  rounded-sm bg-primary bg-opacity-70 shadow-sm"
          >
            <div className="w-[16px] h-[16px]">
              <Image src="/back.png" alt="Back" width={32} height={32} />
            </div>
          </Link>
        </Control>
        <Control position="topleft">
          <button
            className="flex justify-center items-center w-[30px] h-[30px] rounded-sm bg-primary bg-opacity-70 shadow-sm border border-transparent"
            onClick={() => setOpenSettings((prev) => !prev)}
          >
            <div className="w-[16px] h-[16px]">
              <Image src="/settings.png" alt="Back" width={32} height={32} />
            </div>
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

        {trains.data?.data.map((train: TrainDataType) => {
          return (
            <TrainMarker
              key={train.id}
              lat={train.TrainData.Latititute}
              lng={train.TrainData.Longitute}
              speed={train.TrainData.Velocity}
              trainNumber={train.TrainNoLocal}
              trainName={train.TrainName}
              vehicles={train.Vehicles}
              departure={train.StartStation}
              destination={train.EndStation}
              user={train.TrainData.ControlledBySteamID}
              selectedTrain={selectedMarker}
              setSelectedTrain={setSelectedMarker}
              zoomLevel={zoomLevel}
              showTrains={showTrains}
              showOnlyAvail={showOnlyAvail}
              showMarkerLabels={showMarkerLabels}
              labelZoomLevel={trainLabelZoomLevel}
              selectedLocos={selectedLocos}
            />
          );
        })}
        {stations.data?.data.map((station: StationDataType) => {
          return (
            <StationMarker
              key={station.id}
              stationName={station.Name}
              stationPrefix={station.Prefix}
              stationImage={station.MainImageURL}
              difficulty={station.DifficultyLevel}
              lat={station.Latititude}
              lng={station.Longitude}
              user={station.DispatchedBy[0]?.SteamId}
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

      <SearchBox
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        filteredTrains={filteredTrains}
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
