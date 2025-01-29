import Link from "next/link";
import { FaClipboardList } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

import { changelog } from "@/lib/changelogData";

const buttonStyles =
  "absolute flex bottom-4 right-4 md:right-8 gap-2 md:gap-3 px-2.5 md:px-3 py-2 md:py-2.5 w-fit items-center bg-light_primary/90 dark:bg-primary/80 hover:bg-light_primary_light dark:hover:bg-primary text-slate-200 hover:text-white text-lg border rounded-lg border-slate-400 hover:border-slate-600 dark:border-slate-800 dark:hover:border-slate-900 hover:scale-[1.02] transition duration-100";

const ChangelogButton = () => {
  return (
    <Link
      href={changelog.url}
      target="_blank"
      className={`${buttonStyles} !bg-green-700 dark:!bg-green-800 opacity-90 hover:opacity-100 !border-slate-600 dark:!border-slate-800 group`}
    >
      <FaClipboardList className="w-7 h-8 sm:w-6 sm:h-6 text-white/70" />
      <div className="hidden sm:flex gap-1.5 itemscenter">
        <div className="flex flex-col items-center">
          <h3 className="text-sm md:text-base leading-5">Changelog</h3>
          <h4 className="text-[11px] leading-4 md:text-xs text-gray-300">({changelog.date})</h4>
        </div>
        <FiExternalLink className="w-3 h-6 opacity-50 group-hover:opacity-100" />
      </div>
    </Link>
  );
};
export default ChangelogButton;
