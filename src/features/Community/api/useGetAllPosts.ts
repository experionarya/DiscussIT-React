import { useQuery, UseQueryResult } from "react-query";

import { getAllPostsByCategory } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { AllPostsType } from "../types/postType";

async function fetchPostsByCategory({
  token,
  tokenType,
  communityCategoryMappingId,
}: TVariables): Promise<APIResult> {
  const response = await fetch(
    getAllPostsByCategory(communityCategoryMappingId),
    {
      method: "GET",
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    }
  );
  return response.json();
}

type APIResult = AllPostsType;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  communityCategoryMappingId: number;
};

function useGetAllPosts(
  communityCategoryMappingId: number | undefined
): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  return useQuery(
    ["get_all_posts_by_category", communityCategoryMappingId],
    async () => {
      if (communityCategoryMappingId) {
        const result = await fetchPostsByCategory({
          token: getParsedToken(),
          tokenType,
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

export { useGetAllPosts };
