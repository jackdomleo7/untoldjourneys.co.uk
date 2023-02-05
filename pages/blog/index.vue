<template>
  <div class="blog-hub">
    <header class="blog-hub__header container container--thinner">
      <h1 class="blog-hub__title">{{ page.fields.hubTitle }}</h1>
      <div v-html="parseRichText(page.fields.hubIntro)" />
    </header>
    <BlogList :limit="1000" />
  </div>
</template>

<script lang="ts" setup>
import BlogList from '@/components/BlogList.vue';
import { parseRichText } from '@/utils/parseRichText'
import type { ContentfulEntries } from '@/types/CMS/Entries';

const { data } = await useAsyncData((ctx) => { return ctx!.$contentful.getEntries<Pick<ContentfulEntries.BlogDetails, 'hubIntro'|'hubTitle'>>({ content_type: 'blogDetails', limit: 1, select: ['fields.hubTitle', 'fields.hubIntro'] })})
const page = data.value!.items[0]

useHead({
  title: 'Blog',
  meta: [
    { property: 'twitter:title', content: 'Blog | Untold Journeys' },
  ]
})
</script>

<style lang="scss" scoped>
.blog-hub {
  padding: 1rem;

  @media (min-width: $responsive-standard-tablet) {
    margin-top: 2rem;
  }

  &__header {
    text-align: center;
  }

  &__title {
    font-size: var(--text-subtitle);
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 2rem;
  }
}
</style>