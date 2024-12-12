import { fetchPostDetails } from "../store/apiStore";
import { useQuery, UseQueryResult, useQueryClient } from "react-query";

type TError = { message: string };

function useFetchPostDetails(
  threadId: number,
  token: string,
  tokenType: string
): UseQueryResult<any, TError> {
  const queryClient = useQueryClient();

  return useQuery(
    ["get_post_details", threadId],
    async () => {
      const result = await fetchPostDetails({
        threadId,
        token,
        tokenType,
      });
      return result;
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["get_post_details", threadId], {
          refetchInactive: true,
        });
        
      },
    }
  );
}

export { useFetchPostDetails };
