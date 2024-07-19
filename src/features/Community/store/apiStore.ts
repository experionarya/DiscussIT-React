import { getCategoryByCommunity, getCommunityList } from "src/utils/urls";

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

export async function fetchCommunityList({ token, tokenType }: any) {
  const response = await fetch(getCommunityList, {
    method: "GET",
    headers: {
      Authorization: `${tokenType} ${token}`,
    },
  });
  return response.json();
}
