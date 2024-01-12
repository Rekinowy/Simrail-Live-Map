import Image from "next/image";

type StationDetailsType = {
  stationName: string;
  stationPrefix: string;
  stationImage: string;
  difficulty: number;
  user: { username: string; avatar: string };
  username: string;
};

const StationDetails = ({
  stationName,
  stationPrefix,
  stationImage,
  difficulty,
  user,
  username,
}: StationDetailsType) => {
  return (
    <div className="absolute flex max-sm:max-w-[400px] md:flex-col gap-4 top-2.5 md:top-5 right-2.5 md:right-5 p-4 z-[1000] rounded-xl border-2 border-slate-800 text-white text-base bg-primary bg-opacity-90 backdrop-blur-sm">
      <div className="flex flex-col gap-2">
        <div className="w-[200px] h-[75px] md:h-[125px] md:w-[291px] rounded-lg shadow-lg overflow-hidden">
          <Image
            src={stationImage}
            alt="Station image"
            width={291}
            height={125}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col md:gap-2 justify-center items-center">
          <div className="flex md:flex-col items-center gap-3 md:gap-1 max-sm:max-w-[180px]">
            <div className="text-sm md:text-xl border-2 border-slate-300 rounded-[4px] px-2 my-2 bg-blue-700">
              <span className="font-bold text-slate-200">{stationPrefix}</span>
            </div>
            <span className="text-sm md:text-lg">{stationName}</span>
          </div>
          <div className="flex gap-1 items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < difficulty ? "/star-filled.png" : "/star.png"}
                className="w-3"
              />
            ))}
          </div>
        </div>
      </div>

      {user && (
        <>
          <div className="border-l md:border-t opacity-30" />
          <div className="flex gap-3 items-center">
            <img src="/user.png" className="w-5" />
            <span className="font-medium text-sm md:text-base">{username}</span>
          </div>
        </>
      )}
    </div>
  );
};
export default StationDetails;
