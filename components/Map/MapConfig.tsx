import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapConfig = ({
  setZoomLevel,
  setOpenSettings,
  setSelectedMarker,
}: {
  setZoomLevel: (zoom: number) => void;
  setOpenSettings: (openSettings: boolean) => void;
  setSelectedMarker: (value: string) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    map.on("zoom", () => {
      setZoomLevel(map.getZoom());
    });
    map.on("click", () => {
      setSelectedMarker("");
      setOpenSettings(false);
    });
  }, [map]);

  return null;
};
export default MapConfig;
