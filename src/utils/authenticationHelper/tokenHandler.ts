export function setParsedToken(token: string) {
  localStorage.setItem("AUTH_TOKEN", token);
}

export function getParsedToken(): string | null {
  return localStorage.getItem("AUTH_TOKEN");
}

export function removeToken() {
  localStorage.removeItem("AUTH_TOKEN");
}

export function getDecodedToken(token: string): any {
  if (!token) {
    return null;
  }

  try {
    const payload = window.atob(token.split(".")[1]);
    const parsedToken = JSON.parse(payload);
    return parsedToken;
  } catch (error) {
    console.error("Error decoding token:", error); // Error decoding token
    return null;
  }
}

export function getNameFromToken(): any {
  const token = getParsedToken();
  const parsedToken = getDecodedToken(token || "");
  return parsedToken.Name;
}

export function getEmailFromToken(): any {
  const token = getParsedToken();
  const parsedToken = getDecodedToken(token || "");
  return parsedToken.Email;
}

export function getRoleFromToken(): any {
  const token = getParsedToken();
  const parsedToken = getDecodedToken(token || "");
  return parsedToken.role;
}

export function getUserIdFromToken(): any {
  const token = getParsedToken();
  const parsedToken = getDecodedToken(token || "");

  return parsedToken?.UserId;
}
