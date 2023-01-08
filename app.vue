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

const $route = useRoute()
let currentUrl = ref(`${window.location.hostname}${$route.path}`)

watch($route, () => {
  currentUrl.value = `${window.location.hostname}${$route.path}`
})

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
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'color-scheme', content: 'light' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'canonical', href: currentUrl }
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
