import {useQuery} from "@tanstack/react-query";
import {getCrops} from "../../services/cropsApi";

export function useCrops() {
  const {
    isLoading,
    data: crops,
    error,
  } = useQuery({
    queryKey: ["crops"],
    queryFn: getCrops,
  });

  return {isLoading, crops, error};
}
