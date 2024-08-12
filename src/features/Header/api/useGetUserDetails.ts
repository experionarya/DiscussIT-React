import { useQuery, UseQueryResult } from "react-query";

import { getUserDetails } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import {
  getParsedToken,
  getUserIdFromToken,
} from "src/utils/authenticationHelper/tokenHandler";

import { UserDetailsType } from "./../types/userDetailsType";

async function fetchUserDetails({
  token,
  tokenType,
  userId,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getUserDetails(userId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

type APIResult = UserDetailsType;

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  userId: string;
};

function useGetUserDetails(): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  const userId = getUserIdFromToken();
  return useQuery(
    ["get_user_details"],
    async () => {
      const result = await fetchUserDetails({
        token: getParsedToken(),
        tokenType,
        userId,
      });
      return result;
    },
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetUserDetails };
