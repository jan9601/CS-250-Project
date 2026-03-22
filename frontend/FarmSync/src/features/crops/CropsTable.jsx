import {useSearchParams} from "react-router-dom";
import {useCrops} from "./useCrops";
import CropsRow from "./CropsRow";

function CropsTable() {
  const {isLoading, crops} = useCrops();
  const [searchParams] = useSearchParams();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loader"></span>
      </div>
    );

  // 1) FILTER
  const filterValue = searchParams.get("status") || "all";
  let filteredCrops;

  if (filterValue === "all") filteredCrops = crops;
  if (filterValue === "harvest-soon")
    filteredCrops = crops.filter((crop) => crop.status === "HARVEST_SOON");
  if (filterValue === "future")
    filteredCrops = crops.filter((crop) => crop.status === "FUTURE");
  if (filterValue === "available")
    filteredCrops = crops.filter((crop) => crop.status === "AVAILABLE");

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "predictedHarvestDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCrops = filteredCrops?.slice()?.sort((a, b) => {
    if (field === "predictedHarvestDate") {
      return (
        (new Date(a.predictedHarvestDate) - new Date(b.predictedHarvestDate)) *
        modifier
      );
    }

    return (a[field] - b[field]) * modifier;
  });

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="crops-row-header border-b border-border bg-bg text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
        <div className="justify-self-start">Name</div>
        <div className="justify-self-center ml-7">Harvest</div>
        <div className="justify-self-center">Confidence</div>
        <div className="justify-self-center">Price</div>
        <div className="justify-self-center">Quantity</div>
        <div className="justify-self-center">Status</div>
        <div className="justify-self-center">Actions</div>
      </div>

      {sortedCrops.map((crop) => (
        <CropsRow crop={crop} key={crop.id} />
      ))}
    </div>
  );
}

export default CropsTable;
