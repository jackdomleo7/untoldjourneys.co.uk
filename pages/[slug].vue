<template>
  <article class="basic-page container container--thinner">
    <header>
      <h1 class="basic-page__title">{{ page.fields.title }}</h1>
    </header>
    <p v-if="page.fields.slug === 'privacy-policy'">
      Last updated: <time :datetime="dayjs(new Date(page.sys.updatedAt)).format('YYYY-MM-DD')">{{ dayjs(new Date(page.sys.updatedAt)).format('MMMM D, YYYY') }}</time>
    </p>
    <div v-html="parseRichText(page.fields.body, { $img })" class="rich-text basic-page__content" />
  </article>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import { parseRichText } from '@/utils/parseRichText'
import type { ContentfulEntries } from '@/types/CMS/Entries'

const $img = useImage()
const $route = useRoute()

const { data } = await useAsyncData(`basicPage-${$route.params.slug}`, (ctx) => { return ctx!.$contentful.getEntries<ContentfulEntries.BasicPage>({ content_type: 'basicPage', limit: 1, 'fields.slug': $route.params.slug })})
const page = data.value!.items[0]

useHead({
  title: `${page.fields.title}`,
  meta: [
    { property: 'twitter:title', content: `${page.fields.title} | Untold Journeys` },
    ...(page.fields.metaDescription ? [
      { name: 'description', content: page.fields.metaDescription },
      { property: 'og:description', content: page.fields.metaDescription },
      { property: 'twitter:description', content: page.fields.metaDescription }
    ] : [])
  ]
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/rich-text';

.basic-page {
  font-size: var(--text-body);
  padding: 1rem;

  @media (min-width: $responsive-standard-tablet) {
    margin-top: 2rem;
  }

  &__title {
    font-size: var(--text-subtitle);
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 2rem;
  }
}
</style>