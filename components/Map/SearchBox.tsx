import { SearchBoxProps } from "@/lib/types/types";
import { Input } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import SearchItem from "./SearchItem";

const SearchBox = ({
  searchValue,
  setSearchValue,
  setSelectedMarker,
  setSelectedLocos,
  filteredResults,
}: SearchBoxProps) => {
  const { t } = useTranslation();

  return (
    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-[1200] text-primary dark:text-white">
      <Input
        isClearable
        placeholder={t("Searchbox:search")}
        radius="sm"
        size="sm"
        className="relative z-10 inputBlur"
        classNames={{
          input: [
            "bg-transparent",
            "text-slate-400 dark:text-white/30",
            "placeholder:text-slate-700 placeholder:dark:text-light_gray",
            "ml-1",
          ],
          inputWrapper: [
            "h-10",
            "w-72",
            "shadow-xl",
            "bg-light_primary/60 dark:bg-primary/60",
            "hover:bg-light_primary/80 hover:dark:bg-primary/80",
            "focus-within:!bg-light_primary focus-within:dark:!bg-primary",
            "!cursor-text",
            "border-1 border-slate-400 dark:border-slate-800",
          ],
          clearButton: ["text-slate-700 dark:text-light_gray"],
        }}
        value={searchValue}
        onChange={(value) => setSearchValue(value.target.value)}
        onClear={() => setSearchValue("")}
        startContent={<FaSearch className="text-slate-700 dark:text-light_gray" />}
      />
      <div className="relative flex flex-col w-[95%] max-h-[70dvh] m-auto rounded-b-lg shadow-lg overflow-hidden scroll-smooth">
        <ul className="flex flex-col overflow-y-auto z-10 scrollbar scrollbar-thumb-light_primary_light/60 scrollbar-track-light_primary/50 dark:scrollbar-thumb-primary_light dark:scrollbar-track-primary/70 scrollbar-thumb-rounded-lg max-h-[80dvh]">
          {searchValue.length > 0 &&
            (filteredResults.length > 0 ? (
              filteredResults.map((item) => {
                return (
                  <SearchItem
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
        <div className="backdrop-blur-md absolute inset-0 z-0 pointer-events-none"></div>
      </div>
    </div>
  );
};
export default SearchBox;
