<template>
  <div class="page">
    <Navigation :logo="page.fields.logo" />
    <main>
      <NuxtLayout />
    </main>
    <SiteFooter :logo="page.fields.logo" />
  </div>
</template>

<script lang="ts" setup>
import Navigation from './components/Navigation.vue';
import SiteFooter from './components/SiteFooter.vue';
import type { ContentfulEntries } from './types/CMS/Entries';

const { data } = await useAsyncData((ctx) => { return ctx!.$contentful.getEntries<Pick<ContentfulEntries.Homepage, 'logo'>>({ content_type: 'homepage', limit: 1 })})
const page = data.value!.items[0]

useHead({
  htmlAttrs: {
    lang: 'en-GB'
  },
  titleTemplate: pageTitle => {
    const TITLE = 'Untold Journeys'
    return pageTitle
      ? `${pageTitle} | ${TITLE}`
      : TITLE
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'name', content: 'Untold Journeys' },
    { property: 'og:locale', content: 'en_GB' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:site', content: '@Untold__Journey' },
    { property: 'twitter:title', content: 'Untold Journeys' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'monetization', content: '$ilp.uphold.com/HQqg9QM4JyEj' },
    { name: 'color-scheme', content: 'light' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
    margin-top: 6rem;

    @media (min-width: $responsive-large-tablet) {
      margin-top: 9rem;
    }
  }
}
</style>
