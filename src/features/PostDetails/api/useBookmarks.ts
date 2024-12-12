import { useMutation, UseMutationResult, useQueryClient } from "react-query";

import { Bookmarks } from "../../../utils/urls";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { SaveBookmark } from "../types/bookmarks";

async function saveBookmarks({
  token,
  tokenType,
  threadID,
  userID,
}: TVariables): Promise<APIResult> {
  const formData=new FormData();
  formData.append("threadID", threadID.toString());
  formData.append("userID", userID);
  const response = await fetch(Bookmarks, {
    method: "POST",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
    body: formData
  });
  // return response.json();
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  
  // return { success: true, message: "Bookmark saved successfully" }; // Default response
  return { success: true, message: "Bookmark saved successfully", threadID, userID };
}


type APIResult = SaveBookmark  & { success: boolean; message: string; };

type TError = { message: string };
type TVariables = {
  token: string | null;
  tokenType: string;
  threadID:number
  userID: string;
};

function useBookmarks(): UseMutationResult<any, TError, any, unknown> {
  const { tokenType } = useAuth();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ threadID, userID }:{threadID:number,userID:string}) => {
      const result = await saveBookmarks({
        token: getParsedToken(),
        tokenType: tokenType,
        threadID,
        userID,
      });
      return result;
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["get_saved_post_list"], {
          refetchInactive: true,
        });
        queryClient.refetchQueries(["get_saved_post_list"]);
      },
    }
  );
}

export { useBookmarks };
