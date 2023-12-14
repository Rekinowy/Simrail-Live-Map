import { getUserInfo } from "@/utils/actions";
import { divIcon } from "leaflet";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Marker, Popup, Tooltip, useMap } from "react-leaflet";
import StationDetails from "./StationDetails";

type StationMarkerProps = {
  stationName: string;
  stationPrefix: string;
  stationImage: string;
  difficulty: number;
  lat: number;
  lng: number;
  user: string;
  selectedStation: string;
  setSelectedStation: (station: string) => void;
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  showStations: boolean;
  showOnlyAvail: boolean;
  showMarkerLabels: boolean;
  setOpenSettings: (openSettings: boolean) => void;
  labelZoomLevel: number;
};

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
  setZoomLevel,
  showStations,
  showOnlyAvail,
  showMarkerLabels,
  setOpenSettings,
  labelZoomLevel,
}: StationMarkerProps) => {
  const [username, setUsername] = useState("User");
  const [avatar, setAvatar] = useState("/user-avatar.jpg");
  const map = useMap();

  const fetchData = async () => {
    const userData = await getUserInfo(user);
    setUsername(userData?.username);
    setAvatar(userData?.avatar);
  };

  useEffect(() => {
    map.on("zoom", () => {
      setZoomLevel(map.getZoom());
    });
    map.on("click", () => {
      setSelectedStation("");
      setOpenSettings(false);
    });
  }, [map]);

  // Get user info

  useEffect(() => {
    if (user && username == "User") {
      fetchData();
    }
  });

  useEffect(() => {
    if (user && username != "User") {
      fetchData();
      console.log("Fetch Station", stationName, username);
    }
  }, [user]);

  const stationIcon = divIcon({
    html: `<div class='marker-container'>
    <img src='${
      user ? avatar : "/bot-avatar.jpg"
    }' alt="User avatar" class='rounded-md border-[3px]  ${
      user
        ? "border-blue-400 w-9 h-9 -ml-[20px] -mt-[18px]"
        : "border-slate-400 w-7 h-7 -ml-[15px] -mt-[12px]"
    }'/>
    </div>`,
    iconSize: [0, 0],
  });

  if (!showStations) {
    return null;
  }

  if (showOnlyAvail && user) {
    return null;
  }

  return (
    <>
      <Marker
        position={[lat, lng]}
        icon={stationIcon}
        riseOnHover={true}
        eventHandlers={{
          click: (event) => {
            event.target.closePopup();
            setSelectedStation(stationPrefix);
            map.panTo({ lat, lng }, { animate: true, duration: 2 });
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
          <Tooltip
            direction="bottom"
            permanent={true}
            offset={[0, 16]}
            className="custom-tooltip"
          >
            {stationPrefix}
          </Tooltip>
        )}
        <Popup
          className="custom-popup station-popup"
          offset={[2, -12]}
          closeButton={false}
          autoPan={false}
        >
          <div className="flex h-[100px] w-[233px] rounded-md shadow-xl overflow-hidden mb-2.5 justify-center">
            <Image
              src={stationImage}
              alt="Station image"
              width={233}
              height={100}
              className="object-cover w-auto"
            />
          </div>
          <div className="flex items-center justify-between font-semibold">
            <div>
              <h1>{stationName}</h1>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i}>
                  <img
                    src={i < difficulty ? "/star-filled.png" : "/star.png"}
                    className="w-3"
                  />
                </div>
              ))}
            </div>
          </div>
          {user && (
            <>
              <div className="border-t my-1.5 opacity-30"></div>
              <div className="flex gap-2 items-center">
                <img src="/user.png" className="w-[16px]" />
                <p className="font-medium">{username}</p>
              </div>
            </>
          )}
        </Popup>
      </Marker>
      {selectedStation == stationPrefix && (
        <StationDetails
          stationName={stationName}
          stationPrefix={stationPrefix}
          stationImage={stationImage}
          difficulty={difficulty}
          user={user}
          username={username}
        />
      )}
    </>
  );
};
export default StationMarker;
