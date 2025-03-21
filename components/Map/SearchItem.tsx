import { SearchItemProps } from "@/lib/types/types";
import { FaUserAlt } from "react-icons/fa";
import { GiLever } from "react-icons/gi";

const SearchItem = ({ item, setSelectedMarker, setSearchValue, setSelectedLocos }: SearchItemProps) => {
  console.log(item);
  return (
    <li
      key={item.id}
      className="relative flex z-10 py-1 bg-light_primary/50 hover:bg-light_primary_dark/80 dark:bg-primary/60 dark:hover:bg-primary_light/60 cursor-pointer border-b border-slate-400 dark:border-slate-800 transition-all"
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
        <div className="flex gap-4 pl-3 items-center">
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
          <div className="flex gap-0.5 flex-col flex-shrink items-start max-w-[190px]">
            <div>
              <p className="text-sm font-medium dark:font-normal text-left">{item.label}</p>
              <p className="text-[10px] dark:font-light text-left text-gray-600 dark:text-gray-400">{item.name}</p>
            </div>
            {item.username && (
              <>
                <div className="border-t w-full border-primary/20 dark:border-white/20" />
                <div className="flex gap-1 items-center">
                  <FaUserAlt className="w-2 h-2 text-primary_dark dark:text-light_gray" />
                  <p className="text-xs text-slate-950 dark:text-slate-200 dark:font-light truncate">{item.username}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </button>
    </li>
  );
};
export default SearchItem;
