import { defineConfig } from "vitepress";
import { createRewrites } from "vitepress-plugin-permalink";
import { teekConfig } from "./teek-config";

const siteName = "庄一帆";
const siteTitle = "庄一帆 | 前端 · 后端 · 影像 · AIGC";

const description = [
  `${siteName}的个人站，记录前端与后端开发实践，展示拍摄、剪辑与 AIGC 影像作品。`,
  "用代码构建界面，用镜头讲述故事，用 AI 扩展想象。",
].join(" ");

// TODO: 部署后把下面两处示例域名替换成你自己的域名
const siteUrl = "https://example.com";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: teekConfig,
  // 使用永久链接（permalink）作为真实访问路径，直接访问不会 404
  rewrites: createRewrites(),
  title: siteTitle,
  description,
  cleanUrls: true,
  lastUpdated: true,
  lang: "zh-CN",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: siteTitle }],
    ["meta", { property: "og:site_name", content: `${siteName}的个人站` }],
    ["meta", { property: "og:image", content: `${siteUrl}/logo.svg` }],
    ["meta", { property: "og:url", content: siteUrl }],
    ["meta", { property: "og:description", content: description }],
    ["meta", { name: "description", content: description }],
    ["meta", { name: "author", content: siteName }],
  ],
  markdown: {
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  sitemap: {
    hostname: siteUrl,
    transformItems: items => {
      const permalinkItemBak: typeof items = [];
      // 使用永久链接生成 sitemap
      const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig.permalinks;
      items.forEach(item => {
        const permalink = permalinks?.map[item.url.replace(".html", "")];
        if (permalink) permalinkItemBak.push({ url: permalink, lastmod: item.lastmod });
      });
      return [...items, ...permalinkItemBak];
    },
  },
  themeConfig: {
    logo: "/logo.svg",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "技术文章", link: "/tech", activeMatch: "/tech" },
      { text: "视频作品", link: "/videos", activeMatch: "/videos" },
      { text: "AIGC 作品", link: "/aigc", activeMatch: "/aigc" },
      { text: "关于我", link: "/about", activeMatch: "/about" },
    ],
    // TODO: 替换成你自己的 GitHub 主页
    socialLinks: [{ icon: "github", link: "https://github.com/your-github" }],
    search: {
      provider: "local",
    },
  },
});
