import Filter from "../../ui/Filter";

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
    </div>
  );
}

export default CropsTableOperations;
