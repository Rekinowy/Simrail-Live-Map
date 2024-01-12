import { Input } from "@nextui-org/react";
import { SearchResultType } from "./Map";

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
  return (
    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[300px] z-[1200] text-white">
      <Input
        isClearable
        placeholder="Search by train number or username"
        radius="sm"
        className="relative z-10 inputBlur"
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
            "bg-primary/70",
            "dark:hover:bg-primary/80",
            "dark:focus-within:!bg-primary",
            "!cursor-text",
            "border border-slate-800 focus:bg-black ",
          ],
        }}
        value={searchValue}
        onChange={(value) => setSearchValue(value.target.value)}
        onClear={() => setSearchValue("")}
      />
      <div className="relative flex flex-col w-[95%] max-h-[80vh] m-auto rounded-b-lg shadow-lg overflow-hidden scroll-smooth">
        <div className="flex flex-col overflow-y-auto z-10 scrollbar scrollbar-w-2 scrollbar-h-2 scrollbar-thumb-primary_light scrollbar-track-primary/70 scrollbar-thumb-rounded-lg max-h-[80vh]">
          {searchValue.length > 0 &&
            (filteredResults.length > 0 ? (
              filteredResults.map((item) => {
                return (
                  <button
                    className="relative z-10 p-1 bg-primary/70 hover:bg-primary cursor-pointer border-b border-slate-800"
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
                        <p className="text-sm text-left">
                          {item.label}
                          {}
                        </p>
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
                No results
              </div>
            ))}
        </div>
        <div className="backdrop-blur-md absolute inset-0 z-0 pointer-events-none"></div>
      </div>
    </div>
  );
};
export default SearchBox;
