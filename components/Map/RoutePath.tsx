import { Polyline } from "react-leaflet";
import { ranges } from "@/lib/constants/paths/ranges";
import { testPath } from "@/lib/constants/paths/testPath";
import { path_335xx0, path_335xx1, path_336xx0, path_336xx1 } from "@/lib/constants/paths/cargo/path-[335xxx-336xxx]";
import { path_2412x, path_4212x } from "@/lib/constants/paths/passenger/path-[2412x-4212x]";

const RoutePath = ({ selectedTrain }: { selectedTrain: string }) => {
  let path = null;
  const number = Number(selectedTrain);

  if (number >= 335000 && number <= 335900) {
    if (number % 2 === 0) {
      path = path_335xx0;
    } else {
      path = path_335xx1;
    }
  } else if (number >= 336000 && number <= 336900) {
    if (number % 2 === 0) {
      path = path_336xx0;
    } else {
      path = path_336xx1;
    }
  } else {
    for (const range of ranges) {
      if (number >= range.min && number <= range.max) {
        path = range.path;
        break;
      }
    }
  }

  if (number == 24205) {
    path = path_2412x;
  }

  if (number == 42200 || number == 42202) {
    path = path_4212x;
  }

  if (path) {
    return (
      <>
        <Polyline pathOptions={{ color: "royalblue" }} positions={path} />
      </>
    );
  }
  return <Polyline pathOptions={{ color: "green" }} positions={testPath} />;
};

export default RoutePath;
