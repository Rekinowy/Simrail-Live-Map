const CustomAttribution = ({ locale, setModalOpen }: { locale: string; setModalOpen: (open: boolean) => void }) => {
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <footer className="z-[800] absolute flex items-center right-0 bottom-0 text-slate-700/80 dark:text-light_gray/80 pl-0.5 bg-light_primary/80 dark:bg-primary/80 rounded-l-md border border-primary/30 backdrop-blur-sm">
      <a href="https://leafletjs.com/" target="_blank">
        <img
          src="/leaflet-logo.png"
          alt="Leaflet"
          className="h-3 dark:grayscale dark:brightness-[3] opacity-80 hover:opacity-100 px-1"
        />
      </a>{" "}
      | &copy;
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        className="!text-slate-700/80 dark:!text-light_gray/80 px-1 hover:underline"
      >
        OpenStreetMap
      </a>{" "}
      | Created by{" "}
      <p
        onClick={handleOpenModal}
        className="!text-slate-700/90 dark:!text-light_gray/90 px-1 hover:underline cursor-pointer"
      >
        Rekinowy
      </p>
    </footer>
  );
};
export default CustomAttribution;
