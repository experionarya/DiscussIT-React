import { useQuery, UseQueryResult } from "react-query";

import { getUserDetails } from "../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { UserDetailsType } from "src/types/userDetailsTypes";

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

function useGetUserDetails(userId: any): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
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
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetUserDetails };
