import { defineConfig } from "vitepress";
import { createRewrites } from "vitepress-plugin-permalink";
import { base, sitePath, siteUrl } from "./base";
import { teekConfig } from "./teek-config";

const siteName = "金凯";
const siteTitle = "金凯";

const description = [
  `${siteName}的个人站，记录前端与后端开发实践，展示拍摄、剪辑与 AIGC 影像作品。`,
  "用代码构建界面，用镜头讲述故事，用 AI 扩展想象。",
].join(" ");

// 站点地址与 base 见 ./base.ts，GitHub Pages 部署时由 CI 注入

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: teekConfig,
  // 使用永久链接（permalink）作为真实访问路径，直接访问不会 404
  rewrites: createRewrites(),
  base,
  title: siteTitle,
  description,
  cleanUrls: true,
  lastUpdated: true,
  lang: "zh-CN",
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: sitePath("/logo.svg") }],
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
    // 项目站点的页面路径不含 base，hostname 需要带上才能生成完整地址
    hostname: `${siteUrl}${base.replace(/\/$/, "")}`,
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
      {
        text: "技术文章",
        activeMatch: "/tech",
        items: [
          {
            text: "HTML5",
            items: [
              { text: "文档结构与语义化标签", link: "/tech/html5/semantic-structure" },
              { text: "表单增强与新 input 类型", link: "/tech/html5/forms-and-validation" },
              { text: "audio 与 video 媒体元素", link: "/tech/html5/audio-video" },
              { text: "Canvas 绘图基础", link: "/tech/html5/canvas-basics" },
              { text: "本地存储 localStorage 与 IndexedDB", link: "/tech/html5/web-storage" },
              { text: "拖放与文件上传", link: "/tech/html5/drag-drop-file-api" },
              { text: "WebSocket 与 SSE 实时通信", link: "/tech/html5/websocket-sse" },
            ],
          },
          {
            text: "CSS",
            items: [
              { text: "盒模型与 BFC", link: "/tech/css/box-model-bfc" },
              { text: "Flex 布局", link: "/tech/css/flexbox" },
              { text: "Grid 布局", link: "/tech/css/grid" },
              { text: "选择器、优先级与层叠", link: "/tech/css/selectors-specificity" },
              { text: "响应式与容器查询", link: "/tech/css/responsive" },
              { text: "过渡、动画与变换", link: "/tech/css/transitions-animations" },
              { text: "CSS 变量与现代技巧", link: "/tech/css/custom-properties" },
            ],
          },
          {
            text: "JavaScript",
            items: [
              { text: "变量、作用域与暂时性死区", link: "/tech/javascript/scope-hoisting-tdz" },
              { text: "数据类型与类型转换", link: "/tech/javascript/types-coercion" },
              { text: "闭包与 this", link: "/tech/javascript/closures-this" },
              { text: "原型链与 class", link: "/tech/javascript/prototype-class" },
              { text: "Promise 与 async/await", link: "/tech/javascript/promise-async-await" },
              { text: "事件循环：宏任务与微任务", link: "/tech/javascript/event-loop" },
              { text: "数组与对象常用方法", link: "/tech/javascript/array-object-methods" },
            ],
          },
        ],
      },
      { text: "视频作品", link: "/videos", activeMatch: "/videos" },
      { text: "AIGC 作品", link: "/aigc", activeMatch: "/aigc" },
      { text: "关于我", link: "/about", activeMatch: "/about" },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/reyKai-Jin" }],
    search: {
      provider: "local",
    },
  },
});
