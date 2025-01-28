import { SearchBoxProps } from "@/lib/types/types";
import { Input, Tooltip } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import SearchItem from "./SearchItem";
import { BiTimer } from "react-icons/bi";
import SpawnList from "./SpawnList";
import { IoCloseCircle } from "react-icons/io5";

const SearchBox = ({
  searchValue,
  setSearchValue,
  setSelectedMarker,
  setSelectedLocos,
  filteredResults,
  currentTime,
  availableTrains,
  showSpawnList,
  setShowSpawnList,
  selectedTrainId,
  setSelectedTrainId,
}: SearchBoxProps) => {
  const { t } = useTranslation();

  const tooltipStyle = {
    base: ["before:bg-light_primary_light dark:before:bg-primary_dark"],
    content: [
      "p-1.5 shadow-xl rounded-md",
      "text-[10px] text-primary dark:text-light_gray bg-light_primary_light dark:bg-primary_dark",
    ],
  };

  return (
    <div
      className={`absolute flex-col top-2 ${
        showSpawnList && selectedTrainId
          ? "right-1/2 max-sm:transform max-md:translate-x-1/2 md:right-3"
          : "right-1/2 transform translate-x-1/2"
      } z-[1200] flex border p-0.5 rounded-[10px] gap-1 bg-light_primary_dark/80 dark:bg-primary_dark/80 border-light_primary_dark dark:border-primary_dark overflow-hidden transition-all`}
    >
      <div className="flex gap-0.5 text-primary dark:text-white">
        <Input
          isClearable
          placeholder={t("Searchbox:search")}
          radius="sm"
          size="sm"
          className="z-10"
          classNames={{
            input: [
              "bg-transparent",
              "text-slate-400 dark:text-white/30",
              "placeholder:text-slate-700 placeholder:dark:text-light_gray",
              "ml-1",
            ],
            inputWrapper: [
              "h-8 sm:h-9",
              "w-56 sm:w-60",
              "shadow-xl",
              "bg-light_primary/50 dark:bg-primary/50",
              "hover:bg-light_primary/80 hover:dark:bg-primary/80",
              "focus-within:!bg-light_primary focus-within:dark:!bg-primary",
              "!cursor-text",
              "border-1 border-slate-400 dark:border-slate-800",
            ],
            clearButton: ["text-slate-700 dark:text-light_gray"],
          }}
          value={searchValue}
          onChange={(value) => {
            setSearchValue(value.target.value);
            setShowSpawnList(false);
            setSelectedTrainId(null);
          }}
          onClear={() => setSearchValue("")}
          startContent={<FaSearch className="text-slate-700 dark:text-light_gray" />}
        />
        <Tooltip content={t("Searchbox:spawn_list")} delay={1000} classNames={tooltipStyle} placement="right">
          <button
            onClick={() => {
              setSearchValue("");
              setSelectedTrainId(null);
              setShowSpawnList(!showSpawnList);
            }}
            className={`group relative flex justify-center items-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg shadow-xl  hover:bg-light_primary/90 hover:dark:bg-primary/90 ${
              showSpawnList ? "bg-light_primary dark:bg-primary" : "bg-light_primary/70 dark:bg-primary/70"
            } border border-slate-400 dark:border-slate-800 transition-all duration-100`}
          >
            {showSpawnList ? (
              <IoCloseCircle className="w-9 h-[16px] dark:text-gray-300 opacity-80 group-hover:opacity-100 transition-all duration-100" />
            ) : (
              <BiTimer className="w-9 h-[18px] opacity-80 group-hover:opacity-100 transition-all duration-100" />
            )}
          </button>
        </Tooltip>
      </div>
      {searchValue && (
        <div className="flex flex-col w-full max-h-[70dvh] mx-auto shadow-lg scroll-smooth overflow-hidden rounded-lg">
          <ul className="flex flex-col overflow-y-auto z-10 scrollbar scrollbar-thumb-light_primary_light/60 scrollbar-track-light_primary/50 dark:scrollbar-thumb-primary_light dark:scrollbar-track-primary/70 scrollbar-thumb-rounded-lg">
            {searchValue.length > 0 &&
              (filteredResults.length > 0 ? (
                filteredResults.map((item) => {
                  return (
                    <SearchItem
                      key={item.id}
                      item={item}
                      setSelectedMarker={setSelectedMarker}
                      setSearchValue={setSearchValue}
                      setSelectedLocos={setSelectedLocos}
                    />
                  );
                })
              ) : (
                <div className="relative z-10 p-1.5 text-center text-sm text-primary dark:text-slate-200 bg-light_primary_dark/40 dark:bg-primary/40 cursor-default">
                  {t("Searchbox:no_results")}
                </div>
              ))}
          </ul>
        </div>
      )}
      {showSpawnList && (
        <SpawnList
          currentTime={currentTime}
          availableTrains={availableTrains}
          setSelectedMarker={setSelectedMarker}
          setShowSpawnList={setShowSpawnList}
          selectedTrainId={selectedTrainId}
          setSelectedTrainId={setSelectedTrainId}
        />
      )}
      <div className="backdrop-blur-md absolute inset-0 -z-10 pointer-events-none"></div>
    </div>
  );
};
export default SearchBox;
