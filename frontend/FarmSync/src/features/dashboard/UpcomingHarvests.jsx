import Heading from "../../ui/Heading";
import {formatStatus} from "../../utils/formatStatus";

function UpcomingHarvests({upcomingCrops}) {
  const statusStyle = {
    AVAILABLE: "bg-success/15 text-success",
    HARVEST_SOON: "bg-accent-harvest/15 text-accent-harvest",
    FUTURE: "bg-info/15 text-info",
  };
  return (
    <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
      <Heading type="h2" className="mb-2">
        Upcoming Harvests
      </Heading>

      {!upcomingCrops?.length ? (
        <p className="text-sm text-text-secondary">No upcoming harvests yet.</p>
      ) : (
        <div className="divide-y divide-border">
          {upcomingCrops.map((crop) => (
            <div
              key={crop.id}
              className="flex items-center justify-between py-1.75"
            >
              <div>
                <p className="font-semibold text-text-primary">{crop.name}</p>
                <p className="text-sm text-text-secondary">
                  {formatChartDate(crop.predictedHarvestDate)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-base font-semibold text-text-primary">
                  {crop.quantity}
                  <span className="ml-1 text-sm font-medium text-text-secondary">
                    units
                  </span>
                </p>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${statusStyle[crop.status]}`}
                >
                  {formatStatus(crop.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingHarvests;

function formatChartDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(new Date(dateString));
}
