import { useQuery, UseQueryResult } from "react-query";

import { getAllAnnouncements } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";

import { AnnouncementType } from "../types/announcementType";

async function fetchAllAnnouncements({
  token,
  tokenType,
}: TVariables): Promise<APIResult> {
  const response = await fetch(getAllAnnouncements, {
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
};

function useGetAllAnnouncements(): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  return useQuery(
    ["get_all_announcements"],
    async () => {
      const result = await fetchAllAnnouncements({
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

export { useGetAllAnnouncements };
