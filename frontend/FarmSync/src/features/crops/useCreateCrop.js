import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCrop} from "../../services/cropsApi";
import toast from "react-hot-toast";

export function useCreateCrop() {
  const queryClient = useQueryClient();

  const {mutate: createNewCrop, isLoading: isCreating} = useMutation({
    mutationFn: createCrop,
    onSuccess: () => {
      toast.success("New crop successfully created");
      queryClient.invalidateQueries({queryKey: ["crops"]});
    },
    onError: (err) => toast.error(err.message),
  });

  return {isCreating, createNewCrop};
}
