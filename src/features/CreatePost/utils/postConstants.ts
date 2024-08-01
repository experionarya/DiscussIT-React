const titleWarning =
  "Title must be between 5 and 100 characters and should not  start with hashtag.";
const contentWarning = "Content must be between 20 and 10000 characters.";
const tagWarning =
  "Tags field should not be empty, each tag should not special characters or white spaces, and each tag length should be greater than 1.";

const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

export { titleWarning, contentWarning, tagWarning, format };
