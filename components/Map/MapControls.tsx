import Link from "next/link";
import Control from "react-leaflet-custom-control";

import { ImArrowLeft } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "@/context/ThemeContext";

const MapControls = ({ setOpenSettings }: { setOpenSettings: Function }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Control prepend position="topleft">
        <Link
          href="/"
          className="flex justify-center items-center w-[30px] h-[30px] rounded-sm shadow-sm"
        >
          <ImArrowLeft className="w-3 h-3 text-primary dark:text-light_gray" />
        </Link>
      </Control>
      <Control position="topleft">
        <button
          className="flex justify-center items-center w-[30px] h-[30px] rounded-sm shadow-sm"
          onClick={() => setOpenSettings((prev: boolean) => !prev)}
        >
          <IoMdSettings className="w-4 h-4 text-primary dark:text-light_gray" />
        </button>
      </Control>
      <Control position="topleft">
        <button
          className="flex justify-center items-center w-[30px] h-[30px] rounded-sm shadow-sm"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <MdDarkMode className="w-4 h-4 text-primary dark:text-light_gray" />
          ) : (
            <MdLightMode className="w-4 h-4 text-primary dark:text-light_gray" />
          )}
        </button>
      </Control>
    </>
  );
};
export default MapControls;
