import { useQuery, UseQueryResult } from "react-query";

import { getBookMarks } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

async function fetchBookMarks({
  token,
  tokenType,
  threadId
}: TVariables): Promise<APIResult> {
  const response = await fetch(getBookMarks(threadId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = Array<any>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  threadId: number;
};

function useGetBookMark(threadId:number): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  console.log("threadId",threadId)
  return useQuery(
    ["get_bookmark_list",threadId],
    async () => {
      const result = await fetchBookMarks({
        token: getParsedToken(),
        tokenType,
        threadId
      });
      return result;
    },
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      enabled:threadId !== undefined
    }
  );
}

export { useGetBookMark };
