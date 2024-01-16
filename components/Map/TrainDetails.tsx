type TrainDetailsType = {
  trainNumber: string;
  trainName: string;
  departure: string;
  destination: string;
  speed: number;
  user: { username: string; avatar: string };
  username: string;
  trainImg: string;
  vehicles: string[];
};

const TrainDetails = ({
  trainNumber,
  trainName,
  departure,
  destination,
  speed,
  user,
  username,
  trainImg,
  vehicles,
}: TrainDetailsType) => {
  return (
    <>
      <div className="hidden lg:flex absolute flex-col gap-3 top-2.5 right-3 w-72 p-4 z-[1000] rounded-xl border-2 border-slate-800 shadow-lg text-white text-base bg-primary bg-opacity-90 backdrop-blur-sm">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col h-28 w-28 justify-center">
            <img src={"/trains/" + trainImg} alt="train" />
          </div>
          <div className="flex flex-col items-center leading-5">
            <h1 className="text-xl">
              {trainName} <span className="font-bold">{trainNumber}</span>
            </h1>
            <span className="text-base">{vehicles[0]}</span>
          </div>
        </div>
        <div className="border-l border-t opacity-30"></div>
        <div className="flex flex-col min-w-[120px] justify-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <img src="/speed.png" alt="" className="w-5" />
              <p className="font font-medium">{speed.toFixed()} km/h</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <img src="/dep.png" alt="Departure icon" className="w-5 h-5" />
                <p className="capitalize leading-5">
                  {departure.charAt(1) === departure.charAt(1).toUpperCase()
                    ? departure.toLowerCase()
                    : departure}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img src="/des.png" alt="Departure icon" className="w-5 h-5" />
                <p className="capitalize leading-5">
                  {destination.charAt(1) === destination.charAt(1).toUpperCase()
                    ? destination.toLowerCase()
                    : destination}
                </p>
              </div>
            </div>
          </div>
          {user && (
            <>
              <div className="border-t my-3 opacity-30"></div>
              <div className="flex gap-3 items-center">
                <img src="/user.png" className="w-5" />
                <span className="font-medium">{username}</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex lg:hidden absolute p-2 w-[80%] max-w-[380px] justify-evenly bottom-4 z-[1000] left-1/2 transform -translate-x-1/2 rounded-xl border-2 border-slate-800 shadow-lg text-white bg-primary bg-opacity-90 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <div className="flex flex-col h-20 w-20 justify-center">
            <img src={"/trains/" + trainImg} alt="train" />
          </div>
          <div className="flex flex-col items-center leading-5">
            <h1 className="text-sm text-center">
              {trainName} <span className="font-bold">{trainNumber}</span>
            </h1>
            <span className="text-xs text-center">{vehicles[0]}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="border-l border-t opacity-30"></div>
          <div className="flex flex-col min-w-[120px] justify-center">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <img src="/speed.png" alt="" className="w-4" />
                <p className="font font-medium">{speed.toFixed()} km/h</p>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <img
                    src="/dep.png"
                    alt="Departure icon"
                    className="w-4 h-4"
                  />
                  <p className="capitalize leading-2">
                    {departure.charAt(1) === departure.charAt(1).toUpperCase()
                      ? departure.toLowerCase()
                      : departure}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="/des.png"
                    alt="Departure icon"
                    className="w-4 h-4"
                  />
                  <p className="capitalize leading-2">
                    {destination.charAt(1) ===
                    destination.charAt(1).toUpperCase()
                      ? destination.toLowerCase()
                      : destination}
                  </p>
                </div>
              </div>
            </div>
            {user && (
              <>
                <div className="border-t my-2 opacity-30"></div>
                <div className="flex gap-3 items-center">
                  <img src="/user.png" className="w-4" />
                  <span className="font-medium">{username}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default TrainDetails;
