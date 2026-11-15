<script setup lang="ts" name="WorkCardList">
import { computed } from "vue";
import { useData } from "vitepress";
import { TkHomePostItemCard, useNamespace, usePosts } from "vitepress-theme-teek";

const props = defineProps<{
  /** 按分类筛选作品，未传时读取 frontmatter.workCategory */
  category?: string;
}>();

const ns = useNamespace("post");
const { frontmatter } = useData();
const posts = usePosts();

const category = computed(() => props.category || (frontmatter.value.workCategory as string) || "");

const items = computed(() =>
  posts.value.sortPostsByDateAndSticky.filter(post => {
    const categories = post.frontmatter.categories || [];
    return categories.includes(category.value);
  })
);
</script>

<template>
  <div :class="[ns.b(), ns.is('card'), 'work-card-list']">
    <ul v-if="items.length">
      <li v-for="post in items" :key="post.url">
        <TkHomePostItemCard :post />
      </li>
    </ul>
    <p v-else class="work-card-list__empty">还没有作品，敬请期待。</p>
  </div>
</template>

<style scoped>
.work-card-list > ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.work-card-list > ul > li {
  margin: 0;
  padding: 0;
}

.work-card-list > ul > li::marker {
  content: "";
}

.work-card-list :deep(.tk-post-item-card__info .title) {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

/* 确保封面图区域的链接可点击 */
.work-card-list :deep(.tk-post-item-card__cover-img a) {
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.work-card-list :deep(.tk-post-item-card__cover-img img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none; /* 让点击事件穿透到 <a> 标签 */
}

.work-card-list__empty {
  color: var(--vp-c-text-3);
}
</style>
