import { unSaveBookmark as unSaveBookmarkUrl } from "src/utils/urls";
import { UseMutationResult ,useMutation,useQueryClient} from 'react-query';
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
type APIResult = {
  success: boolean;
  message: string;
}

export async function unSaveBookmark({
  token,
  tokenType,
  threadID,
  userID,
}: {
  token: string|null;
  tokenType: string;
  threadID: number|undefined;
  userID: string|undefined;
}): Promise<APIResult> {
  
    const url = unSaveBookmarkUrl(threadID, userID);
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `${tokenType} ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // const result = await response.json();
    // return result;
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

//return a default APIResult
  return { success: true, message: 'Bookmark unsaved successfully' };
}

type TError = { message: string };

  function useUnSaveBookmark(): UseMutationResult<any, TError, any, unknown> {
    const { tokenType } = useAuth();
    const queryClient = useQueryClient();
    return useMutation(
      async ({ threadID, userID }:{threadID:number,userID:string}) => {
        const result = await unSaveBookmark({
          token: getParsedToken(),
          tokenType: tokenType,
          threadID,
          userID,
        });
        queryClient.invalidateQueries(["get_saved_post_list"], {
          refetchInactive: true,
       });
       queryClient.refetchQueries(["get_saved_post_list"]);
       queryClient.invalidateQueries(["get_all_post"]);
       queryClient.invalidateQueries(["get_post_details"]);
        return result;
      }
    );
  }
  export { useUnSaveBookmark };


