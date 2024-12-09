import { useCallback } from "react";
import { useQuery, UseQueryResult } from "react-query";

import { getPreferenceList } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { useHomeStore } from "../store/homeStore";
import { getUserIdFromToken} from "src/utils/authenticationHelper/tokenHandler";
 
const userID=getUserIdFromToken();

async function fetchPreferenceList({
  token,
  tokenType,
  userID,
}: TVariables): Promise<APIResult> {
  const response = await fetch(`${getPreferenceList}?userId=${userID}`, {
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
  userID: string
};

function useGetPreferenceList(): UseQueryResult<APIResult, TError> {
  const { tokenType } = useAuth();
  const setCheckedItemsFromApi = useHomeStore(
    useCallback((state) => state.setCheckedItemsFromApi, [])
  );
  const token = getParsedToken();
  return useQuery(
    "get_preference_list",
    async () => {
      if (token) {
        const result = await fetchPreferenceList({
          token,
          tokenType,
          userID,
        });
        const allCommunityIds = result?.map(
          (item) => item?.communityCategoryID
        );
        const communityPresence = allCommunityIds.reduce((acc, id) => {
          acc[id] = false;
          return acc;
        }, {});

        // Update the presence to true for IDs present in the original array
        result?.forEach((item) => {
          if (communityPresence.hasOwnProperty(item?.communityCategoryID)) {
            communityPresence[item?.communityCategoryID] = true;
          }
        });
        setCheckedItemsFromApi({ ...communityPresence });

        console.log("communityPresence", communityPresence);

        return result;
      }
    },
    {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );
}

export { useGetPreferenceList };
