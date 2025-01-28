import { Polyline, useMap } from "react-leaflet";
import { ranges } from "@/lib/constants/paths/ranges";
import { path_335xx0, path_335xx1, path_336xx0, path_336xx1 } from "@/lib/constants/paths/cargo/path-[335xxx-336xxx]";
import { path_2412x, path_4212x } from "@/lib/constants/paths/passenger/path-[2412x-4212x]";
import { useEffect } from "react";
import { LatLngTuple } from "leaflet";

const RoutePathSpawn = ({ selectedTrain }: { selectedTrain: string }) => {
  let path: LatLngTuple[] | null = null;
  let zoom = 10;
  const number = Number(selectedTrain);

  const map = useMap();

  if (number >= 335000 && number <= 335900) {
    if (number % 2 === 0) {
      path = path_335xx0 as LatLngTuple[];
      zoom = 13;
    } else {
      path = path_335xx1 as LatLngTuple[];
      zoom = 13;
    }
  } else if (number >= 336000 && number <= 336900) {
    if (number % 2 === 0) {
      path = path_336xx0 as LatLngTuple[];
      zoom = 13;
    } else {
      path = path_336xx1 as LatLngTuple[];
      zoom = 13;
    }
  } else {
    for (const range of ranges) {
      if (number >= range.min && number <= range.max) {
        path = range.path as LatLngTuple[];
        zoom = range.zoom;
        break;
      }
    }
  }

  if (number == 24205) {
    path = path_2412x as LatLngTuple[];
    zoom = 10;
  }

  if (number == 42200 || number == 42202) {
    path = path_4212x as LatLngTuple[];
    zoom = 10;
  }

  useEffect(() => {
    if (selectedTrain && path) {
      const pathArray = path as LatLngTuple[];
      const center: LatLngTuple = [
        (pathArray[0][0] + pathArray[pathArray.length - 1][0]) / 2,
        (pathArray[0][1] + pathArray[pathArray.length - 1][1]) / 2,
      ];
      map.setView(center, zoom);
    }
  }, [selectedTrain]);

  if (path) {
    return (
      <>
        <Polyline pathOptions={{ color: "orange" }} positions={path} />
      </>
    );
  }
};

export default RoutePathSpawn;
