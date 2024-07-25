import { useQuery, UseQueryResult } from "react-query";

import { getNotifications } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import {
  getParsedToken,
  getUserIdFromToken,
} from "src/utils/authenticationHelper/tokenHandler";

import { NotificationType } from "../types/notificationType";

async function fetchNotifications({
  token,
  tokenType,
  userId,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getNotifications(userId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = NotificationType;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  userId: string;
};

function useGetNotifications(): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  const userId = getUserIdFromToken();
  return useQuery(
    ["get_notifications"],
    async () => {
      const result = await fetchNotifications({
        token: getParsedToken(),
        tokenType,
        userId,
      });
      return result;
    },
    {
      enabled: userId !== undefined,
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetNotifications };
