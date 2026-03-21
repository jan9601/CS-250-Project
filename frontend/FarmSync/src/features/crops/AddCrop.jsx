import CreateCropForm from "./CreateCropForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCrop() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="crop-form">
          <Button>Add new crop</Button>
        </Modal.Open>
        <Modal.Window name="crop-form">
          <CreateCropForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCrop;
