<template>
  <div class="page">
    <Navigation />
    <main>
      <NuxtLayout />
    </main>
  </div>
</template>

<script lang="ts" setup>
import Navigation from './components/Navigation.vue';

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
    { name: 'og:locale', content: 'en_GB' },
    { name: 'og:type', content: 'website' },
    { name: 'format-detection', content: 'telephone=no' },
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
  }
}
</style>
