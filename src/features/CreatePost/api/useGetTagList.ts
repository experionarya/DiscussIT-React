import { useQuery, UseQueryResult } from "react-query";

import { getTrendingTags } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

async function fetchTagList({
  token,
  tokenType,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getTrendingTags, {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type TagType = any;
type APIResult = Array<TagType>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
};

function useGetTagList(): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  return useQuery(
    ["get_tag_list"],
    async () => {
      const result = await fetchTagList({
        token: getParsedToken(),
        tokenType,
      });
      return result;
    },
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetTagList };
