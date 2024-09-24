import { useMutation, UseMutationResult } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/utils/authenticationHelper/authProvider";
import { getParsedToken } from "src/utils/authenticationHelper/tokenHandler";
import { logoutAccount } from "src/utils/urls";

async function logoutUserAccount({
  token,
  tokenType,
  userId,
}: {
  userId: string;
  tokenType: string;
  token: string | null;
}): Promise<TResult> {
  const response = await fetch(logoutAccount(userId), {
    method: "POST",
    headers: {
      Authorization: `${tokenType} ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.Message || "Failed");
  }

  return response.json();
}

type TVariables = {
  userId: string;
};

type TError = string;
type TContext = unknown;
type TResult = ValidationError;
type ValidationError = { Message?: string };

function useLogoutUserAccount(): UseMutationResult<
  TResult,
  TError,
  TVariables,
  TContext
> {
  const navigate = useNavigate();

  const { tokenType } = useAuth();

  return useMutation(
    async (params: TVariables) => {
      const { userId } = params;
      const response = await logoutUserAccount({
        token: getParsedToken(),
        tokenType,
        userId,
      });

      return response;
    },
    {
      onSuccess: () => {
        navigate("/");
      },
    }
  );
}

export { useLogoutUserAccount };
