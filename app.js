const postGrid = document.querySelector("#postGrid");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const postTemplate = document.querySelector("#postTemplate");
const postDialog = document.querySelector("#postDialog");
const closeDialogButton = document.querySelector(".close-dialog");

const formatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

let posts = [];

document.querySelector("#year").textContent = new Date().getFullYear();

async function loadPosts() {
  try {
    const response = await fetch("./content/posts.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    posts = await response.json();
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    renderPosts(posts);
  } catch (error) {
    postGrid.innerHTML = "";
    emptyState.hidden = false;
    emptyState.textContent = "文章数据加载失败，请检查 content/posts.json。";
    console.error(error);
  }
}

function renderPosts(items) {
  postGrid.innerHTML = "";
  emptyState.hidden = items.length > 0;

  items.forEach((post) => {
    const node = postTemplate.content.cloneNode(true);
    const article = node.querySelector(".post-card");
    const mediaLink = node.querySelector(".media-link");
    const cover = node.querySelector(".cover");
    const titleLink = node.querySelector("h3 a");

    article.dataset.slug = post.slug;
    cover.src = post.cover || "./public/uploads/studio-cover.svg";
    cover.alt = post.coverAlt || post.title;
    node.querySelector("time").dateTime = post.date;
    node.querySelector("time").textContent = formatter.format(new Date(post.date));
    node.querySelector(".type").textContent = post.type || "文字";
    titleLink.textContent = post.title;
    titleLink.href = `#${post.slug}`;
    mediaLink.href = `#${post.slug}`;
    node.querySelector(".excerpt").textContent = post.excerpt;

    const tags = node.querySelector(".tags");
    (post.tags || []).forEach((tag) => {
      const pill = document.createElement("span");
      pill.textContent = tag;
      tags.appendChild(pill);
    });

    article.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement) {
        event.preventDefault();
      }
      openPost(post);
    });

    postGrid.appendChild(node);
  });
}

function openPost(post) {
  const media = postDialog.querySelector(".post-detail-media");
  const body = postDialog.querySelector(".post-detail-body");
  const tags = postDialog.querySelector(".post-detail-tags");

  media.innerHTML = "";
  body.innerHTML = "";
  tags.innerHTML = "";

  if (post.video) {
    media.appendChild(createVideo(post));
  } else {
    const image = document.createElement("img");
    image.src = post.cover || "./public/uploads/studio-cover.svg";
    image.alt = post.coverAlt || post.title;
    media.appendChild(image);
  }

  postDialog.querySelector(".post-detail-date").textContent = formatter.format(new Date(post.date));
  postDialog.querySelector(".post-detail h2").textContent = post.title;

  (post.tags || []).forEach((tag) => {
    const pill = document.createElement("span");
    pill.textContent = tag;
    tags.appendChild(pill);
  });

  post.body.split(/\n{2,}/).forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph.trim();
    body.appendChild(p);
  });

  postDialog.showModal();
}

function createVideo(post) {
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(post.video)) {
    const video = document.createElement("video");
    video.controls = true;
    video.poster = post.cover || "";
    video.src = post.video;
    return video;
  }

  const iframe = document.createElement("iframe");
  iframe.src = post.video;
  iframe.title = post.title;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  return iframe;
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = posts.filter((post) => {
    const haystack = [post.title, post.excerpt, post.body, ...(post.tags || [])].join(" ").toLowerCase();
    return haystack.includes(query);
  });
  renderPosts(filtered);
});

closeDialogButton.addEventListener("click", () => postDialog.close());
postDialog.addEventListener("click", (event) => {
  if (event.target === postDialog) {
    postDialog.close();
  }
});

loadPosts();
