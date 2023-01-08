<template>
  <article class="article container container--thinner">
    <header>
      <h1 class="article__title">{{ article.fields.title }}</h1>
    </header>
    <nuxt-picture class="post__img" provider="contentful" :src="article.fields.image.fields.file.url" alt="" width="800" height="420" sizes="4kdesktop:800px" preload />
    <ul class="article__tags">
      <li v-for="tag in article.fields.tags" :key="tag" class="tag">
        {{ tag }}
      </li>
    </ul>
    <p class="article__date">
      <strong>Posted: </strong>
      <time :datetime="dayjs(new Date(article.fields.publishDate)).format('YYYY-MM-DD')">
        {{ dayjs(new Date(article.fields.publishDate)).format('MMMM D, YYYY') }}
      </time>
    </p>
    <div v-html="documentToHtmlString(article.fields.body, options)" class="article__content" />
  </article>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { documentToHtmlString, Options } from '@contentful/rich-text-html-renderer';
import type { Node } from '@contentful/rich-text-types';
import type { ContentfulEntries } from '@/types/CMS/Entries'

const route = useRoute()
const $img = useImage()

const options: Options = {
  renderNode: {
    'embedded-asset-block': (node: Node) => `<img src="${$img(node.data.target.fields.file.url, { width: 800 }, { provider: 'contentful' })}" alt="" width="800" height="420" loading="lazy" />`
  }
}

const { data } = await useAsyncData((ctx) => { return ctx!.$contentful.getEntries<ContentfulEntries.BlogPage>({ content_type: 'blogPost', limit: 1, 'fields.slug': route.params.slug })})
const article = data.value!.items[0]

useHead({
  title: `${article.fields.title} | Blog`,
  meta: [
    { name: 'author', content: 'Jack Domleo, Ella Parsons' },
    { property: 'article:author', content: 'Jack Domleo, Ella Parsons' },
    { name: 'description', content: article.fields.description },
    { property: 'og:description', content: article.fields.description },
    { property: 'og:image', content: article.fields.image.fields.file.url },
    { property: 'og:image:type', content: article.fields.image.fields.file.contentType },
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: new Date(article.fields.publishDate).toString() }
  ]
})
</script>

<style lang="scss" scoped>
.article {
  font-size: var(--text-body);
  padding: 1rem;

  @media (min-width: $responsive-standard-tablet) {
    margin-top: 2rem;
  }

  &__title {
    font-size: var(--text-subtitle);
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  &__tags {
    list-style-type: none;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex-wrap: wrap;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  &__date {
    margin: 0;
  }

  &__content {
    margin-top: 3rem;

    :deep() {
      h2 {
        font-size: var(--text-heading);
        margin-top: 3rem;
        margin-bottom: 2rem;
      }

      h3 {
        font-size: var(--text-large);
        margin-top: 2rem;
        margin-bottom: 1rem;
      }

      p:empty {
        display: none;
      }

      hr {
        margin-block: 3rem;
      }
    }
  }
}

.tag {
  color: var(--color-accent);
}
</style>