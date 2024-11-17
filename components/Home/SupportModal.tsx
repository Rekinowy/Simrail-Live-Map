import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { BiWorld } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";

const SupportModal = ({ setModalOpen }: { setModalOpen: (open: boolean) => void }) => {
  const { t } = useTranslation();

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="absolute top-0 w-full h-full z-[2000] flex justify-center items-center ">
      <div className="absolute w-full h-full bg-primary/50 backdrop-blur-md" />
      <div className="flex flex-col gap-3 z-[100] p-3 rounded-lg border-1 border-slate-400 dark:border-slate-800 shadow-lg text-primary dark:text-light_gray bg-light_primary/50 dark:bg-primary_dark/70 scale-80 xs:scale-100">
        <div className="flex flex-col gap-6 p-5 w-full justify-between rounded-lg bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800">
          <div className="max-w-[278px] text-xl text-center pb-2 tracking-wide">{t("Home:support_me")}</div>
          <Link
            href="https://buymeacoffee.com/baru94devm"
            target="_blank"
            className="group flex justify-between gap-4 p-2 h-14 bg-yellow-500 rounded-md border border-primary/50 hover:border-primary hover:scale-[1.02] transition-all"
          >
            <Image src="/buymeacoffee.png" alt="Buy Me a Coffee" width={200} height={40} />
            <div className="flex gap-1 text-black">
              <BiWorld className="w-6 h-6 " />
              <FiExternalLink className="w-4 h-5 opacity-50 group-hover:opacity-100" />
            </div>
          </Link>

          <Link
            href="https://buycoffee.to/rekinowy"
            target="_blank"
            className="group flex justify-between gap-4 p-2 h-14 bg-slate-100 rounded-md border border-primary/50 hover:border-primary hover:scale-[1.02] transition-all"
          >
            <Image src="/buycoffee.svg" alt="Buy Me a Coffee" width={200} height={40} />
            <div className="flex gap-1">
              <div className="flex justify-center w-5 h-5">
                <Image src="/pl.svg" alt="Buy Me a Coffee" width={24} height={24} />
              </div>
              <FiExternalLink className="w-4 h-5 text-black opacity-50 group-hover:opacity-100" />
            </div>
          </Link>
          <div className="max-w-[278px] font-medium text-center text-xl pt-4">{t("Home:thanks")}</div>
        </div>
        <div className="flex justify-center">
          <div className="flex w-full justify-center">
            <Button
              className="w-full bg-light_primary dark:bg-primary border border-slate-400 dark:border-slate-800 text-sm"
              size="md"
              onClick={handleCloseModal}
            >
              {t("Home:close")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SupportModal;
