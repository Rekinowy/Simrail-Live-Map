"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/system";
import useSWR from "swr";

import TrainMarker from "./Map/TrainMarker";
import StationMarker from "./Map/StationMarker";
import MapConfig from "./Map/MapConfig";
import SettingsTab from "./Map/SettingsTab";
import SearchBox from "./Map/SearchBox";
import TrainDetails from "./Map/TrainDetails";
import MapControls from "./Map/MapControls";

import { filterSearchData } from "@/lib/utils/utils";
import { stationIcon, trainStops } from "@/lib/constants";
import { SearchResultType, StationDataType, TrainDataType } from "@/lib/types/types";
import { useLocalStorage } from "@/lib/hooks/hooks";
import RoutePath from "./Map/RoutePath";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Map({ code }: { code: string }) {
  const TRAINS_API_URL = `https://simrail-edr.de/api/train/${code}`;
  const STATIONS_API_URL = `https://simrail-edr.de/api/stations/${code}`;

  const [selectedMarker, setSelectedMarker] = useState("");
  const [showTrains, setShowTrains] = useState(true);
  const [showStations, setShowStations] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(8);
  const [openSettings, setOpenSettings] = useState(false);
  const [selectedLocos, setSelectedLocos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredResults, setFilteredResults] = useState<SearchResultType[]>([]);

  const [showMarkerLabels, setShowMarkerLabels] = useLocalStorage("showMarkerLabels", true);
  const [showStationLabels, setShowStationLabels] = useLocalStorage("showStationLabels", true);
  const [trainLabelZoomLevel, setTrainLabelZoomLevel] = useLocalStorage("trainLabelZoomLevel", 12);
  const [stationLabelZoomLevel, setStationLabelZoomLevel] = useLocalStorage("stationLabelZoomLevel", 12);
  const [trainStopsZoomLevel, setTrainStopsZoomLevel] = useLocalStorage("trainStopsZoomLevel", 12);
  const [showTrainStops, setShowTrainStops] = useLocalStorage("showTrainStops", true);
  const [showOnlyAvail, setShowOnlyAvail] = useLocalStorage("showOnlyAvail", false);
  const [showDetailsLite, setShowDetailsLite] = useLocalStorage("showDetailsLite", false);
  const [trainDetailsView, setTrainDetailsView] = useLocalStorage("trainDetailsView", "general");
  const [followTrain, setFollowTrain] = useLocalStorage("followTrain", true);
  const [showPath, setShowPath] = useLocalStorage("showPath", true);

  const trains = useSWR(TRAINS_API_URL, fetcher, {
    refreshInterval: 2500,
  });

  const stations = useSWR(STATIONS_API_URL, fetcher, {
    refreshInterval: 2500,
  });

  useEffect(() => {
    const results = filterSearchData(searchValue, trains.data?.data, stations.data?.data);
    setFilteredResults(results);
  }, [searchValue, trains.data?.data, stations.data?.data]);

  return (
    <NextUIProvider>
      <MapContainer className="flex w-full h-[100dvh]" center={[51.2546195, 20.1220594]} zoom={8}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; SimRail Live Map'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles transition-all"
        />
        {showPath && <RoutePath selectedTrain={selectedMarker} />}

        <MapControls setOpenSettings={setOpenSettings} />

        {showTrainStops &&
          zoomLevel >= trainStopsZoomLevel &&
          trainStops.map((station: any) => {
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
                <Popup closeButton={false} offset={[-2, 10]} className="custom-popup train-stop">
                  <div className="w-full text-center">{station.name}</div>
                </Popup>
              </Marker>
            );
          })}

        {trains.data?.data.map((train: TrainDataType) => {
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
              showDetailsLite={showDetailsLite}
            />
          );
        })}

        <MapConfig
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
              timeOffset={train.server.timezone_offset}
              serverCode={code}
              view={trainDetailsView}
              setView={setTrainDetailsView}
              follow={followTrain}
              setFollow={setFollowTrain}
              showPath={showPath}
              setShowPath={setShowPath}
              showDetailsLite={showDetailsLite}
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
          showDetailsLite={showDetailsLite}
          setShowDetailsLite={setShowDetailsLite}
        />
      )}
    </NextUIProvider>
  );
}
