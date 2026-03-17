import {HiSquare2Stack} from "react-icons/hi2";
import {formatCurrency} from "../../utils/helpers";
import {HiPencil, HiTrash} from "react-icons/hi";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCrop} from "../../services/cropsApi";
import toast from "react-hot-toast";
import {useState} from "react";
import CreateCropForm from "./CreateCropForm";

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
  const [showForm, setShowForm] = useState(false);

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
    <>
      <div className="crops-row bg-surface text-xs text-text-primary ">
        <div className="font-semibold justify-self-start">{name}</div>

        <div className="justify-self-center">{predictedHarvestDate}</div>

        <div className=" justify-self-center mr-4">
          {(confidenceScore * 100).toFixed()}%
        </div>

        <div className="justify-self-center">{formatCurrency(price)}</div>

        <div className="justify-self-center">{quantity}</div>

        <span
          className={`w-26 mx-auto justify-center rounded-full py-1 text-center text-[11px] font-medium ${statusStyle[status]}`}
        >
          {status}
        </span>

        <div className="flex items-center justify-self-center gap-2 text-[16px] text-brand-primary">
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
            onClick={() => setShowForm((show) => !show)}
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
      {showForm && <CreateCropForm cropToEdit={crop} />}
    </>
  );
}

export default CropsRow;
