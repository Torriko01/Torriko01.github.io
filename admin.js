const form = document.querySelector("#postForm");
const output = document.querySelector("#jsonOutput");
const copyButton = document.querySelector("#copyButton");

form.elements.date.valueAsDate = new Date();

function slugify(input) {
  const slug = input
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `post-${Date.now()}`;
}

function collectPost() {
  const data = new FormData(form);
  const title = data.get("title").trim();
  const tags = data
    .get("tags")
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);

  const post = {
    slug: slugify(title),
    title,
    date: data.get("date"),
    type: data.get("type"),
    excerpt: data.get("excerpt").trim(),
    body: data.get("body").trim(),
    cover: data.get("cover").trim() || "./public/uploads/studio-cover.svg",
    coverAlt: title,
    tags,
  };

  const video = data.get("video").trim();
  if (video) {
    post.video = video;
  }

  return post;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  output.textContent = JSON.stringify(collectPost(), null, 2);
});

copyButton.addEventListener("click", async () => {
  if (!output.textContent.trim()) {
    output.textContent = JSON.stringify(collectPost(), null, 2);
  }

  await navigator.clipboard.writeText(output.textContent);
  copyButton.textContent = "已复制";
  setTimeout(() => {
    copyButton.textContent = "复制结果";
  }, 1200);
});
