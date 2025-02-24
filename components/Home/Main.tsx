"use client";

import { useState } from "react";
import Header from "./Header";
import ServersList from "./ServersList";
import SupportModal from "./SupportModal";
import { MdEmail } from "react-icons/md";
import ChangelogButton from "../UI/ChangelogButton";
import InfoModal from "./InfoModal";

const Main = ({ title }: { title: string }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(true);

  return (
    <main className="flex flex-col h-[100dvh] items-center p-4 md:p-8">
      <Header setModalOpen={setModalOpen} />
      <section
        className={`pt-8 pb-4 md:pb-8 text-2xl sm:text-4xl md:text-5xl text-slate-200 font-roboto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ${
          isModalOpen && "hidden"
        }`}
      >
        <h2 style={{ textShadow: "1px 1px 1px #1d2935" }}>{title}</h2>
      </section>{" "}
      <ServersList isModalOpen={isModalOpen} />
      <ChangelogButton />
      <footer className="absolute bottom-4 pt-4 text-sm text-light_primary_light dark:text-light_primary_dark opacity-50 ">
        © 2025 | Created by{" "}
        <a href={`mailto:rekinowy994@gmail.com`} className="font-medium opacity-100 hover:underline">
          Rekinowy <MdEmail className="inline w-5 h-4 mb-0.5" />
        </a>
      </footer>
      {isModalOpen && <SupportModal setModalOpen={setModalOpen} />}
      {isInfoModalOpen && <InfoModal setModalOpen={setInfoModalOpen} />}
    </main>
  );
};
export default Main;
