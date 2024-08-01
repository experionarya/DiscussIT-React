import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";

import { getBookMarks } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { threadType } from "../types/globalSeacrhType";

async function fetchSearchedItemDetails({
  token,
  tokenType,
  params,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getBookMarks(params), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = threadType;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  params: number;
};

function useGetSearchedItemDetails(): UseMutationResult<
  APIResult,
  TError,
  number,
  unknown
> {
  const { tokenType } = useAuth();

  return useMutation(async (params: any) => {
    const result = await fetchSearchedItemDetails({
      token: getParsedToken(),
      tokenType: tokenType,
      params: params,
    });
    return result;
  });
}

export { useGetSearchedItemDetails };
