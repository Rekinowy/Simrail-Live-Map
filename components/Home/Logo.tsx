import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex gap-2.5 md:gap-3 items-center">
      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px]">
        <Image width={72} height={72} src={"/favicon.png"} alt="logo" className="shadow-lg" />
      </div>
      <div className="flex flex-col font-medium mt-0.5 md:mt-0" style={{ textShadow: "2px 2px 2px #1d2935" }}>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wider leading-6 text-light_primary_light">
          SimRail
        </h1>
        <h2 className="sm:text-lg md:text-xl lg:text-2xl tracking-[0.08em] sm:tracking-[0.13em] md:tracking-[0.21em] leading-6 text-light_gray">
          Live Map
        </h2>
      </div>
    </div>
  );
};
export default Logo;
