import { useEffect, useRef, useState } from "react";
import { Popup, Tooltip, useMap } from "react-leaflet";
import { LeafletTrackingMarker } from "react-leaflet-tracking-marker";
import { divIcon } from "leaflet";

import { SlSpeedometer } from "react-icons/sl";
import { RiMapPin2Fill, RiMapPin2Line } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { trainsImg } from "@/lib/constants";

type TrainMarkerProps = {
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

const TrainMarker = ({
  lat,
  lng,
  trainNumber,
  trainName,
  vehicles,
  departure,
  destination,
  speed,
  user,
  selectedTrain,
  setSelectedTrain,
  zoomLevel,
  showTrains,
  showOnlyAvail,
  showMarkerLabels,
  labelZoomLevel,
  selectedLocos,
  follow,
}: TrainMarkerProps) => {
  const username = user?.name || "User";
  const avatar = user?.avatar || "/user-avatar.jpg";
  const position = { lat: lat, lng: lng };
  let prevPos = useRef([lat, lng]);
  const map = useMap();
  const isLocoSelected = selectedLocos.some((loco) => vehicles[0]?.name.includes(loco));

  const [hasPositionChanged, setHasPositionChanged] = useState(false);
  const [duration, setDuration] = useState(2000);
  const [rotationAngle, setRotationAngle] = useState(0);

  const calculateRotationAngle = (prevPos: any, currentPos: any) => {
    const lat1 = (prevPos[0] * Math.PI) / 180;
    const long1 = (prevPos[1] * Math.PI) / 180;
    const lat2 = (currentPos.lat * Math.PI) / 180;
    const long2 = (currentPos.lng * Math.PI) / 180;
    const dLon = long2 - long1;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    const radiansBearing = Math.atan2(y, x);
    const radiansToDegrees = (radiansBearing * 180) / Math.PI;
    return radiansToDegrees;
  };

  // Set marker rotation and follow
  useEffect(() => {
    if (prevPos.current[0] !== lat || prevPos.current[1] !== lng) {
      setRotationAngle(calculateRotationAngle(prevPos.current, position));
      prevPos.current = [lat, lng];
      setHasPositionChanged(true);
    }
    if (selectedTrain == trainNumber && follow) {
      map.panTo(position, { animate: true, duration: 2 });
    }
  }, [position, selectedTrain]);

  const markerIcon = divIcon({
    html: `<div class='marker-container relative'>
    <img src='${user ? avatar : "/bot-avatar.jpg"}' alt="User avatar" class='rounded-full border-[3px] ${
      user ? "w-8 h-8 -ml-4 -mt-4" : "w-6 h-6 -ml-3 -mt-3"
    } ${
      speed > 40
        ? "border-green-600 dark:border-green-700"
        : speed > 1
        ? "border-yellow-500 dark:border-yellow-600"
        : "border-red-700 dark:border-red-800"
    }' />
    <div style='transform: rotate(${rotationAngle}deg)' class='${
      !hasPositionChanged && "hidden"
    } absolute top-0 left-0 -z-10 ${user ? "w-8 h-8 -ml-4" : "w-6 h-6 -ml-3"}'><div class='absolute ${
      speed > 40
        ? "border-b-green-600 dark:border-b-green-700"
        : speed > 2
        ? "border-b-yellow-500 dark:border-b-yellow-600"
        : "hidden"
    } ${
      user
        ? "left-[8px] border-l-[8px] border-r-[8px] border-b-[10px]"
        : "left-[6px] border-l-[6px] border-r-[6px] border-b-[8px]"
    } -top-[6px] w-0 h-0 border-l-transparent border-r-transparent' /></div>
    </div>`,
    iconSize: [0, 0],
  });

  if (!showTrains) {
    return null;
  }

  if (selectedLocos.length > 0 && !isLocoSelected) {
    return null;
  }

  if (showOnlyAvail && user) {
    return null;
  }

  if (vehicles[0]?.name === "Pendolino/ED250-018 Variant") vehicles[0].name = "Pendolino/ED250-018";

  return (
    <>
      <LeafletTrackingMarker
        position={[lat, lng]}
        duration={duration}
        icon={markerIcon}
        rotationAngle={0}
        riseOnHover={true}
        zIndexOffset={-50}
        eventHandlers={{
          click: (event) => {
            event.target.closePopup();
            setSelectedTrain(trainNumber);
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
          <Tooltip direction="top" permanent={true} opacity={0.8} offset={[2, -16]} className="custom-tooltip">
            {trainNumber}
          </Tooltip>
        )}
        <Popup className="custom-popup" offset={[4, -14]} closeButton={false} autoPan={false}>
          <div className="flex gap-2">
            <div className="w-[50px] brightness-125 dark:brightness-105">
              <img src={"/trains/" + trainsImg[vehicles[0]?.name]} alt="train" width={50} height={40} />
            </div>
            <div className="flex flex-col justify-center text-sm leading-5">
              <h1>
                {trainName} <span className="font-bold">{trainNumber}</span>
              </h1>
              <span className="text-xs">{vehicles[0]?.name}</span>
            </div>
          </div>
          <div className="border-t border-primary dark:border-white my-1.5 opacity-30"></div>
          <div className="flex items-center gap-2">
            <SlSpeedometer className="w-4 h-3" />
            <p className="font font-medium">{speed.toFixed()} km/h</p>
          </div>
          <div className="flex flex-col ">
            <div className="flex items-center gap-2">
              <RiMapPin2Line className="w-4 h-4" />
              <p className="capitalize leading-4">
                {departure.charAt(1) === departure.charAt(1).toUpperCase() ? departure.toLowerCase() : departure}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <RiMapPin2Fill className="w-4 h-4" />
              <p className="capitalize leading-4 font-medium">
                {destination.charAt(1) === destination.charAt(1).toUpperCase()
                  ? destination.toLowerCase()
                  : destination}
              </p>
            </div>
          </div>
          {user && (
            <>
              <div className="border-t border-primary dark:border-white my-1.5 opacity-30"></div>
              <div className="flex gap-2 items-center">
                <FaUserAlt className="w-4" />
                <p className="font-medium">{username}</p>
              </div>
            </>
          )}
        </Popup>
      </LeafletTrackingMarker>
    </>
  );
};
export default TrainMarker;
