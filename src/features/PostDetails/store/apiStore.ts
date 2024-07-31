import { getPostDetails, getPrimaryRepliesOfThread } from "src/utils/urls";

export async function fetchPostDetails({ token, tokenType, threadId }: any) {
  const response = await fetch(getPostDetails(threadId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}

export async function fetchPrimaryReplies({ token, tokenType, threadId }: any) {
  const response = await fetch(getPrimaryRepliesOfThread(threadId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}
