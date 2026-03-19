import {useForm} from "react-hook-form";

import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import {useCreateCrop} from "./useCreateCrop";
import {useUpdateCrop} from "./useUpdateCrop";

function CreateCropForm({cropToEdit = {}}) {
  const {id: editId, ...editValues} = cropToEdit;
  const isEditSession = Boolean(editId);

  const {register, handleSubmit, reset, formState} = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const {errors} = formState;
  const {isCreating, createNewCrop} = useCreateCrop();
  const {isUpdating, updateCrop} = useUpdateCrop();

  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    if (isEditSession)
      updateCrop(
        {updatedCrop: data, id: editId},
        {
          onSuccess: () => reset(),
        },
      );
    else
      createNewCrop(data, {
        onSuccess: () => reset(),
      });
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <form
      className="px-8 py-8 bg-surface border border-border rounded-md"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow label="Crop type">
        <select
          id="name"
          {...register("name")}
          className="border text-xs border-border p-2 cursor-pointer"
        >
          <option>Almonds</option>
          <option>Table grapes</option>
        </select>
      </FormRow>

      <FormRow label="Planting Date" error={errors?.plantingDate?.message}>
        <Input
          type="date"
          id="plantingDate"
          {...register("plantingDate", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Location">
        <select
          className="border text-xs border-border p-2 cursor-pointer"
          id="location"
          {...register("location")}
        >
          <option>Fresno, CA</option>
          <option>Bakersfield, CA</option>
          <option>Modesto, CA</option>
        </select>
      </FormRow>

      <FormRow label="Unit price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          {...register("price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least $1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Quantity" error={errors?.quantity?.message}>
        <Input
          type="number"
          id="quantity"
          {...register("quantity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Quantity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Crop description (optional)">
        <textarea
          className="px-3 py-4 border text-sm border-border rounded-sm shadow-sm w-max h-15"
          type="text"
          id="description"
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={isWorking}>
          {isEditSession ? "Edit Crop" : "Create new crop"}
        </Button>
      </FormRow>
    </form>
  );
}

export default CreateCropForm;
