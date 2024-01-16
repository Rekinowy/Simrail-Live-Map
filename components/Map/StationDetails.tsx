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
    <>
      <div className="absolute hidden md:flex flex-col gap-4 top-2.5 right-2.5 p-4 z-[1000] rounded-xl border-2 border-slate-800 text-white text-base bg-primary bg-opacity-90 backdrop-blur-sm">
        <div className="flex flex-col gap-2">
          <div className="h-[125px] w-[291px] rounded-lg shadow-lg overflow-hidden">
            <Image
              src={stationImage}
              alt="Station image"
              width={291}
              height={125}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex flex-col items-center gap-1">
              <div className="text-xl font-bold text-slate-200 border-2 border-slate-300 rounded-[4px] px-2 my-2 bg-blue-700">
                {stationPrefix}
              </div>
              <div className="text-lg">{stationName}</div>
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
            <div className="border-l border-t opacity-30" />
            <div className="flex gap-3 items-center">
              <img src="/user.png" className="w-5" />
              <span className="font-medium text-base">{username}</span>
            </div>
          </>
        )}
      </div>

      <div className="absolute flex md:hidden w-[80%] max-w-[380px] justify-evenly gap-2 bottom-2.5 left-1/2 transform -translate-x-1/2 p-2 z-[1000] rounded-xl border-2 border-slate-800 text-white text-base bg-primary bg-opacity-90 backdrop-blur-sm">
        <div className="flex flex-col min-w-[40%] justify-center items-center">
          <div className="text-sm border-2 font-bold text-slate-200 border-slate-300 rounded-[4px] px-2 my-2 bg-blue-700">
            {stationPrefix}
          </div>
          <div className="text-sm text-center">{stationName}</div>
        </div>
        <div className="border-l opacity-30" />
        <div className="flex flex-col min-w-[50%] gap-3 items-center justify-center">
          <div className="flex gap-1 items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < difficulty ? "/star-filled.png" : "/star.png"}
                className="w-3"
              />
            ))}
          </div>
          {user && (
            <div className="flex gap-3">
              <div className="flex items-center">
                <img src="/user.png" className="w-5" />
              </div>
              <span className="font-medium text-sm">{username}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default StationDetails;
