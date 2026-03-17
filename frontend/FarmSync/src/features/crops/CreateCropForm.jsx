import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import {createCrop, updateExistingCrop} from "../../services/cropsApi";

function CreateCropForm({cropToEdit = {}}) {
  const {id: editId, ...editValues} = cropToEdit;
  const isEditSession = Boolean(editId);

  const {register, handleSubmit, reset, formState} = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const {errors} = formState;

  const queryClient = useQueryClient();

  const {mutate: createNewCrop, isLoading: isCreating} = useMutation({
    mutationFn: createCrop,
    onSuccess: () => {
      toast.success("New crop successfully created");
      queryClient.invalidateQueries({queryKey: ["crops"]});
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const {mutate: updateCrop, isLoading: isUpdating} = useMutation({
    mutationFn: ({newCabinData, id}) => updateExistingCrop(newCabinData, id),
    onSuccess: () => {
      toast.success("Crop successfully updated");
      queryClient.invalidateQueries({queryKey: ["crops"]});
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    if (isEditSession) updateCrop({newCabinData: data, id: editId});
    else createNewCrop(data);
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
