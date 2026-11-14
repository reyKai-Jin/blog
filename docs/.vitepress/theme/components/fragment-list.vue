<script setup lang="ts" name="FragmentList">
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import { formatDate, usePosts } from "vitepress-theme-teek";

const props = defineProps<{
  /** 按分类筛选文章，未传时读取 frontmatter.listCategory */
  category?: string;
}>();

const { frontmatter } = useData();
const posts = usePosts();

const category = computed(() => props.category || (frontmatter.value.listCategory as string) || "");

const items = computed(() =>
  posts.value.sortPostsByDate.filter(post => {
    const categories = [post.frontmatter.categories || []].flat();
    return !!category.value && categories.includes(category.value);
  })
);

const formatDay = (date?: string) => (date ? formatDate(date, "yyyy-MM-dd", false) : "");

const subCategories = (categories?: string | string[]) =>
  [categories || []].flat().filter(name => name && name !== category.value && name !== "技术文章");

const tagsOf = (post: any) => {
  const badges = [category.value, ...subCategories(post.frontmatter.categories)];
  return [post.frontmatter.tags || []].flat().filter((tag: string) => !badges.includes(tag));
};

const plain = (html?: string) =>
  (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const excerptOf = (post: any) => plain(post.frontmatter.description || post.excerpt);
</script>

<template>
  <div class="fragment-list">
    <ul v-if="items.length">
      <li v-for="post in items" :key="post.url">
        <time class="fragment-list__date" :datetime="post.date">{{ formatDay(post.date) }}</time>

        <div class="fragment-list__body">
          <a class="fragment-list__title" :href="post.url && withBase(post.url)">{{ post.title }}</a>

          <div class="fragment-list__meta">
            <span v-for="name in subCategories(post.frontmatter.categories)" :key="name" class="fragment-list__badge">
              {{ name }}
            </span>
            <span v-if="tagsOf(post).length" class="fragment-list__tags">{{ tagsOf(post).join(" · ") }}</span>
          </div>

          <p v-if="excerptOf(post)" class="fragment-list__excerpt">{{ excerptOf(post) }}</p>
        </div>
      </li>
    </ul>

    <p v-else class="fragment-list__empty">还没有文章，敬请期待。</p>
  </div>
</template>

<style scoped>
.fragment-list {
  margin-top: 20px;
}

.fragment-list > ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.fragment-list > ul > li {
  display: grid;
  grid-template-columns: 104px 1fr;
  gap: 16px;
  margin: 0;
  padding: 16px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  list-style: none;
  transition: background-color 0.2s ease;
}

.fragment-list > ul > li::marker {
  content: "";
}

.fragment-list > ul > li:last-child {
  border-bottom: 0;
}

.fragment-list > ul > li:hover {
  background-color: var(--vp-c-bg-soft);
}

.fragment-list__date {
  color: var(--vp-c-text-3);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  padding-top: 2px;
  white-space: nowrap;
}

.fragment-list__title {
  color: var(--vp-c-text-1);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  text-decoration: none;
  transition: color 0.2s ease;
}

.fragment-list__title:hover {
  color: var(--vp-c-brand-1);
}

.fragment-list__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.fragment-list__badge {
  padding: 0 8px;
  border-radius: 999px;
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
  line-height: 20px;
}

.fragment-list__tags {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fragment-list__excerpt {
  display: -webkit-box;
  overflow: hidden;
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.fragment-list__empty {
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .fragment-list > ul > li {
    grid-template-columns: 1fr;
    gap: 4px;
    padding: 14px 8px;
  }

  .fragment-list__date {
    font-size: 12px;
  }
}
</style>
