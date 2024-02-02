import { locos } from "@/constants";
import { Button, Select, SelectItem, Slider, Switch } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import LanguageChanger from "./LanguageSelector";

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
  const { t } = useTranslation();

  return (
    <div className="absolute flex flex-col gap-2 top-[126px] w-[340px] left-[50px] p-2 z-[1200] rounded-md border-2 border-slate-800 shadow-lg text-[#D4CECE] bg-primary/70 cursor-default backdrop-blur-md max-sm:scale-85 max-sm:left-1/2 max-sm:top-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:-translate-y-1/2">
      <div className="flex flex-col gap-2 py-2 w-full justify-between rounded-md bg-primary border border-slate-800">
        <p className="px-3 text-medium">{t("Settings:language")}</p>
        <LanguageChanger />
      </div>
      <div className="flex flex-col gap-2 py-2 rounded-md bg-primary border border-slate-800">
        <div className="flex w-full justify-between">
          <p className="px-3">{t("Settings:trains")}</p>
          <Switch
            name="Show trains"
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
              <p className="px-3">{t("Settings:labels")}</p>
              <Switch
                name="Show train labels"
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
                  label={t("Settings:labels_visibility")}
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
          <p className="px-3">{t("Settings:signal_boxes")}</p>
          <Switch
            name="Show stations"
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
              <p className="px-3">{t("Settings:labels")}</p>
              <Switch
                name="Show station labels"
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
                  label={t("Settings:labels_visibility")}
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
          <p className="px-3">{t("Settings:train_stops")}</p>
          <Switch
            name="Show train stops"
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
              label={t("Settings:tstops_visibility")}
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
        <p className="px-3 text-medium">{t("Settings:only_available")}</p>
        <Switch
          name="Show only available"
          defaultSelected={showOnlyAvail}
          onChange={() => setShowOnlyAvail(!showOnlyAvail)}
          color="default"
          size="sm"
          classNames={{ thumb: "bg-[#D4CECE]" }}
        />
      </div>
      <div className="flex flex-col gap-2 py-2 w-full justify-between rounded-md bg-primary border border-slate-800">
        <p className="px-3 text-medium">{t("Settings:filter")}</p>
        <Select
          name="filter by locomotive"
          aria-label="filter by locomotive"
          placeholder={t("Settings:all")}
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
          name="Show labels"
          className="w-full border border-slate-800 text-sm"
          size="sm"
          color="primary"
          onClick={() => setOpenSettings(false)}
        >
          {t("Settings:done")}
        </Button>
      </div>
    </div>
  );
};
export default SettingsTab;
