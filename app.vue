<template>
  <div class="page">
    <CookieConsent v-if="trackingConsent === false" @close="onClose" />
    <Navigation />
    <main>
      <NuxtLayout />
    </main>
    <SiteFooter />
  </div>
</template>

<script lang="ts" setup>
import { bootstrap } from 'vue-gtag'
import cookie from 'cookiejs'
import CookieConsent from './components/CookieConsent.vue';
import Navigation from './components/Navigation.vue';
import SiteFooter from './components/SiteFooter.vue';

/**
 * false = cookie not set
 * 'false' = user has not consented
 * 'true' = user has consented
 */
const trackingConsent = ref<false|'true'|'false'>(cookie.get('analyticsConsented') as false|'true'|'false')

const $route = useRoute()
let currentUrl = ref(`${window.location.hostname}${$route.path}`)

if (trackingConsent.value === 'true') {
  bootstrap().then(gtag => {})
}

watch($route, () => {
  currentUrl.value = `${window.location.hostname}${$route.path}`
})

function onClose() {
  trackingConsent.value = cookie.get('analyticsConsented') as false|'true'|'false'
}

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
