export function setParsedToken(parsedToken: string) {
  console.log("setToken", parsedToken);
  localStorage.setItem("AUTH_TOKEN", JSON.stringify(parsedToken));
}

// export function getParsedToken(): string | null {
//   return localStorage.getItem("token");
// }

// export function removeToken() {
//   localStorage.removeItem("token");
// }

export function getDecodedToken(token: string): any {
  if (!token) {
    return null;
  }
  console.log("");
  try {
    const payload = window.atob(token.split(".")[1]);
    const parsedToken = JSON.parse(payload);
    console.log("parsedToken", parsedToken);
    setParsedToken(parsedToken);
    return parsedToken;
  } catch (error) {
    console.error("Error decoding token:", error); // Error decoding token
    return null;
  }
}

// export function getNameFromToken(token: string): any {
//   const parsedToken = getDecodedToken(token);
//   return parsedToken.Name;
// }

// export function getEmailFromToken(token: string): any {
//   const parsedToken = getDecodedToken(token);
//   return parsedToken.Email;
// }

// export function getRoleFromToken(token: string): any {
//   const parsedToken = getDecodedToken(token);
//   return parsedToken.role;
// }

// export function getUserIdFromToken(token: string): any {
//   const parsedToken = getDecodedToken(token);
//   return parsedToken.UserId;
// }
