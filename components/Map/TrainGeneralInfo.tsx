type TrainGeneralType = {
  departure: string;
  destination: string;
  speed: number;
  user: { name: string; avatar: string; distance_meter: number };
  username: string;
};

const TrainGeneralInfo = ({
  departure,
  destination,
  speed,
  user,
  username,
}: TrainGeneralType) => {
  return (
    <>
      <div className="flex flex-col min-w-[120px] justify-center text-sm lg:text-base">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <img src="/speed.png" alt="" className="w-5" />
            <p className="font-medium">{speed.toFixed()} km/h</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <img src="/dep.png" alt="Departure icon" className="w-5 h-5" />
              <p className="capitalize leading-5 font-light">
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
            {user.distance_meter && user.distance_meter !== 0 && (
              <div className="mt-1 flex gap-3 items-center">
                <div className="flex w-5 justify-center">
                  <img src="/distance.png" className="w-[18px]" />
                </div>
                <div className="font-thin">
                  {Math.round(user.distance_meter / 1000)} km
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default TrainGeneralInfo;
