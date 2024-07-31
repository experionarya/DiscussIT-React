import { getPostDetails } from "src/utils/urls";

export async function fetchPostDetails({ token, tokenType, threadId }: any) {
  const response = await fetch(getPostDetails(threadId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}
