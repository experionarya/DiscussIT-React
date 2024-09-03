const titleWarning =
  "Title must be between 5 and 100 characters and should not  start with hashtag.";
const contentWarning = "Content should be at least 20 characters long.";
const tagWarning =
  "Tags field should not be empty, each tag should not special characters or white spaces, and each tag length should be greater than 1.";

const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

export { titleWarning, contentWarning, tagWarning, format };
