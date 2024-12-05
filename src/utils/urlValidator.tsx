export const validateUrlsInContent = (
  htmlContent: string
): { isInvalid: boolean; invalidUrl: string | null } => {
  const isValidURL = (url: string) => {
    try {
      new URL(url); // Checks if the URL is valid
      return true;
    } catch {
      return false;
    }
  };
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const links = doc.querySelectorAll("a"); // Select all <a> tags

  let invalidUrl: string | null = null;

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && !isValidURL(href)) {
      invalidUrl = `Invalid URL found`;
    }
  });

  return {
    isInvalid: invalidUrl !== null, // flag true if invalid.
    invalidUrl, // Return the invalid URL message (or null)
  };
};
