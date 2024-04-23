import { Polyline } from "react-leaflet";
import { ranges } from "@/lib/constants/paths/ranges";
// import { testPath } from "@/lib/constants/paths/testPath";

const RoutePath = ({ selectedTrain }: { selectedTrain: string }) => {
  let path = null;
  const number = Number(selectedTrain);

  if (selectedTrain) {
    for (const range of ranges) {
      if (number >= range.min && number <= range.max) {
        path = range.path;
        break;
      }
    }
  }

  if (path) {
    return (
      <>
        <Polyline pathOptions={{ color: "royalblue" }} positions={path} />
        {/* <Polyline pathOptions={{ color: "green" }} positions={testPath} /> */}
      </>
    );
  }
};

export default RoutePath;
