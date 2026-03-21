import Button from "./Button";
import Heading from "./Heading";

/**
 * ConfirmDelete
 * -------------
 * Reusable confirmation dialog used before deleting resources.
 *
 * This component is meant to be rendered inside the shared Modal system.
 * It receives the resource name, confirm handler, disabled state,
 * and the modal close handler injected by Modal.Window.
 */

function ConfirmDelete({resourceName, onConfirm, disabled, onCloseModal}) {
  return (
    <div className="w-160 flex flex-col gap-5 p-7">
      <Heading type="h3">Delete {resourceName}</Heading>
      <p className="text-text-secondary">
        {" "}
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end gap-5">
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
