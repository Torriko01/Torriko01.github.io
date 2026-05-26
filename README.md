# 我的个人博客

一个低成本、易维护、易部署的纯静态个人博客，支持文字、图片和视频内容。

## 本地预览

由于首页会读取 `content/posts.json`，建议用本地静态服务器打开，而不是直接双击 `index.html`。

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

然后访问：

```text
http://127.0.0.1:4173
```

如果你使用 VS Code，也可以用 Live Server 插件打开项目目录。

项目也附带了一个无需安装依赖的 Node 静态服务器：

```powershell
node tools/static-server.mjs
```

## 发布内容

打开 `admin.html` 填写内容，生成文章 JSON，然后把结果放到 `content/posts.json` 数组最前面。图片和视频文件放到 `public/uploads/`。

更多部署说明见 `DEPLOY.md`。
