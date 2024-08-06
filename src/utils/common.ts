function stripHTML(html: string) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export function trimHTMLContent(html: string) {
  const maxLength = 100;
  const strippedContent = stripHTML(html);
  const trimmedContent =
    strippedContent.length > maxLength
      ? strippedContent.substring(0, maxLength) + "..."
      : strippedContent;
  return trimmedContent;
}
