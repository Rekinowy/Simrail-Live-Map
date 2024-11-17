import Link from "next/link";
import Control from "react-leaflet-custom-control";

import { ImArrowLeft } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "@/context/ThemeContext";
import { FaFilter } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";

const MapControls = ({
  openSettings,
  setOpenSettings,
  openFilter,
  setOpenFilter,
  setModalOpen,
}: {
  openSettings: boolean;
  setOpenSettings: Function;
  openFilter: boolean;
  setOpenFilter: Function;
  setModalOpen: Function;
}) => {
  const { theme, toggleTheme } = useTheme();
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Control prepend position="topleft">
        <Link href="/" className="flex justify-center items-center w-[30px] h-[30px] rounded-sm shadow-sm">
          <ImArrowLeft className="w-3 h-3 text-primary dark:text-light_gray" />
        </Link>
      </Control>
      <Control position="topleft">
        <button
          className={`flex justify-center items-center w-[30px] h-[30px] rounded-sm shadow-sm ${
            openSettings ? "bg-light_primary_light dark:bg-primary_dark" : ""
          }`}
          onClick={() => {
            setOpenSettings((prev: boolean) => !prev);
            setOpenFilter(false);
          }}
        >
          <IoMdSettings className="w-4 h-4 text-primary dark:text-light_gray" />
        </button>
      </Control>
      <Control position="topleft">
        <button
          className={`flex justify-center items-center w-[30px] h-[30px] rounded-sm shadow-sm ${
            openFilter ? "bg-light_primary_light dark:bg-primary_dark" : ""
          }`}
          onClick={() => {
            setOpenFilter((prev: boolean) => !prev);
            setOpenSettings(false);
          }}
        >
          <FaFilter className="w-3 h-3 text-primary dark:text-light_gray" />
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
      {/* <Control position="topleft">
        <button
          className="flex justify-center items-center w-[30px] h-[30px] rounded-sm shadow-sm !bg-green-700 dark:!bg-green-800"
          onClick={handleOpenModal}
        >
          <SiBuymeacoffee className="w-4 h-4 text-light_gray" />
        </button>
      </Control> */}
    </>
  );
};
export default MapControls;
