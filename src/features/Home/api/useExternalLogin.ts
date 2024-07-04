import { useMutation, UseMutationResult } from "react-query";

import {
  getDecodedToken,
  setParsedToken,
} from "src/utils/authenticationHelper/tokenHandler";

import { externalLoginDetails } from "src/utils/urls";

export async function externalLogin({ data }: TVariables): Promise<TResult> {
  console.log("data", data);
  const response = await fetch(externalLoginDetails, {
    method: "POST",
    headers: {
      //   Authorization: `${tokenType} ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export type ValidationError = { Message?: string };
export type TResult = { token: string };
type ExternalLoginType = {
  Provider: string;
  expiration: number;
  Token: string;
  userDetails: any;
  username: string;
};
export type TVariables = {
  data: ExternalLoginType;
};
export type TError = {
  message: string;
};
export type TSnapshot = unknown;

function useExternalLogin(): UseMutationResult<
  TResult,
  TError,
  ExternalLoginType,
  TSnapshot
> {
  return useMutation(async (data: ExternalLoginType) => {
    const result = await externalLogin({
      data,
    });

    setParsedToken(result?.token);

    getDecodedToken(result?.token);
    return result;
  });
}

export { useExternalLogin };
