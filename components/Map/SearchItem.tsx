import { SearchItemProps } from "@/lib/types/types";
import { GiLever } from "react-icons/gi";

const SearchItem = ({ item, setSelectedMarker, setSearchValue, setSelectedLocos }: SearchItemProps) => {
  return (
    <li
      key={item.id}
      className="relative flex z-10 py-1 bg-light_primary_dark/60 hover:bg-light_primary_dark/80 dark:bg-primary/70 dark:hover:bg-primary/90 cursor-pointer border-b border-slate-400 dark:border-slate-800 transition-all"
    >
      <button
        onClick={() => {
          setSelectedMarker(item.label);
          setSearchValue("");
          if (item.type === "train") {
            setSelectedLocos([]);
          }
        }}
      >
        <div className="flex gap-3 pl-3 items-center">
          <div className="py-1 brightness-125 dark:brightness-105">
            {item.image ? (
              <div className="w-12">
                <img src={item.image} alt="picture" width={48} height={48} />
              </div>
            ) : (
              <div className="flex items-center justify-center w-12 h-12">
                <GiLever className="w-9 h-9 text-primary dark:text-light_gray" />
              </div>
            )}
          </div>
          <div className="flex flex-col flex-shrink items-start max-w-[160px] md:max-w-[190px]">
            <p className="text-sm font-medium dark:font-normal text-left">{item.label}</p>
            {item.username && (
              <p className=" text-xs text-slate-950 dark:text-slate-200 dark:font-light truncate">{item.username}</p>
            )}
          </div>
        </div>
      </button>
    </li>
  );
};
export default SearchItem;
