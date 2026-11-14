// 本地 Teek 主题包引用（与 Teek 在线主题包引用 二选一）
import { defineTeekConfig } from "../../packages/config";
import { version } from "../../packages/teek/version";

// Teek 在线主题包引用（需安装 Teek 在线版本）
// import { defineTeekConfig } from "vitepress-theme-teek/config";
// import { version } from "vitepress-theme-teek/es/version";

export const teekConfig = defineTeekConfig({
  // 使用 Teek 博客风格首页（Banner + 文章列表 + 个人信息卡片）
  teekHome: true,
  vpHome: false,
  loading: false,
  sidebarTrigger: true,
  homeCardListPosition: "right",

  // 文章默认作者
  author: { name: "金凯", link: "/about" },

  // 首页左侧个人信息卡片
  blogger: {
    name: "金凯",
    slogan: "写代码，也拍故事。前端 / 后端 / 影像 / AIGC",
    avatar: "/avatar.svg",
    shape: "circle-rotate",
    circleBgImg: "/blog/bg4.webp",
    color: "#ffffff",
    circleSize: 120,
    status: {
      icon: "🎬",
      size: 28,
      title: "随时准备开机",
    },
  },

  // 首页 Banner
  banner: {
    name: "金凯的个人站",
    bgStyle: "fullImg",
    imgSrc: ["/blog/bg1.webp", "/blog/bg2.webp", "/blog/bg3.webp"],
    imgWaves: true,
    mask: true,
    description: [
      "用代码构建界面，用镜头讲述故事",
      "前端 · 后端 · 拍摄 · 剪辑 · AIGC",
      "把想法做成产品，把画面剪成作品",
    ],
    descStyle: "types",
  },

  // 浏览器区域全屏壁纸模式
  wallpaper: {
    enabled: true,
    hideBanner: true,
  },

  // 站点信息卡片
  docAnalysis: {
    createTime: "2026-11-14",
    statistics: {
      provider: "busuanzi",
    },
    appendInfo: [{ key: "author", label: "站主", value: "金凯" }],
  },

  // 文章配置
  post: {
    postStyle: "list",
    coverImgMode: "full",
    showCapture: true,
    defaultCoverImg: ["/blog/bg1.webp", "/blog/bg2.webp", "/blog/bg3.webp"],
  },

  // 文章页 Banner
  articleBanner: {
    enabled: true,
    defaultCoverImg: "/blog/bg2.webp",
  },

  // 文章分享
  articleShare: { enabled: true },

  // 文章页底部版权信息
  articleBottomTip: frontmatter => {
    if (typeof window === "undefined") return;

    const { origin, pathname } = window.location;
    const url = `${origin}${(frontmatter as any).permalink ?? pathname}`;

    return {
      type: "tip",
      text: `<p>作者：金凯</p>
             <p>链接：<a href="${decodeURIComponent(url)}" target="_blank">${decodeURIComponent(url)}</a></p>
             <p style="margin-bottom: 0">版权：本文版权归金凯所有，转载请注明出处。</p>`,
    };
  },

  // 代码块复制提示
  codeBlock: {
    copiedDone: TkMessage => TkMessage.success("复制成功！"),
  },

  // 深色 / 浅色切换过渡动画
  viewTransition: {
    enabled: true,
    mode: "out-in",
    duration: 300,
    easing: "ease-in",
  },

  // 页脚导航
  footerGroup: [
    {
      title: "站内导航",
      links: [
        { name: "技术文章", link: "/tech/html5" },
        { name: "视频作品", link: "/videos" },
        { name: "AIGC 作品", link: "/aigc" },
        { name: "关于我", link: "/about" },
      ],
    },
    {
      title: "找到我",
      links: [
        { name: "GitHub", link: "https://github.com/your-github", icon: "icon-github" },
        { name: "Bilibili", link: "https://space.bilibili.com/your-uid", icon: "icon-bilibili" },
        { name: "邮箱", link: "mailto:hello@example.com", icon: "icon-youjian" },
      ],
    },
  ],

  // 页脚版权
  footerInfo: {
    // 保留主题版权，基于 MIT 协议与原作者 Teek 的成果
    theme: {
      name: `Theme By Teek@${version}`,
      link: "https://github.com/teekhub/vitepress-theme-teek",
    },
    copyright: {
      createYear: 2026,
      suffix: "金凯",
    },
  },

  // 回到顶部
  backTop: {
    enabled: true,
    content: "progress",
    done: TkMessage => TkMessage.success("返回顶部成功"),
  },

  // 首页右下角卡片排序（关闭友链卡片）
  homeCardSort: ["topArticle", "category", "tag", "docAnalysis"],

  // 社交图标
  social: [
    {
      icon: "icon-github",
      name: "GitHub",
      link: "https://github.com/your-github",
    },
    {
      icon: "icon-bilibili",
      name: "Bilibili",
      link: "https://space.bilibili.com/your-uid",
    },
    {
      icon: "icon-youjian",
      name: "邮箱",
      link: "mailto:hello@example.com",
    },
  ],

  // 友情链接：个人站暂不启用，需要时把 enabled 改为 true 并填写 list
  friendLink: {
    enabled: false,
    list: [],
  },

  // 主题增强面板：保留扩展色板，默认使用 Element Plus 蓝
  themeEnhance: {
    enabled: true,
    themeColor: {
      defaultColorName: "tk-primary",
      append: [
        {
          label: "扩展主题色板",
          tip: "扩展主题色板",
          options: [
            { label: "紫罗兰", value: "violet", color: "#7166f0" },
            { label: "珊瑚粉", value: "coral-pink", color: "#ff6b6b" },
            { label: "天蓝", value: "sky-blue", color: "#00bbf9" },
            { label: "蓝绿", value: "blue-green", color: "#00f5d4" },
            { label: "粉红", value: "pink", color: "#f15bb5" },
            { label: "黄绿", value: "yellow-green", color: "#8ac926" },
            { label: "橙红", value: "orange-red", color: "#ff9e6b" },
            { label: "石板灰", value: "slate-gray", color: "#708090" },
            { label: "深海蓝", value: "ocean-blue", color: "#0077be" },
            { label: "科技蓝", value: "tech-blue", color: "#0056b3" },
            { label: "靛青色", value: "indigo", color: "#4b0082" },
            { label: "炭灰色", value: "charcoal", color: "#36454f" },
            { label: "薄荷绿", value: "mint", color: "#3eb489" },
            { label: "松石绿", value: "turquoise", color: "#40e0d0" },
            { label: "橄榄绿", value: "olive-green", color: "#808000" },
            { label: "柠檬黄", value: "lemon", color: "#ffd700" },
            { label: "薰衣草", value: "lavender", color: "#967bb6" },
            { label: "玫瑰金", value: "rose-gold", color: "#b76e79" },
            { label: "豆沙红", value: "bean-paste-red", color: "#d27d7d" },
            { label: "雾霾蓝", value: "haze-blue", color: "#6699cc" },
            { label: "霓虹紫", value: "neon-purple", color: "#bc13fe" },
            { label: "极光绿", value: "aurora-green", color: "#00ff9d" },
            { label: "日落橙", value: "sunset-orange", color: "#ff7f50" },
            { label: "琥珀色", value: "amber", color: "#ffbf00" },
          ],
        },
      ],
    },
  },

  // 站点分析：留空即可，需要时自行接入
  siteAnalytics: [],

  // 侧边栏生成
  vitePlugins: {
    sidebarOption: {
      // 与 createRewrites() 配合，按 permalink 生成侧边栏链接
      resolveRule: "rewrites",
      initItems: false,
      ignoreIndexMd: true,
    },
  },
});
