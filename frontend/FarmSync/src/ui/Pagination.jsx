import {HiChevronLeft, HiChevronRight} from "react-icons/hi";
import {useSearchParams} from "react-router-dom";

export const PAGE_SIZE = 5;

function Pagination({count}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between">
      <p className="ml-3 text-sm text-text-secondary">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-semibold"> {count} </span> results
      </p>
      <div className="flex gap-2">
        <button
          className="flex items-center gap-1 rounded-md  bg-bg px-3 py-1.5 text-sm font-medium text-text-primary transition-all duration-200 enabled:hover:bg-action-hover cursor-pointer enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </button>
        <button
          className="flex items-center gap-1 rounded-md  bg-bg px-3 py-1.5 text-sm font-medium text-text-primary transition-all duration-200 enabled:hover:bg-action-hover cursor-pointer enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
