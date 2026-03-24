import CropsStatusChart from "./CropsStatusChart";
import HarvestTimelineChart from "./HarvestTimelineChart";
import Stats from "./Stats";
import UpcomingHarvests from "./UpcomingHarvests";
import {useDashboardData} from "./useDashboarData";

function DashboardLayout() {
  const {isLoading, upcomingCrops, stats, timelineData, statusData} =
    useDashboardData();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-8">
      <div className="col-span-full">
        <Stats stats={stats} />
      </div>
      <div className="col-span-2">
        <UpcomingHarvests upcomingCrops={upcomingCrops} />
      </div>
      <div className="col-span-2">
        <CropsStatusChart statusData={statusData} />
      </div>
      <div className="col-span-full">
        <HarvestTimelineChart timelineData={timelineData} />
      </div>
    </div>
  );
}

export default DashboardLayout;
