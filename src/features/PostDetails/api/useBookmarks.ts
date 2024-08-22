import {
    useMutation,
    UseMutationResult,
    useQueryClient,
  } from "react-query";
  
  import { Bookmarks } from "../../../utils/urls";
  import { useAuth } from "src/utils/authenticationHelper/authProvider";
  import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { SaveBookmark } from "../types/bookmarks";
    
  async function saveBookmarks({
    token,
    tokenType,
    params,
  }: TVariables): Promise<APIResult> {
    const response = await fetch(Bookmarks, {
      method: "POST",
      headers: {
        Authorization: `${tokenType} ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    return response.json();
  }
  
  type APIResult = SaveBookmark;
  
  type TError = { message: string };
  type TVariables = {
    token: string | null;
    tokenType: string;
    params: any;
  };
  
  function useBookmarks(): UseMutationResult<any, TError, any, unknown> {
    const { tokenType } = useAuth();
    const queryClient = useQueryClient();
    return useMutation(
      async (params: any) => {
        const result = await saveBookmarks({
          token: getParsedToken(),
          tokenType: tokenType,
          params: params,
        });
        return result;
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries("get_saved_post_list", {
            refetchInactive: true,
          });
        },
      }
    );
  }
  
  export { useBookmarks };
  