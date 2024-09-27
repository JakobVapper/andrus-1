console.log("Content script loaded on riigikaitseareng.ee");

const article = document.querySelector(".c-body-text.c-main-content");

if (article) {
  console.log("Article element found");
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression 
  const words = text.matchAll(wordMatchRegExp);
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  const heading = article.querySelector("h2");
  const date = article.querySelector("time")?.parentNode;

  if (date || heading) {
    (date ?? heading).insertAdjacentElement("afterend", badge);
    console.log("Badge inserted");
  } else {
    article.insertAdjacentElement("afterbegin", badge);
    console.log("Neither date nor heading element found. Badge inserted at the beginning of the article.");
  }
} else {
  console.log("Article element not found");
}