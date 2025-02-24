import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

const InfoModal = ({ setModalOpen }: { setModalOpen: (open: boolean) => void }) => {
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex z-[1200] p-0.5 rounded-lg border-1 border-slate-400 dark:border-slate-800 shadow-lg text-primary dark:text-light_gray bg-light_primary/50 dark:bg-primary_dark/70 text-nowrap">
      <div className="flex px-3 py-2 gap-3 w-full items-start rounded-lg bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800">
        <div className="flex flex-col gap-2 py-1">
          <div className="text-xs sm:text-sm text-center tracking-wide">
            Temporary alternative link to the website:
            <div className="text-[10px] sm:text-xs font-light text-center tracking-wide">
              ( Tymczasowy alternatywny link do strony: )
            </div>
          </div>
          <Link
            href="https://simrail.live-map.workers.dev/"
            target="_blank"
            className="group flex p-2 bg-light_primary_light dark:bg-primary_dark rounded-md border border-primary/50 hover:border-primary hover:scale-[1.02] transition-all"
          >
            <div className="flex text-sm sm:text-base gap-2 w-full h-full justify-center items-center">
              simrail.live-map.workers.dev
              <FiExternalLink className="w-3 h-4 opacity-50 group-hover:opacity-100" />
            </div>
          </Link>
        </div>
        <button className="text-xl bg-light_primary dark:bg-primary hover:font-medium" onClick={handleCloseModal}>
          &times;
        </button>
      </div>
    </div>
  );
};
export default InfoModal;
