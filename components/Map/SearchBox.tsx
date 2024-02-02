import { Input } from "@nextui-org/react";
import { SearchResultType } from "./Map";
import { useTranslation } from "react-i18next";

const SearchBox = ({
  searchValue,
  setSearchValue,
  setSelectedMarker,
  setSelectedLocos,
  filteredResults,
}: {
  searchValue: string;
  setSearchValue: (value: string) => void;
  setSelectedMarker: (value: string) => void;
  setSelectedLocos: (value: any) => void;
  filteredResults: SearchResultType[];
}) => {
  const { t } = useTranslation();

  return (
    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-[1200] text-white">
      <Input
        isClearable
        placeholder={t("Searchbox:search")}
        radius="sm"
        size="sm"
        className="relative z-10 inputBlur"
        classNames={{
          input: [
            "bg-transparent",
            "text-white/30",
            "placeholder:text-[#D4CECE]",
            "ml-1",
          ],
          inputWrapper: [
            "h-[36px] md:h-10",
            "w-64 md:w-72",
            "shadow-xl",
            "bg-primary/80",
            "hover:bg-primary/90",
            "focus-within:!bg-primary",
            "!cursor-text",
            "border border-slate-800 focus:bg-black",
          ],
        }}
        value={searchValue}
        onChange={(value) => setSearchValue(value.target.value)}
        onClear={() => setSearchValue("")}
        startContent={
          <img src="/search.png" alt="search" width={14} height={14} />
        }
      />
      <div className="relative flex flex-col w-[95%] max-h-[70dvh] m-auto rounded-b-lg shadow-lg overflow-hidden scroll-smooth">
        <div className="flex flex-col overflow-y-auto z-10 scrollbar scrollbar-thumb-primary_light scrollbar-track-primary/70 scrollbar-thumb-rounded-lg max-h-[80dvh]">
          {searchValue.length > 0 &&
            (filteredResults.length > 0 ? (
              filteredResults.map((item) => {
                return (
                  <button
                    className="relative z-10 p-1 bg-primary/70 hover:bg-primary/90 cursor-pointer border-b border-slate-800 transition-all duration-75"
                    key={item.id}
                    onClick={() => {
                      setSelectedMarker(item.label);
                      setSearchValue("");
                      if (item.type === "train") {
                        setSelectedLocos([]);
                      }
                    }}
                  >
                    <div className="flex gap-4 pl-2 items-center">
                      <div className="py-1">
                        <img
                          src={item.image}
                          alt="picture"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="text-sm text-left">{item.label}</p>
                        {item.username && (
                          <p className="text-slate-200 font-thin text-xs">
                            {item.username}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="relative z-10 p-1.5 text-center text-sm text-slate-200 bg-primary/50 border-b cursor-default border-slate-800">
                {t("Searchbox:no_results")}
              </div>
            ))}
        </div>
        <div className="backdrop-blur-md absolute inset-0 z-0 pointer-events-none"></div>
      </div>
    </div>
  );
};
export default SearchBox;
