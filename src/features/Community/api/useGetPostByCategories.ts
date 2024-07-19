import { useQuery, UseQueryResult } from "react-query";

import { getPostByCategory } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { PostType } from "../types/postType";

async function fetchPostsByCategory({
  token,
  tokenType,
  communityId,
  communityCategoryMappingId,
}: TVariables): Promise<APIResult> {
  const response = await fetch(
    getPostByCategory(communityId, communityCategoryMappingId),
    {
      method: "GET",
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    }
  );
  return response.json();
}

type APIResult = Array<PostType>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  communityId: number;
  communityCategoryMappingId: number;
};

function useGetPostByCategories(
  communityId: number | undefined,
  communityCategoryMappingId: number | undefined
): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  return useQuery(
    ["get_posts_by_category", communityCategoryMappingId],
    async () => {
      if (communityId && communityCategoryMappingId) {
        const result = await fetchPostsByCategory({
          token: getParsedToken(),
          tokenType,
          communityId,
          communityCategoryMappingId,
        });
        return result;
      }
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetPostByCategories };
