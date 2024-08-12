import {
  getInnerReplies,
  getPostDetails,
  getPrimaryRepliesOfThread,
  getReplyDetails,
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

export async function fetchReplyDetails({ token, tokenType, replyId }: any) {
  console.log("token,", token, tokenType, replyId);
  const response = await fetch(getReplyDetails(replyId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}
