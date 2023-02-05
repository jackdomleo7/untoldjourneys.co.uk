<template>
  <article class="article container container--thinner">
    <header>
      <h1 class="article__title">{{ article.fields.title }}</h1>
    </header>
    <nuxt-picture class="article__img" provider="contentful" :src="article.fields.image.fields.file.url" :alt="article.fields.image.fields.description" width="768" height="403" sizes="4kdesktop:768px" format="webp" preload />
    <ul class="article__tags">
      <li role="presentation"><strong>Tags:</strong></li>
      <li v-for="tag in article.fields.tags" :key="tag" class="tag">
        {{ tag }}
      </li>
    </ul>
    <p><strong>Read time:</strong> {{ readTime }} min{{ readTime !== 1 ? 's' : '' }}</p>
    <p class="article__date">
      <strong>Posted: </strong>
      <time :datetime="dayjs(new Date(article.fields.publishDate)).format('YYYY-MM-DD')">
        {{ dayjs(new Date(article.fields.publishDate)).format('MMMM D, YYYY') }}
      </time>
    </p>
    <div v-html="parseRichText(article.fields.body, { $img })" class="rich-text article__content" />
    <div v-html="parseRichText(disclaimer.fields.articleDisclaimer)" class="article__disclaimer" />
  </article>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import readingTime from 'reading-time'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { parseRichText } from '@/utils/parseRichText'
import type { ContentfulEntries } from '@/types/CMS/Entries'

const $img = useImage()
const $route = useRoute()
const config = useRuntimeConfig()

const articleEntries = await useAsyncData(`article-${$route.params.slug}`, (ctx) => { return ctx!.$contentful.getEntries<ContentfulEntries.BlogPage>({ content_type: 'blogPost', limit: 1, 'fields.slug': $route.params.slug })})
const article = articleEntries.data.value!.items[0]

const readTime = Math.ceil(readingTime(documentToPlainTextString(article.fields.body)).minutes)

const blogDetails = await useAsyncData((ctx) => { return ctx!.$contentful.getEntries<Pick<ContentfulEntries.BlogDetails, 'articleDisclaimer'>>({ content_type: 'blogDetails', limit: 1, select: ['fields.articleDisclaimer'] })})
const disclaimer = blogDetails.data.value!.items[0]

useHead({
  title: `${article.fields.title} | Blog`,
  meta: [
    { name: 'author', content: 'Jack Domleo, Ella Parsons' },
    { name: 'description', content: article.fields.description },
    { property: 'og:description', content: article.fields.description },
    { property: 'og:image', content: article.fields.image.fields.file.url },
    { property: 'og:image:type', content: article.fields.image.fields.file.contentType },
    { property: 'og:type', content: 'article' },
    { property: 'article:author', content: 'Jack Domleo, Ella Parsons' },
    { property: 'article:published_time', content: new Date(article.fields.publishDate).toString() },
    { property: 'article:tags', content: article.fields.tags.join(', ') },
    { property: 'twitter:title', content: `${article.fields.title} | Blog | Untold Journeys` },
    { property: 'twitter:description', content: article.fields.description },
    { property: 'twitter:image', content: article.fields.image.fields.file.url }
  ],
  link: [
    { rel: 'canonical', href: `${config.public.BASE_URL}/blog/${$route.params.slug}` }
  ]
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/rich-text';

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

  &__img {
    margin-block: 2rem;
    display: block;

    :deep(img) {
      border-radius: var(--border-radius-standard);
    }
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
  }

  &__disclaimer {
    font-size: var(--text-small);
    margin-top: 3rem;
  }
}

.tag {
  color: var(--color-accent);
}
</style>