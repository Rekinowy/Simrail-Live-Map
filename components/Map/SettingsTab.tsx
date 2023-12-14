import { locos } from "@/constants";
import { Button, Select, SelectItem, Slider, Switch } from "@nextui-org/react";

type SettingsTabTypes = {
  setOpenSettings: (value: boolean) => void;
  showTrainStops: boolean;
  setShowTrainStops: (value: boolean) => void;
  showOnlyAvail: boolean;
  setShowOnlyAvail: (value: boolean) => void;
  showMarkerLabels: boolean;
  setShowMarkerLabels: (value: boolean) => void;
  showStationLabels: boolean;
  setShowStationLabels: (value: boolean) => void;
  trainLabelZoomLevel: number;
  setTrainLabelZoomLevel: (value: any) => void;
  stationLabelZoomLevel: number;
  setStationLabelZoomLevel: (value: any) => void;
  trainStopsZoomLevel: number;
  setTrainStopsZoomLevel: (value: any) => void;
  selectedLocos: string[];
  setSelectedLocos: (value: any) => void;
  showTrains: boolean;
  setShowTrains: (value: boolean) => void;
  showStations: boolean;
  setShowStations: (value: boolean) => void;
};

const SettingsTab = ({
  setOpenSettings,
  showTrainStops,
  setShowTrainStops,
  showOnlyAvail,
  setShowOnlyAvail,
  showMarkerLabels,
  setShowMarkerLabels,
  showStationLabels,
  setShowStationLabels,
  trainLabelZoomLevel,
  setTrainLabelZoomLevel,
  stationLabelZoomLevel,
  setStationLabelZoomLevel,
  trainStopsZoomLevel,
  setTrainStopsZoomLevel,
  selectedLocos,
  setSelectedLocos,
  showTrains,
  setShowTrains,
  showStations,
  setShowStations,
}: SettingsTabTypes) => {
  return (
    <div className="absolute flex flex-col gap-2 top-[122px] w-[340px] left-[50px] p-2 z-[1200] rounded-md border-2 border-slate-800 shadow-lg text-[#D4CECE] bg-primary bg-opacity-80 cursor-default">
      <div className="flex flex-col gap-2 py-2 rounded-md bg-primary border border-slate-800">
        <div className="flex w-full justify-between">
          <p className="px-3">Show trains</p>
          <Switch
            defaultSelected={showTrains}
            onChange={() => setShowTrains(!showTrains)}
            color="default"
            size="sm"
            classNames={{ thumb: "bg-[#D4CECE]" }}
          />
        </div>
        {showTrains && (
          <div className="flex flex-col pt-2 gap-2 border-t border-slate-700">
            <div className="flex w-full justify-between ">
              <p className="px-3">Show labels</p>
              <Switch
                defaultSelected={showMarkerLabels}
                onChange={() => setShowMarkerLabels(!showMarkerLabels)}
                color="default"
                size="sm"
                classNames={{ thumb: "bg-[#D4CECE]" }}
              />
            </div>
            {showTrains && showMarkerLabels && (
              <div className="px-3">
                <Slider
                  size="sm"
                  step={1}
                  color="foreground"
                  label="Labels visibility"
                  showSteps={true}
                  defaultValue={trainLabelZoomLevel}
                  onChange={(value) => setTrainLabelZoomLevel(value)}
                  maxValue={16}
                  minValue={8}
                  classNames={{
                    base: "max-w-md gap-2",
                    filler: "bg-[#D4CECE]",
                    label: "text-base",
                    value: "text-md",
                  }}
                  renderThumb={({ index, ...props }) => (
                    <div
                      {...props}
                      className="group  top-1/2 w-4 h-4 bg-[#D4CECE] rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                    ></div>
                  )}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 py-2 rounded-md bg-primary border border-slate-800">
        <div className="flex w-full justify-between">
          <p className="px-3">Show signal boxes</p>
          <Switch
            defaultSelected={showStations}
            onChange={() => setShowStations(!showStations)}
            color="default"
            size="sm"
            classNames={{ thumb: "bg-[#D4CECE]" }}
          />
        </div>
        {showStations && (
          <div className="flex flex-col pt-2 gap-2 border-t border-slate-700">
            <div className="flex w-full justify-between ">
              <p className="px-3">Show labels</p>
              <Switch
                defaultSelected={showStationLabels}
                onChange={() => setShowStationLabels(!showStationLabels)}
                color="default"
                size="sm"
                classNames={{ thumb: "bg-[#D4CECE]" }}
              />
            </div>
            {showStations && showStationLabels && (
              <div className="px-3">
                <Slider
                  size="sm"
                  step={1}
                  color="foreground"
                  label="Labels visibility"
                  showSteps={true}
                  defaultValue={stationLabelZoomLevel}
                  onChange={(value) => setStationLabelZoomLevel(value)}
                  maxValue={16}
                  minValue={8}
                  classNames={{
                    base: "max-w-md gap-2",
                    filler: "bg-[#D4CECE]",
                    label: "text-base",
                    value: "text-md",
                  }}
                  renderThumb={({ index, ...props }) => (
                    <div
                      {...props}
                      className="group  top-1/2 w-4 h-4 bg-[#D4CECE] rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                    ></div>
                  )}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 py-2 rounded-md bg-primary border border-slate-800">
        <div className="flex w-full justify-between">
          <p className="px-3">Show train stops</p>
          <Switch
            defaultSelected={showTrainStops}
            onChange={() => setShowTrainStops(!showTrainStops)}
            color="default"
            size="sm"
            classNames={{ thumb: "bg-[#D4CECE]" }}
          />
        </div>
        {showTrainStops && (
          <div className="pt-2 px-3 border-t border-slate-700">
            <Slider
              size="sm"
              step={1}
              color="foreground"
              label="Train stops visibility"
              showSteps={true}
              defaultValue={trainStopsZoomLevel}
              onChange={(value) => setTrainStopsZoomLevel(value)}
              maxValue={16}
              minValue={8}
              classNames={{
                base: "max-w-md gap-2",
                filler: "bg-[#D4CECE]",
                label: "text-base",
                value: "text-md",
              }}
              renderThumb={({ index, ...props }) => (
                <div
                  {...props}
                  className="group top-1/2 w-4 h-4 bg-[#D4CECE] rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                ></div>
              )}
            />
          </div>
        )}
      </div>

      <div className="flex py-2 w-full justify-between rounded-md bg-primary border border-slate-800">
        <p className="px-3 text-medium">Show only available</p>
        <Switch
          defaultSelected={showOnlyAvail}
          onChange={() => setShowOnlyAvail(!showOnlyAvail)}
          color="default"
          size="sm"
          classNames={{ thumb: "bg-[#D4CECE]" }}
        />
      </div>
      <div className="flex flex-col gap-2 py-2 w-full justify-between rounded-md bg-primary border border-slate-800">
        <p className="px-3 text-medium">Filter by locomotive</p>
        <Select
          aria-label="filter by locomotive"
          placeholder="All"
          selectionMode="multiple"
          radius="sm"
          selectedKeys={selectedLocos ? selectedLocos : "all"}
          style={{ height: "40px" }}
          classNames={{
            base: "px-2",
            popoverContent: "rounded-lg text-[#D4CECE]",
          }}
          onChange={(value) => {
            value.target.value.length > 0
              ? setSelectedLocos(value.target.value.split(","))
              : setSelectedLocos([]);
          }}
        >
          {locos.map((loco) => (
            <SelectItem key={loco.name} value={loco.name}>
              {loco.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex w-full mt-1 justify-center">
        <Button
          className="w-full border border-slate-800"
          size="sm"
          color="primary"
          onClick={() => setOpenSettings(false)}
        >
          Done
        </Button>
      </div>
    </div>
  );
};
export default SettingsTab;
