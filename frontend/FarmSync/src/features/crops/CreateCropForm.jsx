import {useForm} from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCrop} from "../../services/cropsApi";
import toast from "react-hot-toast";

function CreateCropForm() {
  const {register, handleSubmit, reset, formState} = useForm();
  const {errors} = formState;
  console.log(errors);

  const queryClient = useQueryClient();

  const {mutate, isLoading: isCreating} = useMutation({
    mutationFn: createCrop,
    onSuccess: () => {
      toast.success("New crop successfully created");
      queryClient.invalidateQueries({queryKey: ["crops"]});
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
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
          className="border border-border p-2 cursor-pointer"
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
        />
      </FormRow>

      <FormRow label="Location">
        <select
          className="border border-border p-2 cursor-pointer"
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
        />
      </FormRow>

      <FormRow label="Crop description (optional)">
        <textarea
          className="px-3 py-4 border border-border rounded-sm shadow-sm w-full h-fit"
          type="text"
          id="description"
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating}>
          Add Crop
        </Button>
      </FormRow>
    </form>
  );
}

export default CreateCropForm;
