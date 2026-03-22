import {useSearchParams} from "react-router-dom";
import {useCrops} from "../crops/useCrops";
import MarketplaceGrid from "./MarketplaceGrid";

function MarketplaceLayout() {
  const {isLoading, crops} = useCrops();
  const [searchParams] = useSearchParams();

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

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loader"></span>
      </div>
    );
  return <MarketplaceGrid crops={sortedCrops} />;
}

export default MarketplaceLayout;
