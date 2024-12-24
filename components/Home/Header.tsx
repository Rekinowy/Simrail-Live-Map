"use client";

import { useTheme } from "@/context/ThemeContext";
import LanguageChanger from "../LanguageSelector";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { SiBuymeacoffee } from "react-icons/si";
import Logo from "./Logo";
import { Tooltip } from "@nextui-org/tooltip";

import { useTranslation } from "react-i18next";

const selectStyles = {
  trigger: `flex w-[66px] sm:w-[72px] h-[46px] sm:h-[56px] p-3  bg-light_primary/90 dark:bg-primary/80 hover:bg-light_primary_light dark:hover:bg-primary text-primary dark:text-slate-200 hover:text-primary_dark dark:hover:text-white text-lg border rounded-lg border-slate-400 hover:border-slate-600 dark:border-slate-800 dark:hover:border-slate-900 hover:scale-[1.02] transition duration-100`,
  popoverContent: "rounded-lg text-primary bg-slate-200 dark:bg-primary_dark dark:text-light_gray",
};

const buttonStyles =
  "flex p-3.5 sm:p-4 w-[46px] sm:w-[56px] h-[46px] sm:h-[56px] items-center bg-light_primary/90 dark:bg-primary/80 hover:bg-light_primary_light dark:hover:bg-primary text-primary dark:text-slate-200 hover:text-primary_dark dark:hover:text-white text-lg border rounded-lg border-slate-400 hover:border-slate-600 dark:border-slate-800 dark:hover:border-slate-900 hover:scale-[1.02] transition duration-100";

const iconStyles = "w-4 sm:w-5 h-4 sm:h-5 text-primary dark:text-light_gray";

const supportTooltipStyle = {
  content: ["p-1.5 shadow-xl rounded-md", "text-xs text-white/90 bg-green-700/80 dark:bg-green-900/80"],
};

const Header = ({ setModalOpen }: { setModalOpen: (open: boolean) => void }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <header className="flex w-full z-10 gap-2 items-center justify-between">
      <Logo />
      <div className="flex gap-3 sm:gap-4">
        <Tooltip content={t("Settings:support_me")} delay={500} classNames={supportTooltipStyle}>
          <button
            onClick={handleOpenModal}
            className={`${buttonStyles} !bg-green-700 dark:!bg-green-800 opacity-90 hover:opacity-100 !border-slate-600 dark:!border-slate-800`}
          >
            <SiBuymeacoffee className="w-4 sm:w-5 h-4 sm:h-5 text-white/90" />
          </button>
        </Tooltip>
        <button onClick={toggleTheme} className={buttonStyles}>
          {theme === "light" ? <MdDarkMode className={iconStyles} /> : <MdLightMode className={iconStyles} />}
        </button>
        <LanguageChanger selectStyles={selectStyles} isHome={true} />
      </div>
    </header>
  );
};
export default Header;
