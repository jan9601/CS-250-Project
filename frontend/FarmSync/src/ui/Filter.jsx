import {useSearchParams} from "react-router-dom";

function Filter({filterField, options}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-1 rounded-md border border-border bg-surface p-1 shadow-sm">
      {options.map((option) => {
        return (
          <button
            disabled={currentFilter === option.value}
            key={option.value}
            onClick={() => handleClick(option.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-300 cursor-pointer disabled:cursor-not-allowed ${currentFilter === option.value ? "bg-action-primary text-white" : "bg-surface text-text-primary hover:bg-action-primary hover:text-white"}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default Filter;
