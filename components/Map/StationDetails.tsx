import Image from "next/image";

type StationDetailsType = {
  stationName: string;
  stationPrefix: string;
  stationImage: string;
  difficulty: number;
  user: { name: string; avatar: string; dispatcher_time: number };
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
      <div className="absolute hidden md:flex flex-col gap-4 top-2.5 right-3 w-64 lg:w-72 p-4 z-[1000] rounded-xl border-2 border-slate-800 text-white text-base bg-primary bg-opacity-90 backdrop-blur-sm">
        <div className="flex flex-col gap-2">
          <div className="h-fullw-full rounded-lg shadow-lg overflow-hidden">
            <Image
              src={stationImage}
              alt="Station image"
              width={291}
              height={125}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="text-lg lg:text-xl text-center font-bold min-w-[42px] text-slate-200 border-2 border-slate-300 rounded-[4px] px-2 my-2 bg-blue-700">
                {stationPrefix}
              </div>
              <div className="text-lg lg:text-xl text-center">
                {stationName}
              </div>
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
            <div className="flex flex-col gap-1">
              <div className="flex gap-3 items-center">
                <img src="/user.png" className="w-5" />
                <span className="font-medium text-sm lg:text-base">
                  {username}
                </span>
              </div>
              {user.dispatcher_time && user.dispatcher_time !== 0 && (
                <div className="flex gap-3">
                  <div className="flex items-center w-5 justify-center">
                    <img src="/time.png" className="w-4" />
                  </div>
                  <span className="text-sm font-thin lg:text-base">
                    {Math.round(user.dispatcher_time / 60)} h
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* mobile devices */}
      <div className="absolute flex md:hidden w-[80%] max-w-[280px] justify-evenly gap-2 bottom-6 left-1/2 transform -translate-x-1/2 p-2 z-[1000] rounded-xl border-2 border-slate-800 text-white text-base bg-primary bg-opacity-90 backdrop-blur-sm">
        <div className="flex flex-col min-w-[40%] justify-center items-center">
          <div className="text-sm text-center border-2 min-w-[30px] font-bold text-slate-200 border-slate-300 rounded-[4px] px-2 py-0.5 my-2 bg-blue-700">
            {stationPrefix}
          </div>
          <div className="text-xs text-center">{stationName}</div>
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
            <div className="flex flex-col gap-1">
              <div className="flex gap-3">
                <div className="flex items-center">
                  <img src="/user.png" className="w-5" />
                </div>
                <span className="font-medium text-sm">{username}</span>
              </div>
              {user.dispatcher_time && user.dispatcher_time !== 0 && (
                <div className="flex gap-3">
                  <div className="flex items-center w-5 justify-center">
                    <img src="/time.png" className="w-4" />
                  </div>
                  <span className="text-sm font-thin">
                    {Math.round(user.dispatcher_time / 60)} h
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default StationDetails;
