import {formatCurrency} from "../../utils/helpers";
import {HiPencil, HiTrash} from "react-icons/hi";
import CreateCropForm from "./CreateCropForm";
import {useDeleteCrop} from "./useDeleteCrop";
import {formatStatus} from "../../utils/formatStatus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

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
  const {isDeleting, deleteCrop} = useDeleteCrop();

  const {
    id: cropId,
    name,

    predictedHarvestDate,
    confidenceScore,
    price,
    quantity,
    status,
  } = crop;

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
    <div className="crops-row bg-surface text-xs text-text-primary ">
      <div className="font-semibold justify-self-start">{name}</div>

      <div className="justify-self-center">{predictedHarvestDate}</div>

      <div className=" justify-self-center mr-4">
        {(confidenceScore * 100).toFixed()}%
      </div>

      <div className="justify-self-center">{formatCurrency(+price)}</div>

      <div className="justify-self-center">{+quantity}</div>

      <span
        className={`w-26 mx-auto justify-center rounded-full py-1 text-center text-[11px] font-medium ${statusStyle[status]}`}
      >
        {formatStatus(status)}
      </span>

      <div className="flex items-center justify-self-center gap-2 text-lg text-brand-primary">
        <Modal>
          <Modal.Open opens="edit">
            <button
              type="button"
              className="cursor-pointer rounded-md p-1 transition-colors hover:bg-brand-light/20"
              aria-label={`Edit ${name}`}
              title="Edit crop"
            >
              <HiPencil />
            </button>
          </Modal.Open>

          <Modal.Window name="edit">
            <CreateCropForm cropToEdit={crop} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <button
              type="button"
              className="cursor-pointer rounded-md p-1 transition-colors hover:bg-error/10 hover:text-error"
              aria-label={`Delete ${name}`}
              title="Delete crop"
            >
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="crops"
              disabled={isDeleting}
              onConfirm={() => deleteCrop(cropId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default CropsRow;
