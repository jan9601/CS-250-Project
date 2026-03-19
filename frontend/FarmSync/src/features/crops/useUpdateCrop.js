import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateExistingCrop} from "../../services/cropsApi";
import toast from "react-hot-toast";

export function useUpdateCrop() {
  const queryClient = useQueryClient();

  const {mutate: updateCrop, isLoading: isUpdating} = useMutation({
    mutationFn: ({updatedCrop, id}) => updateExistingCrop(updatedCrop, id),
    onSuccess: () => {
      toast.success("Crop successfully updated");
      queryClient.invalidateQueries({queryKey: ["crops"]});
    },
    onError: (err) => toast.error(err.message),
  });

  return {isUpdating, updateCrop};
}
