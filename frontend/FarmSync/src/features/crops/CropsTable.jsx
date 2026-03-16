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

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loader"></span>
      </div>
    );

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface ">
      <div className="crops-row border-b text-left border-border bg-bg text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
        <div>Name</div>
        <div>Harvest Date</div>
        <div>Confidence</div>
        <div>Price</div>
        <div>Quantity</div>
        <div className="text-center">Status</div>
        <div className="text-center">Actions</div>
      </div>

      {crops.map((crop) => (
        <CropsRow crop={crop} key={crop.id} />
      ))}
    </div>
  );
}

export default CropsTable;
