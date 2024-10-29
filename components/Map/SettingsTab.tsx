import { Button, Slider, Switch } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import LanguageChanger from "../LanguageSelector";
import { SettingsTabTypes } from "@/lib/types/types";

const switchStyles = {
  thumb: "bg-primary_light dark:bg-light_gray",
  wrapper:
    "bg-light_primary_light group-data-[selected=true]:bg-light_primary_dark dark:bg-gray-800 dark:group-data-[selected=true]:bg-gray-500",
};

const sliderStyles = {
  base: "max-w-md gap-2",
  label: "text-base",
  value: "text-md",
  filler: "bg-primary_light dark:bg-light_gray",
  track: "bg-gray-200 border-l-primary dark:bg-gray-600/50 dark:border-l-slate-300",
  step: "data-[in-range=false]:bg-slate-300 data-[in-range=true]:bg-primary dark:data-[in-range=false]:bg-primary_dark/50 dark:data-[in-range=true]:bg-light_gray",
};

const selectStyles = {
  base: "px-2",
  trigger:
    "border border-slate-400 dark:border-slate-800 bg-light_primary_light hover:bg-light_primary_light/80 dark:bg-primary_dark dark:hover:bg-primary_dark/70 transition",
  popoverContent: "rounded-lg text-primary bg-slate-200 dark:bg-primary_dark dark:text-light_gray",
};

const SettingsTab = ({
  setOpenSettings,
  showTrainStops,
  setShowTrainStops,
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
  showTrains,
  setShowTrains,
  showStations,
  setShowStations,
  showDetailsLite,
  setShowDetailsLite,
  showSignalInfo,
  setShowSignalInfo,
  showServerCounter,
  setShowServerCounter,
}: SettingsTabTypes) => {
  const { t } = useTranslation();

  return (
    <div className="absolute flex flex-col gap-2 top-[52px] left-[50px] w-[360px] max-h-[95%] z-[1300] p-2 rounded-md border-1 border-slate-400 dark:border-slate-800 shadow-lg text-primary dark:text-light_gray bg-light_primary/50 dark:bg-primary/70 cursor-default max-sm:scale-85 max-sm:w-[340px] max-sm:left-1/2 max-sm:top-8 max-sm:transform max-sm:-translate-x-1/2">
      <div className="absolute w-full h-full top-0 left-0 backdrop-blur-md rounded-lg -z-10" />
      <div className="flex flex-col gap-2 overflow-auto scrollbar-thin scrollbar-thumb-light_primary_dark dark:scrollbar-thumb-primary_dark/80 scrollbar-track-light_primary_light/60 dark:scrollbar-track-primary/70 scrollbar-thumb-rounded-lg">
        <div className="flex flex-col gap-2 py-2 w-full justify-between rounded-md bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800">
          <p className="px-3 text-medium">{t("Settings:language")}</p>
          <LanguageChanger selectStyles={selectStyles} />
        </div>
        <div className="flex flex-col gap-2 py-2 rounded-md bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800">
          <div className="flex w-full justify-between">
            <p className="px-3">{t("Settings:trains")}</p>
            <Switch
              name="Show trains"
              defaultSelected={showTrains}
              onChange={() => setShowTrains(!showTrains)}
              color="default"
              size="sm"
              classNames={switchStyles}
            />
          </div>
          {showTrains && (
            <div className="flex flex-col pt-2 gap-2 border-t border-slate-400 dark:border-slate-700">
              <div className="flex w-full justify-between ">
                <p className="px-3">{t("Settings:labels")}</p>
                <Switch
                  name="Show train labels"
                  defaultSelected={showMarkerLabels}
                  onChange={() => setShowMarkerLabels(!showMarkerLabels)}
                  color="default"
                  size="sm"
                  classNames={switchStyles}
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
                    classNames={sliderStyles}
                    renderThumb={({ index, ...props }) => (
                      <div
                        {...props}
                        className="group top-1/2 w-4 h-4 bg-primary_light dark:bg-light_gray rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                      ></div>
                    )}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 py-2 rounded-md bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800">
          <div className="flex w-full justify-between">
            <p className="px-3">{t("Settings:signal_boxes")}</p>
            <Switch
              name="Show stations"
              defaultSelected={showStations}
              onChange={() => setShowStations(!showStations)}
              color="default"
              size="sm"
              classNames={switchStyles}
            />
          </div>
          {showStations && (
            <div className="flex flex-col pt-2 gap-2 border-t border-slate-400 dark:border-slate-700">
              <div className="flex w-full justify-between ">
                <p className="px-3">{t("Settings:labels")}</p>
                <Switch
                  name="Show station labels"
                  defaultSelected={showStationLabels}
                  onChange={() => setShowStationLabels(!showStationLabels)}
                  color="default"
                  size="sm"
                  classNames={switchStyles}
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
                    classNames={sliderStyles}
                    renderThumb={({ index, ...props }) => (
                      <div
                        {...props}
                        className="group top-1/2 w-4 h-4 bg-primary_light dark:bg-light_gray rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                      ></div>
                    )}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 py-2 rounded-md bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800">
          <div className="flex w-full justify-between">
            <p className="px-3">{t("Settings:train_stops")}</p>
            <Switch
              name="Show train stops"
              defaultSelected={showTrainStops}
              onChange={() => setShowTrainStops(!showTrainStops)}
              color="default"
              size="sm"
              classNames={switchStyles}
            />
          </div>
          {showTrainStops && (
            <div className="pt-2 px-3 border-t border-slate-400 dark:border-slate-700">
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
                classNames={sliderStyles}
                renderThumb={({ index, ...props }) => (
                  <div
                    {...props}
                    className="group top-1/2 w-4 h-4 bg-primary_light dark:bg-light_gray rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                  ></div>
                )}
              />
            </div>
          )}
        </div>
        <div className="flex py-2 w-full justify-between rounded-md bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800">
          <p className="px-3 text-medium">{t("Settings:signal_info")}</p>
          <Switch
            name="Show signal info"
            defaultSelected={showSignalInfo}
            onChange={() => setShowSignalInfo(!showSignalInfo)}
            color="default"
            size="sm"
            classNames={switchStyles}
          />
        </div>
        <div className="flex py-2 w-full justify-between rounded-md bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800">
          <p className="px-3 text-medium">{t("Settings:details_view")}</p>
          <Switch
            name="Change details view"
            defaultSelected={showDetailsLite}
            onChange={() => setShowDetailsLite(!showDetailsLite)}
            color="default"
            size="sm"
            classNames={switchStyles}
          />
        </div>
        <div className="flex py-2 w-full justify-between rounded-md bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800">
          <p className="px-3 text-medium">{t("Settings:server_counter")}</p>
          <Switch
            name="Show server info"
            defaultSelected={showServerCounter}
            onChange={() => setShowServerCounter(!showServerCounter)}
            color="default"
            size="sm"
            classNames={switchStyles}
          />
        </div>
      </div>
      {/* "Done" button */}
      <div className="flex w-full justify-center">
        <Button
          name="Show labels"
          className="w-full bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800 text-sm"
          size="sm"
          onClick={() => setOpenSettings(false)}
        >
          {t("Settings:done")}
        </Button>
      </div>
    </div>
  );
};
export default SettingsTab;
