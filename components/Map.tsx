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
import FilterTab from "./Map/FilterTab";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Map({ code }: { code: string }) {
  const TRAINS_API_URL = `/api/trains/${code}`;
  const STATIONS_API_URL = `/api/stations/${code}`;

  const [selectedMarker, setSelectedMarker] = useState("");
  const [showTrains, setShowTrains] = useState(true);
  const [showStations, setShowStations] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(8);
  const [openSettings, setOpenSettings] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedLocos, setSelectedLocos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredResults, setFilteredResults] = useState<SearchResultType[]>([]);

  const [showMarkerLabels, setShowMarkerLabels] = useLocalStorage("showMarkerLabels", true);
  const [showStationLabels, setShowStationLabels] = useLocalStorage("showStationLabels", true);
  const [trainLabelZoomLevel, setTrainLabelZoomLevel] = useLocalStorage("trainLabelZoomLevel", 12);
  const [stationLabelZoomLevel, setStationLabelZoomLevel] = useLocalStorage("stationLabelZoomLevel", 12);
  const [trainStopsZoomLevel, setTrainStopsZoomLevel] = useLocalStorage("trainStopsZoomLevel", 12);
  const [showTrainStops, setShowTrainStops] = useLocalStorage("showTrainStops", true);
  const [showSignalInfo, setShowSignalInfo] = useLocalStorage("showSignalInfo", true);
  const [showOnlyAvail, setShowOnlyAvail] = useLocalStorage("showOnlyAvail", false);
  const [showDetailsLite, setShowDetailsLite] = useLocalStorage("showDetailsLite", false);
  const [trainDetailsView, setTrainDetailsView] = useLocalStorage("trainDetailsView", "general");
  const [followTrain, setFollowTrain] = useLocalStorage("followTrain", true);
  const [showPath, setShowPath] = useLocalStorage("showPath", true);

  const trains = useSWR(TRAINS_API_URL, fetcher, {
    refreshInterval: 5000,
  });

  const stations = useSWR(STATIONS_API_URL, fetcher, {
    refreshInterval: 5000,
  });

  useEffect(() => {
    const results = filterSearchData(searchValue, trains.data, stations.data);
    setFilteredResults(results);
  }, [searchValue, trains.data, stations.data?.data]);

  return (
    <NextUIProvider>
      <MapContainer className="flex w-full h-[100dvh]" center={[51.2546195, 20.1220594]} zoom={8}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | SimRail Live Map'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles transition-all"
        />
        {showPath && <RoutePath selectedTrain={selectedMarker} />}

        <MapControls setOpenSettings={setOpenSettings} setOpenFilter={setOpenFilter} />

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

        {trains.data?.map((train: TrainDataType) => {
          return (
            <TrainMarker
              key={train.id}
              lat={train.lat}
              lng={train.lng}
              speed={train.velocity}
              trainNumber={train.number}
              trainName={train.name}
              vehicles={train.vehicles}
              departure={train.departure}
              destination={train.destination}
              user={train.user}
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

        {stations.data?.map((station: StationDataType) => {
          return (
            <StationMarker
              key={station.id}
              stationName={station.name}
              stationPrefix={station.prefix}
              stationImage={station.image}
              difficulty={station.difficulty}
              lat={station.lat}
              lng={station.lng}
              user={station.user}
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

      {trains.data?.map((train: TrainDataType) => {
        return (
          selectedMarker == train.number && (
            <TrainDetails
              key={train.id}
              trainNumber={train.number}
              trainName={train.name}
              vehicles={train.vehicles}
              departure={train.departure}
              destination={train.destination}
              speed={train.velocity}
              signal={train.signal}
              signalSpeed={train.signal_speed}
              signalDistance={train.signal_distance}
              user={train?.user}
              timeOffset={train.timezone_offset}
              serverCode={code}
              view={trainDetailsView}
              setView={setTrainDetailsView}
              follow={followTrain}
              setFollow={setFollowTrain}
              showPath={showPath}
              setShowPath={setShowPath}
              showDetailsLite={showDetailsLite}
              showSignalInfo={showSignalInfo}
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
          showTrains={showTrains}
          setShowTrains={setShowTrains}
          showStations={showStations}
          setShowStations={setShowStations}
          showDetailsLite={showDetailsLite}
          setShowDetailsLite={setShowDetailsLite}
          showSignalInfo={showSignalInfo}
          setShowSignalInfo={setShowSignalInfo}
        />
      )}
      {openFilter && (
        <FilterTab
          setOpenFilter={setOpenFilter}
          showOnlyAvail={showOnlyAvail}
          setShowOnlyAvail={setShowOnlyAvail}
          selectedLocos={selectedLocos}
          setSelectedLocos={setSelectedLocos}
        />
      )}
    </NextUIProvider>
  );
}
