import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCrop as deleteCropApi} from "../../services/cropsApi";
import toast from "react-hot-toast";

export function useDeleteCrop() {
  const queryClient = useQueryClient();

  const {isLoading: isDeleting, mutate: deleteCrop} = useMutation({
    mutationFn: deleteCropApi,
    onSuccess: () => {
      toast.success("Crop successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["crops"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {isDeleting, deleteCrop};
}
