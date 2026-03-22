import {useSearchParams} from "react-router-dom";
import CropsRow from "./CropsRow";
import {useCrops} from "./useCrops";

/**
 * CropsTable
 * ----------
 * Displays the farmer's crops in a table-like layout.
 *
 * The header and rows share the same `.crops-row` grid class
 * so that all columns stay aligned.
 */
function CropsTable() {
  const {isLoading, crops} = useCrops();
  const [searchParams] = useSearchParams();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loader"></span>
      </div>
    );

  const filterValue = searchParams.get("status") || "all";
  console.log(crops);

  let filteredCrops;
  if (filterValue === "all") filteredCrops = crops;
  if (filterValue === "harvest-soon")
    filteredCrops = crops.filter((crop) => crop.status === "HARVEST_SOON");
  if (filterValue === "future")
    filteredCrops = crops.filter((crop) => crop.status === "FUTURE");
  if (filterValue === "available")
    filteredCrops = crops.filter((crop) => crop.status === "AVAILABLE");

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface ">
      <div className="crops-row-header border-b border-border bg-bg text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
        <div className=" justify-self-start">Name</div>
        <div className=" justify-self-center ml-7">Harvest</div>
        <div className=" justify-self-center">Confidence</div>
        <div className=" justify-self-center">Price</div>
        <div className=" justify-self-center">Quantity</div>
        <div className=" justify-self-center">Status</div>
        <div className=" justify-self-center">Actions</div>
      </div>

      {filteredCrops.map((crop) => (
        <CropsRow crop={crop} key={crop.id} />
      ))}
    </div>
  );
}

export default CropsTable;
