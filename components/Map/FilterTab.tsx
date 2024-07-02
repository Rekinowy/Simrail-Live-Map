import { locos } from "@/lib/constants";
import { Button, Select, SelectItem, Switch } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { FilterTabTypes } from "@/lib/types/types";

const switchStyles = {
  thumb: "bg-primary_light dark:bg-light_gray",
  wrapper:
    "bg-light_primary_light group-data-[selected=true]:bg-light_primary_dark dark:bg-gray-800 dark:group-data-[selected=true]:bg-gray-500",
};

const selectStyles = {
  base: "px-2",
  trigger:
    "border border-slate-400 dark:border-slate-800 bg-light_primary_light hover:bg-light_primary_light/80 dark:bg-primary_dark dark:hover:bg-primary_dark/70 transition",
  popoverContent: "rounded-lg text-primary bg-slate-200 dark:bg-primary_dark dark:text-light_gray",
};

const FilterTab = ({
  setOpenFilter,
  showOnlyAvail,
  setShowOnlyAvail,
  selectedLocos,
  setSelectedLocos,
}: FilterTabTypes) => {
  const { t } = useTranslation();

  return (
    <div className="absolute flex flex-col gap-2 top-[165px] left-[50px] w-[300px] max-h-[75%] z-[1200] p-2 rounded-md border-1 border-slate-400 dark:border-slate-800 shadow-lg text-primary dark:text-light_gray bg-light_primary/50 dark:bg-primary/70 cursor-default max-sm:scale-85 max-sm:w-[340px] max-sm:left-1/2 max-sm:top-[150px] max-sm:transform max-sm:-translate-x-1/2 ">
      <div className="absolute w-full h-full top-0 left-0 backdrop-blur-md rounded-lg -z-10" />
      <div className="flex flex-col gap-2 overflow-auto scrollbar-thin scrollbar-thumb-light_primary_dark dark:scrollbar-thumb-primary_dark/80 scrollbar-track-light_primary_light/60 dark:scrollbar-track-primary/70 scrollbar-thumb-rounded-lg">
        <div className="flex py-2 w-full justify-between rounded-md bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800">
          <p className="px-3 text-medium">{t("Settings:only_available")}</p>
          <Switch
            name="Show only available"
            defaultSelected={showOnlyAvail}
            onChange={() => setShowOnlyAvail(!showOnlyAvail)}
            color="default"
            size="sm"
            classNames={switchStyles}
          />
        </div>

        <div className="flex flex-col gap-2 py-2 w-full justify-between rounded-md bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800">
          <p className="px-3 text-medium">{t("Settings:filter")}</p>
          <Select
            name="filter by locomotive"
            aria-label="filter by locomotive"
            placeholder={t("Settings:all")}
            selectionMode="multiple"
            radius="sm"
            selectedKeys={selectedLocos ? selectedLocos : "all"}
            style={{ height: "40px" }}
            classNames={selectStyles}
            onChange={(value) => {
              value.target.value.length > 0 ? setSelectedLocos(value.target.value.split(",")) : setSelectedLocos([]);
            }}
          >
            {locos.map((loco) => (
              <SelectItem key={loco.name} value={loco.name}>
                {loco.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Button
          name="Show labels"
          className="w-full bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800 text-sm"
          size="sm"
          onClick={() => setOpenFilter(false)}
        >
          {t("Settings:done")}
        </Button>
      </div>
    </div>
  );
};
export default FilterTab;
