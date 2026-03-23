import Stats from "./Stats";
import {useDashboardData} from "./useDashboarData";

function DashboardLayout() {
  const {isLoading, crops, stats, timelineData, statusData} =
    useDashboardData();

  console.log(crops);
  console.log(stats);
  console.log(timelineData);
  console.log(statusData);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="grid grid-cols-4 grid-rows[auto 34rem auto] gap-10">
      <Stats stats={stats} />
    </div>
  );
}

export default DashboardLayout;
