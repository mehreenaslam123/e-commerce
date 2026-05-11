import { QueryKey, useQueryClient } from "react-query";

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  const invalidateQueries = async (queryKey: QueryKey) => {
    await queryClient.invalidateQueries(queryKey);
  };

  return { invalidateQueries };
};
