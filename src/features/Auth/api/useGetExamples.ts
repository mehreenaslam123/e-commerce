import { useInvalidateQueries, useQuery } from "@libs/query-client";

import { Example } from "./types";

type UseGetExamplesOptions = {
  id: string;
};

export const useGetExamples = (options: UseGetExamplesOptions) => {
  const { id } = options;

  const { invalidateQueries } = useInvalidateQueries();

  const queryKey = ["getExamples", { id }];

  const queryFn = async () => {
    const response = await new Promise<Example[]>((resolve) =>
      setTimeout(() => {
        resolve([{ id: "e1" }, { id: "e2" }, { id: "e3" }]);
      }, 3000)
    );
    return response;
  };

  const invalidateExampleQueries = () => {
    invalidateQueries(queryKey);
  };

  const featuresQuery = useQuery({
    queryKey,
    queryFn,
  });

  const examples = featuresQuery.data;
  const isLoading = featuresQuery.isFetching || featuresQuery.isLoading;

  return {
    examples,
    isLoading,
    invalidateExampleQueries,
  };
};
