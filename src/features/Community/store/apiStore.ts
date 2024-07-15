import { getCategoryByCommunity } from "src/utils/urls";

export async function fetchCategoryByCommunity({
  token,
  tokenType,
  communityId,
}: any) {
  const response = await fetch(getCategoryByCommunity(communityId), {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}
