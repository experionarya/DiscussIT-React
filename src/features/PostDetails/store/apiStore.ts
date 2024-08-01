import {
  getInnerReplies,
  getPostDetails,
  getPrimaryRepliesOfThread,
} from "src/utils/urls";

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

export async function fetchInnerReplies({
  token,
  tokenType,
  threadId,
  replyId,
}: any) {
  const response = await fetch(getInnerReplies(threadId, replyId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}
