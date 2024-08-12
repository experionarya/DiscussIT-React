function stripHTML(node: any, maxLength: number, currentLength = 0) {
  if (currentLength >= maxLength)
    return { trimmedNode: null, length: currentLength };

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.nodeValue;
    const remainingLength = maxLength - currentLength;
    if (text.length > remainingLength) {
      return {
        trimmedNode: document.createTextNode(
          text.substring(0, remainingLength) + "..."
        ),
        length: maxLength,
      };
    } else {
      return {
        trimmedNode: document.createTextNode(text),
        length: currentLength + text.length,
      };
    }
  }

  const newNode = node.cloneNode(false);
  for (let child of node.childNodes) {
    const { trimmedNode, length } = stripHTML(child, maxLength, currentLength);
    if (trimmedNode) newNode.appendChild(trimmedNode);
    currentLength = length;
    if (currentLength >= maxLength) break;
  }

  return { trimmedNode: newNode, length: currentLength };
}

// Function to trim HTML content
export function trimHTMLContent(html: string) {
  const maxLength = 100;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const body = doc.body;

  const { trimmedNode } = stripHTML(body, maxLength);
  const wrapper = document.createElement("div");
  if (trimmedNode) wrapper.appendChild(trimmedNode);

  return wrapper.innerHTML;
}

export const createMarkup = (data?: string) => {
  return { __html: data || "" };
};

export function getHtmlTextLength(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const textContent = doc.body.textContent || "";
  return textContent.length;
}

export function getInitials(userName: any): string {
  if (userName) {
    const nameParts = userName.split(" ");
    const firstInitial = nameParts[0].charAt(0).toUpperCase();
    const lastInitial =
      nameParts.length > 1 ? nameParts[1].charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  } else return "";
}
