// 部署路径与站点地址：CI 部署 GitHub Pages 时通过环境变量注入，本地开发用默认值
// 项目站点形如 https://用户名.github.io/仓库名/，此时 base 为 /仓库名/
export const base = process.env.DOCS_BASE || "/";
export const siteUrl = process.env.DOCS_SITE_URL || "https://example.com";

/** 给站内绝对路径补上 base，用于 VitePress 不会自动处理的配置项（如 head、页脚链接） */
export const sitePath = (path: string) => {
  if (!path.startsWith("/")) return path;
  return `${base.replace(/\/$/, "")}${path}`;
};
