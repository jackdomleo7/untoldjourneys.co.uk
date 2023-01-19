<template>
  <div>
    <header id="hero" class="hero" :style="{ backgroundImage: `url(${$img(page.fields.heroBackgroundImage.fields.file.url, { width: 1920 }, { provider: 'contentful' })})` }">
      <div class="hero__box">
        <h1 class="hero__title">{{ page.fields.heroTitle }}</h1>
        <div class="hero__intro" v-html="parseRichText(page.fields.heroBody, { $img })" />
        <Btn v-if="page.fields.heroCtaText && page.fields.heroCtaUrl" class="hero__cta" :url="page.fields.heroCtaUrl" icon="external" target="_blank">{{ page.fields.heroCtaText }}</Btn>
      </div>
    </header>
    <section id="about" class="about">
      <div class="about__inner container">
        <nuxt-img class="about__img" :src="page.fields.aboutImage.fields.file.url" :alt="page.fields.aboutImage.fields.description" height="400" width="400" sizes="4kdesktop:400px" provider="contentful" />
        <h2 class="about__title">{{ page.fields.aboutTitle }}</h2>
        <div class="about__info" v-html="parseRichText(page.fields.aboutBody, { $img })" />
      </div>
    </section>
    <VagabondAd />
    <section id="blog" class="blog container">
      <h2 class="blog__title">Latest articles</h2>
      <BlogList :limit="6" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import Btn from '@/components/Btn.vue';
import VagabondAd from '@/components/VagabondAd.vue';
import BlogList from '@/components/BlogList.vue';
import { parseRichText } from '@/utils/parseRichText'
import type { ContentfulEntries } from '@/types/CMS/Entries'

const $img = useImage()

const { data } = await useAsyncData((ctx) => { return ctx!.$contentful.getEntries<ContentfulEntries.Homepage>({ content_type: 'homepage', limit: 1 })})
const page = data.value!.items[0]
</script>

<style lang="scss" scoped>
.hero {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  min-height: 60vh;
  padding: 1rem;
  display: grid;
  place-items: center;

  @media (min-width: $responsive-large-tablet) {
    padding: 2rem;
  }

  &__box {
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(2px);
    max-width: 40rem;
    padding: 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__title {
    font-size: var(--text-title);
    margin: 0;
  }

  &__intro {
    font-size: var(--text-body);
    margin: 0;
  }

  &__cta {
    align-self: center;
  }
}

.about {
  background-color: #eee;
  padding: 3rem;

  &__inner {
    display: grid;
    grid-template-areas: 'title' 'img' 'info';
    place-items: center;
    gap: 2rem;

    @media (min-width: $responsive-small-tablet) {
      grid-template-areas: 'img title' 'img info';
      gap: 6rem;
    }
  }

  &__img {
    grid-area: img;
    width: 25rem;
    border-radius: 50%;
  }

  &__title {
    grid-area: title;
    font-size: var(--text-subtitle);
  }

  &__info {
    grid-area: info;
  }
}

.blog {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  &__title {
    font-size: var(--text-subtitle);
  }
}
</style>