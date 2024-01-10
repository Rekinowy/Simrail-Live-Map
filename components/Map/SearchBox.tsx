import { Input } from "@nextui-org/react";
import { TrainDataType } from "./Map";

const SearchBox = ({
  searchValue,
  setSearchValue,
  filteredTrains,
  setSelectedMarker,
  setSelectedLocos,
}: {
  searchValue: string;
  setSearchValue: (value: string) => void;
  setSelectedMarker: (value: string) => void;
  filteredTrains: TrainDataType[];
  setSelectedLocos: (value: any) => void;
}) => {
  return (
    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[260px] z-[1200] text-white">
      <Input
        isClearable
        placeholder="Search train by number"
        radius="sm"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/30",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent focus:bg-black",
          inputWrapper: [
            "h-5",
            "shadow-xl",
            "bg-primary/60",
            "dark:hover:bg-primary/80",
            "dark:focus-within:!bg-primary",
            "backdrop-blur-sm",
            "!cursor-text",
            "border border-slate-800 focus:bg-black ",
          ],
        }}
        value={searchValue}
        onChange={(value) => setSearchValue(value.target.value)}
        onClear={() => setSearchValue("")}
      />
      <div className="flex flex-col w-[90%] m-auto rounded-b-lg overflow-hidden">
        {searchValue.length > 1 &&
          (filteredTrains.length > 0 ? (
            filteredTrains.map((train) => {
              return (
                <button
                  className="p-1.5 text-center text-sm bg-primary/80 hover:bg-primary cursor-pointer border-b border-slate-800"
                  onClick={() => {
                    setSelectedMarker(train.TrainNoLocal);
                    setSearchValue("");
                    setSelectedLocos([]);
                  }}
                >
                  {train.TrainNoLocal}
                </button>
              );
            })
          ) : (
            <div className="p-1.5 text-center text-sm text-slate-200 bg-primary/50 border-b cursor-default border-slate-800">
              No results
            </div>
          ))}
      </div>
    </div>
  );
};
export default SearchBox;
