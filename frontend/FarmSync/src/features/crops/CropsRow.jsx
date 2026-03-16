import {HiSquare2Stack} from "react-icons/hi2";
import {formatCurrency} from "../../utils/helpers";
import {HiPencil, HiTrash} from "react-icons/hi";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCrop} from "../../services/cropsApi";
import toast from "react-hot-toast";

/**
 * CropsRow
 * --------
 * Represents one crop row inside the crops table.
 *
 * This row shows the most important crop information for the farmer:
 * - name
 * - predicted harvest date
 * - confidence score
 * - price
 * - quantity
 * - status
 * - actions
 */
function CropsRow({crop}) {
  const {
    id: cropId,
    name,
    plantingDate,
    predictedHarvestDate,
    confidenceScore,
    price,
    quantity,
    status,
  } = crop;

  const queryClient = useQueryClient();

  const {isLoading: isDeleting, mutate} = useMutation({
    mutationFn: deleteCrop,
    onSuccess: () => {
      toast.success("Crop successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["crops"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  /**
   * Maps each crop status to a badge color style.
   * These colors follow the FarmSync design system:
   * - AVAILABLE -> green
   * - HARVEST_SOON -> yellow
   * - FUTURE -> blue
   */
  const statusStyle = {
    AVAILABLE: "bg-success/15 text-success",
    HARVEST_SOON: "bg-accent-harvest/15 text-accent-harvest",
    FUTURE: "bg-info/15 text-info",
  };

  return (
    <div className="crops-row bg-surface text-sm text-text-primary">
      <div className="font-semibold">{name}</div>

      <div>{predictedHarvestDate}</div>

      <div>{(confidenceScore * 100).toFixed()}%</div>

      <div>{formatCurrency(price)}</div>

      <div>{quantity}</div>

      <div className="flex justify-center">
        <span
          className={`inline-block min-w-30 rounded-full px-3 py-1 text-center text-xs font-medium uppercase ${statusStyle[status]}`}
        >
          {status}
        </span>
      </div>

      <div className="flex items-center justify-center gap-2 text-2xl text-brand-primary">
        <button
          type="button"
          className="cursor-pointer rounded-md p-1 transition-colors hover:bg-brand-light/20"
          aria-label={`Duplicate ${name}`}
          title="Duplicate crop"
        >
          <HiSquare2Stack />
        </button>

        <button
          type="button"
          className="cursor-pointer rounded-md p-1 transition-colors hover:bg-brand-light/20"
          aria-label={`Edit ${name}`}
          title="Edit crop"
        >
          <HiPencil />
        </button>

        <button
          type="button"
          className="cursor-pointer rounded-md p-1 transition-colors hover:bg-error/10 hover:text-error"
          aria-label={`Delete ${name}`}
          title="Delete crop"
          onClick={() => mutate(cropId)}
          disabled={isDeleting}
        >
          <HiTrash />
        </button>
      </div>
    </div>
  );
}

export default CropsRow;
