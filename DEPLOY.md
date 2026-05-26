# 个人博客部署与维护

这是一个纯静态个人博客，支持文字、图片和视频文章。它不需要后端、数据库或服务器，适合部署到 GitHub Pages、Cloudflare Pages、Vercel、Netlify 或任何静态文件空间。

## 文件结构

```text
.
├─ index.html              # 博客首页
├─ admin.html              # 本地发布工具
├─ styles.css              # 样式
├─ app.js                  # 首页渲染逻辑
├─ admin.js                # 发布工具逻辑
├─ content/posts.json      # 文章数据
└─ public/uploads/         # 图片、视频、封面等资源
```

## 发布文章

1. 打开 `admin.html`。
2. 填写标题、摘要、正文、封面图片路径、视频地址和标签。
3. 点击“生成文章 JSON”。
4. 把生成的对象复制到 `content/posts.json` 数组最前面。
5. 把图片或视频文件放到 `public/uploads/`，并在 JSON 里使用相对路径，例如 `./public/uploads/trip.jpg`。
6. 重新上传或重新部署站点。

## 视频写法

本地视频：

```json
"video": "./public/uploads/demo.mp4"
```

外部嵌入视频：

```json
"video": "https://www.youtube.com/embed/example"
```

## 部署建议

低成本优先级：

1. GitHub Pages：免费，适合公开博客。
2. Cloudflare Pages：免费额度高，国内外访问表现通常不错。
3. Vercel 或 Netlify：配置简单，适合以后扩展前端功能。

如果使用 GitHub Pages，把整个目录推到仓库后，在仓库设置里开启 Pages，选择根目录部署即可。

## 维护建议

- 定期备份 `content/posts.json` 和 `public/uploads/`。
- 图片建议压缩到 300 KB 到 1 MB 之间。
- 视频文件较大时，优先放到视频平台或对象存储，再使用嵌入链接。
- 文章字段保持 JSON 格式合法，逗号和引号最容易出错。
