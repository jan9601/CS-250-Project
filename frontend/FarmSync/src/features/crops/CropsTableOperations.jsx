import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CropsTableOperations() {
  return (
    <div className="flex items-center gap-6">
      <Filter
        filterField="status"
        options={[
          {value: "all", label: "All"},
          {value: "available", label: "Available"},
          {value: "harvest-soon", label: "Harvest Soon"},
          {value: "future", label: "Future"},
        ]}
      />

      <SortBy
        options={[
          {
            value: "predictedHarvestDate-asc",
            label: "Harvest date (soonest first)",
          },
          {
            value: "predictedHarvestDate-desc",
            label: "Harvest date (latest first)",
          },

          {value: "price-asc", label: "Price (low → high)"},
          {value: "price-desc", label: "Price (high → low)"},

          {value: "quantity-asc", label: "Quantity (low → high)"},
          {value: "quantity-desc", label: "Quantity (high → low)"},

          {
            value: "confidenceScore-asc",
            label: "Confidence (low → high)",
          },
          {
            value: "confidenceScore-desc",
            label: "Confidence (high → low)",
          },
        ]}
      />
    </div>
  );
}

export default CropsTableOperations;
