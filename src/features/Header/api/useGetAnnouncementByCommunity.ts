import { useQuery, UseQueryResult } from "react-query";

import { getNotificationByCommunity } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { AnnouncementType } from "../types/announcementType";

async function fetchNotificationsByCommunity({
  token,
  tokenType,
  communityId,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getNotificationByCommunity(communityId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = Array<AnnouncementType>;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  communityId: number | undefined;
};

function useGetAnnouncementByCommunity(
  communityId: number | undefined
): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  return useQuery(
    ["get_category_by_community", communityId],
    async () => {
      const result = await fetchNotificationsByCommunity({
        token: getParsedToken(),
        tokenType,
        communityId,
      });
      return result;
    },
    {
      enabled: communityId !== undefined,
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetAnnouncementByCommunity };
