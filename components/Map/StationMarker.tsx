import { divIcon } from "leaflet";
import Image from "next/image";
import { useEffect } from "react";
import { Marker, Popup, Tooltip, useMap } from "react-leaflet";
import StationDetails from "./StationDetails";
import { FaRegStar, FaStar, FaUserAlt } from "react-icons/fa";
import { StationMarkerProps } from "@/lib/types/types";
import { stationsPos } from "@/lib/constants";

const StationMarker = ({
  stationName,
  stationPrefix,
  stationImage,
  difficulty,
  lat,
  lng,
  user,
  selectedStation,
  setSelectedStation,
  zoomLevel,
  showStations,
  showOnlyAvail,
  showMarkerLabels,
  labelZoomLevel,
  showDetailsLite,
}: StationMarkerProps) => {
  const username = user?.name || "User";
  const avatar = user?.avatar || "/user-avatar.jpg";
  const map = useMap();

  const position: [number, number] = stationsPos[stationName]
    ? (stationsPos[stationName] as [number, number])
    : [lat, lng];

  const stationIcon = divIcon({
    html: `<div class='marker-container'>
    <img src='${user.type === "user" ? avatar : "/bot-avatar.jpg"}' alt="User avatar" class='rounded-md border-[3px]  ${
      user.type === "user"
        ? "border-sky-500 dark:border-sky-600 w-9 h-9 -ml-[20px] -mt-[18px]"
        : "border-slate-500 dark:border-slate-400 w-7 h-7 -ml-[15px] -mt-[12px]"
    }'/>
    </div>`,
    iconSize: [0, 0],
  });

  useEffect(() => {
    if (selectedStation == stationName) {
      map.panTo(position, { animate: true, duration: 1 });
    }
  });

  if (!showStations) {
    return null;
  }

  if (showOnlyAvail && user.type === "user") {
    return null;
  }

  if (stationName === "Katowice") {
    lat = 50.25673;
    lng = 19.02148;
  }
  if (stationName === "Miechów") {
    lat = 50.35469;
    lng = 20.011688;
  }

  return (
    <>
      <Marker
        position={position}
        icon={stationIcon}
        riseOnHover={true}
        eventHandlers={{
          click: (event) => {
            event.target.closePopup();
            setSelectedStation(stationName);
          },
          mouseover: (event) => {
            event.target.openPopup();
          },
          mouseout: (event) => {
            event.target.closePopup();
          },
        }}
      >
        {showMarkerLabels && zoomLevel >= labelZoomLevel && (
          <Tooltip direction="bottom" permanent={true} offset={[0, 16]} className="custom-tooltip">
            {stationPrefix}
          </Tooltip>
        )}
        <Popup className="custom-popup station-popup" offset={[2, -12]} closeButton={false} autoPan={false}>
          <div className="flex h-[100px] w-[233px] rounded-md shadow-md overflow-hidden mb-2.5 justify-center">
            <Image src={stationImage} alt="Station image" width={233} height={100} className="object-cover w-auto" />
          </div>
          <div className="flex items-center justify-between font-semibold">
            <div className="max-w-[155px]">
              <h1>{stationName}</h1>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i}>{i < difficulty ? <FaStar className="w-2.5" /> : <FaRegStar className="w-2.5" />}</div>
              ))}
            </div>
          </div>
          {user.type === "user" && (
            <>
              <div className="border-t border-primary dark:border-white my-1.5 opacity-30"></div>
              <div className="flex gap-2 items-center max-w-[233px]">
                <FaUserAlt className="w-3" />
                <p className="font-medium truncate">{username}</p>
              </div>
            </>
          )}
        </Popup>
      </Marker>
      {selectedStation == stationName && (
        <StationDetails
          stationName={stationName}
          stationPrefix={stationPrefix}
          stationImage={stationImage}
          difficulty={difficulty}
          user={user}
          username={username}
          showDetailsLite={showDetailsLite}
        />
      )}
    </>
  );
};
export default StationMarker;
