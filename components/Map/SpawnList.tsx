import { useEffect, useState } from "react";
import SpawnListItem from "./SpawnListItem";
import { passengerTrainsData } from "../../lib/constants/passengerTrainsData";
import { passengerEmuTrainsData } from "../../lib/constants/passengerEmuTrainsData";
import { cargoTrainsData } from "../../lib/constants/cargoTrainsData";

export interface Train {
  id: string;
  locos: string[];
  isDLC: boolean;
  spawnTime: string;
  length: number;
  weight: number;
  spawnTimeDate: Date;
}

const SpawnList = ({
  currentTime,
  availableTrains,
  setSelectedMarker,
  setShowSpawnList,
  selectedTrainId,
  setSelectedTrainId,
}: {
  currentTime: string;
  availableTrains: [{ number: string; type: string }];
  setSelectedMarker: (value: string) => void;
  setShowSpawnList: (value: boolean) => void;
  selectedTrainId: string | null;
  setSelectedTrainId: (id: string | null) => void;
}) => {
  const [upcomingTrains, setUpcomingTrains] = useState<Train[]>([]);

  const handleSelectTrain = (id: string) => {
    setSelectedMarker("");
    setSelectedTrainId(id === selectedTrainId ? null : id);
  };

  useEffect(() => {
    const calculateUpcomingTrains = () => {
      const currentDate = new Date();
      const [currentHour, currentMinute, currentSecond] = currentTime.split(":").map(Number);
      currentDate.setHours(currentHour, currentMinute, currentSecond, 0);

      const combineData = (data: Record<string, any>) => {
        return Object.entries(data).map(([id, train]) => {
          const [hour, minute] = train.spawnTime.split(":").map(Number);
          const spawnDate = new Date(currentDate);
          spawnDate.setHours(hour, minute, 0, 0);

          // Handle case where spawn time is on the next day
          if (spawnDate.getTime() < currentDate.getTime() && hour < currentHour) {
            spawnDate.setDate(spawnDate.getDate() + 1);
          }

          return { id, ...train, spawnTimeDate: spawnDate };
        });
      };

      const allTrains = [
        ...combineData(passengerTrainsData),
        ...combineData(passengerEmuTrainsData),
        ...combineData(cargoTrainsData),
      ];

      const upcoming = allTrains
        .filter((train) => {
          const pastLimit = new Date(currentDate.getTime() - 1 * 60 * 1000);
          const futureLimit = new Date(currentDate.getTime() + 59 * 60 * 1000);

          return train.spawnTimeDate > pastLimit && train.spawnTimeDate <= futureLimit;
        })
        .sort((a, b) => a.spawnTimeDate.getTime() - b.spawnTimeDate.getTime());

      setUpcomingTrains(upcoming);
    };

    calculateUpcomingTrains();
  }, [currentTime]);

  return (
    <div className="rounded-lg overflow-hidden">
      <ul className="flex flex-col gap-0.5 overflow-y-auto z-10 scrollbar scrollbar-thumb-light_primary_light/60 scrollbar-track-light_primary/50 dark:scrollbar-thumb-primary_light dark:scrollbar-track-primary/70 scrollbar-thumb-rounded-lg max-h-[70dvh]">
        {upcomingTrains.map((train) => (
          <SpawnListItem
            key={train.id}
            train={train}
            currentTime={currentTime}
            isSelected={train.id === selectedTrainId}
            onSelect={() => handleSelectTrain(train.id)}
            availableTrains={availableTrains}
            setSelectedMarker={setSelectedMarker}
            setShowSpawnList={setShowSpawnList}
            setSelectedTrainId={setSelectedTrainId}
          />
        ))}
      </ul>
    </div>
  );
};
export default SpawnList;
