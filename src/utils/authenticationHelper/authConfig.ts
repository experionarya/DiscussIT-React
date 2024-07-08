export const msalConfig = {
  auth: {
    clientId: "59d8e1a2-5afa-4b92-b374-04b9b332f92a",
    authority:
      "https://login.microsoftonline.com/13ec0e67-00c5-44c4-8bdb-52adb4a2feae/",
    redirectUri: "http://localhost:4200",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};
