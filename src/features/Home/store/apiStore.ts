import {
  externalLoginDetails,
  getTopUsers,
  getTrendingTags,
  getUserDetails,
  microsoftInfo,
  getBookMarks,
} from "src/utils/urls";

import { ExternalLoginType } from "../types/externalLoginType";
import { UserDetailsParamsType } from "src/types/userDetailsTypes";

export async function fetchMicrosoftInformation({
  token,
  tokenType,
}: Partial<{
  token: string;
  tokenType: string;
}>) {
  if (token) {
    const response = await fetch(microsoftInfo, {
      method: "GET",
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    });
    return response.json();
  }
}

export async function externalLogin(data: ExternalLoginType) {
  if (data?.Token) {
    const response = await fetch(externalLoginDetails, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export async function fetchUserDetails({
  token,
  tokenType,
  userId,
}: UserDetailsParamsType) {
  if (userId) {
    const response = await fetch(getUserDetails(userId), {
      method: "GET",
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    });
    return response.json();
  }
}

export async function fetchTrendingTags({
  token,
  tokenType,
}: Partial<{
  token: string | null;
  tokenType: string;
}>) {
  if (token) {
    const response = await fetch(getTrendingTags, {
      method: "GET",
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    });
    return response.json();
  }
}

export async function fetchTopUsers({
  token,
  tokenType,
}: Partial<{
  token: string | null;
  tokenType: string;
}>) {
  if (token) {
    const response = await fetch(getTopUsers, {
      method: "GET",
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    });
    return response.json();
  }
}

export async function fetchBookMarks({
  token,
  tokenType,
  threadId,
}: {
  token: string | undefined | null;
  tokenType: string | undefined;
  threadId: number | undefined;
}): Promise<any> {
  if (threadId && token) {
    const response = await fetch(getBookMarks(threadId), {
      method: "GET",
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    });
    const result=await response.json();
    console.log("hiiiiiiiii",result);
    return result;
    

  }
}
