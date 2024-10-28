"use client";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import LanguageChanger from "../LanguageSelector";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const selectStyles = {
  trigger: `flex w-[72px] bg-gradient-to-tr from-light_primary_dark/70 to-light_primary/90 dark:from-primary/90 dark:to-primary_dark/80 hover:bg-light_primary_light dark:hover:bg-primary_dark text-primary dark:text-slate-200 hover:text-primary_dark dark:hover:text-white text-lg border rounded-lg border-slate-400 hover:border-slate-600 dark:border-slate-800 dark:hover:border-slate-900 hover:scale-[1.01] transition duration-100`,
  popoverContent: "rounded-lg text-primary bg-slate-200 dark:bg-primary_dark dark:text-light_gray",
};

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex w-full z-10 gap-2 items-center justify-between">
      <div className="flex gap-3 items-center">
        <Image width={72} height={72} src={"/favicon.png"} alt="logo"></Image>
        <h1 className="text-3xl leading-[0.9] font-medium">
          <span className="tracking-wider text-light_primary_light">SimRail</span>
          <br />
          <span className="tracking-widest text-2xl text-light_gray">Live Map</span>
        </h1>
      </div>
      <div className="flex gap-4">
        <button
          onClick={toggleTheme}
          className={`flex p-4 items-center bg-gradient-to-tr from-light_primary_dark/70 to-light_primary/90 dark:from-primary/90 dark:to-primary_dark/80 hover:bg-light_primary_light dark:hover:bg-primary_dark text-primary dark:text-slate-200 hover:text-primary_dark dark:hover:text-white text-lg border rounded-lg border-slate-400 hover:border-slate-600 dark:border-slate-800 dark:hover:border-slate-900 hover:scale-[1.01] transition duration-100`}
        >
          {theme === "light" ? (
            <MdDarkMode className="w-5 h-5 text-primary dark:text-light_gray" />
          ) : (
            <MdLightMode className="w-5 h-5 text-primary dark:text-light_gray" />
          )}
        </button>
        <LanguageChanger selectStyles={selectStyles} isHome={true} />
      </div>
    </header>
  );
};
export default Header;
