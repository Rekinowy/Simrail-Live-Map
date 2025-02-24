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
import RoutePath from "./Map/RoutePath";
import FilterTab from "./Map/FilterTab";

import { filterSearchData } from "@/lib/utils/utils";
import { newStationIcon, newTrainStops, stationIcon, trainStops } from "@/lib/constants";
import { SearchResultType, StationDataType, TrainDataType } from "@/lib/types/types";
import { useLocalStorage } from "@/lib/hooks/hooks";
import { useMediaQuery } from "react-responsive";
import ServerCounter from "./Map/ServerCounter";
import CustomAttribution from "./UI/CustomAttribution";
import SupportModal from "./Home/SupportModal";
import RoutePathSpawn from "./Map/RoutePathSpawn";
import InfoModal from "./Home/InfoModal";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Map({ code, locale }: { code: string; locale: string }) {
  const TRAINS_API_URL = `/api/trains/${code}`;
  const STATIONS_API_URL = `/api/stations/${code}`;
  const TIME_API_URL = `/api/time/${code}`;

  const [selectedMarker, setSelectedMarker] = useState("");
  const [showTrains, setShowTrains] = useState(true);
  const [showStations, setShowStations] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(8);
  const [openSettings, setOpenSettings] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedLocos, setSelectedLocos] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredResults, setFilteredResults] = useState<SearchResultType[]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [showSpawnList, setShowSpawnList] = useState(false);
  const [selectedTrainId, setSelectedTrainId] = useState<string | null>(null);

  const [isModalOpen, setModalOpen] = useLocalStorage("isModalOpen", true);
  const [isInfoModalOpen, setInfoModalOpen] = useLocalStorage("isInfoModalOpen", true);
  const [showMarkerLabels, setShowMarkerLabels] = useLocalStorage("showMarkerLabels", true);
  const [showStationLabels, setShowStationLabels] = useLocalStorage("showStationLabels", true);
  const [trainLabelZoomLevel, setTrainLabelZoomLevel] = useLocalStorage("trainLabelZoomLevel", 12);
  const [stationLabelZoomLevel, setStationLabelZoomLevel] = useLocalStorage("stationLabelZoomLevel", 12);
  const [trainStopsZoomLevel, setTrainStopsZoomLevel] = useLocalStorage("trainStopsZoomLevel", 12);
  const [showTrainStops, setShowTrainStops] = useLocalStorage("showTrainStops", true);
  const [showSignalInfo, setShowSignalInfo] = useLocalStorage("showSignalInfo", true);
  const [showOnlyAvail, setShowOnlyAvail] = useLocalStorage("showOnlyAvail", false);
  const [hideDLC, setHideDLC] = useLocalStorage("hideDLC", false);
  const [showDetailsLite, setShowDetailsLite] = useLocalStorage("showDetailsLite", false);
  const [trainDetailsView, setTrainDetailsView] = useLocalStorage("trainDetailsView", "general");
  const [followTrain, setFollowTrain] = useLocalStorage("followTrain", true);
  const [showPath, setShowPath] = useLocalStorage("showPath", true);
  const [showServerCounter, setShowServerCounter] = useLocalStorage("showServerCounter", true);

  const trains = useSWR(TRAINS_API_URL, fetcher, {
    refreshInterval: 5000,
  });

  const stations = useSWR(STATIONS_API_URL, fetcher, {
    refreshInterval: 10000,
  });

  const serverTime = useSWR(TIME_API_URL, fetcher, {
    refreshInterval: 0,
  });

  const isMobile = useMediaQuery({ maxWidth: 839 });
  const totalTrains = trains.data?.length || 0;
  const userTrainsCount = trains.data?.filter((train: TrainDataType) => train.user?.type === "user").length || 0;
  const totalStations = stations.data?.length || 0;
  const userStationsCount =
    stations.data?.filter((station: StationDataType) => station.user?.type === "user").length || 0;

  const availableTrains =
    trains.data?.map((train: TrainDataType) => ({
      number: train.number,
      type: train.user.type,
    })) || [];

  const handleSpawnListClose = () => {
    setShowSpawnList(false);
    setSelectedTrainId(null);
  };

  useEffect(() => {
    if (serverTime.data) {
      const serverDate = new Date(serverTime.data);

      setCurrentTime(serverDate.toLocaleTimeString("en-GB", { timeZone: "UTC" }));
      setCurrentDate(serverDate.toLocaleDateString("en-GB", { timeZone: "UTC" }));

      const interval = setInterval(() => {
        serverDate.setSeconds(serverDate.getSeconds() + 1);
        // setShowColon((prev) => !prev);
        setCurrentTime(serverDate.toLocaleTimeString("en-GB", { timeZone: "UTC" }));
        setCurrentDate(serverDate.toLocaleDateString("en-GB", { timeZone: "UTC" }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [serverTime.data]);

  useEffect(() => {
    const results = filterSearchData(searchValue, trains.data, stations.data);
    setFilteredResults(results);
  }, [searchValue, trains.data, stations.data?.data]);

  return (
    <NextUIProvider>
      <MapContainer
        className="flex w-full h-[100dvh]"
        center={[51.2546195, 20.1220594]}
        zoom={8}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className="map-tiles transition-all" />
        {showPath && <RoutePath selectedTrain={selectedMarker} />}
        {selectedTrainId && <RoutePathSpawn selectedTrain={selectedTrainId} />}
        <CustomAttribution locale={locale} setModalOpen={setModalOpen} />
        <MapControls
          openSettings={openSettings}
          setOpenSettings={setOpenSettings}
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          setModalOpen={setModalOpen}
        />

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

        {/* New train stops */}
        {showTrainStops &&
          zoomLevel >= trainStopsZoomLevel &&
          newTrainStops.map((station: any) => {
            return (
              <Marker
                key={station.name}
                position={station.pos}
                icon={newStationIcon}
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
                <Popup closeButton={false} offset={[-2, 10]} className="custom-popup train-stop new-station-popup">
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
              isDLC={train.isDLC}
              selectedTrain={selectedMarker}
              setSelectedTrain={setSelectedMarker}
              zoomLevel={zoomLevel}
              showTrains={showTrains}
              showOnlyAvail={showOnlyAvail}
              hideDLC={hideDLC}
              showMarkerLabels={showMarkerLabels}
              labelZoomLevel={trainLabelZoomLevel}
              selectedLocos={selectedLocos}
              serverCode={code}
              follow={followTrain}
              handleSpawnListClose={handleSpawnListClose}
              selectedTrainId={selectedTrainId}
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
              handleSpawnListClose={handleSpawnListClose}
              selectedTrainId={selectedTrainId}
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
              isDLC={train.isDLC}
              serverCode={code}
              view={trainDetailsView}
              setView={setTrainDetailsView}
              follow={followTrain}
              setFollow={setFollowTrain}
              showPath={showPath}
              setShowPath={setShowPath}
              showDetailsLite={showDetailsLite}
              showSignalInfo={showSignalInfo}
              timetableIndex={train.timetable_index}
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
        currentTime={currentTime}
        availableTrains={availableTrains}
        showSpawnList={showSpawnList}
        setShowSpawnList={setShowSpawnList}
        selectedTrainId={selectedTrainId}
        setSelectedTrainId={setSelectedTrainId}
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
          showServerCounter={showServerCounter}
          setShowServerCounter={setShowServerCounter}
        />
      )}
      {openFilter && (
        <FilterTab
          setOpenFilter={setOpenFilter}
          showOnlyAvail={showOnlyAvail}
          setShowOnlyAvail={setShowOnlyAvail}
          hideDLC={hideDLC}
          setHideDLC={setHideDLC}
          selectedLocos={selectedLocos}
          setSelectedLocos={setSelectedLocos}
        />
      )}

      {showServerCounter && (!isMobile || (isMobile && !selectedMarker)) && (
        <ServerCounter
          serverCode={code}
          totalTrains={totalTrains}
          userTrainsCount={userTrainsCount}
          totalStations={totalStations}
          userStationsCount={userStationsCount}
          selectedMarker={selectedMarker}
          currentTime={currentTime}
          currentDate={currentDate}
        />
      )}
      {isModalOpen && <SupportModal setModalOpen={setModalOpen} />}
      {isInfoModalOpen && <InfoModal setModalOpen={setInfoModalOpen} />}
    </NextUIProvider>
  );
}
