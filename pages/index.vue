<template>
  <div>
    <header id="hero" class="hero">
      <div class="hero__box">
        <h1 class="hero__title">Welcome to Untold Journeys!</h1>
        <p class="hero__intro">We are a couple who are passionate about travelling and writing travel-related articles on our travel blog. We have created handy trip planners to help you plan your next trip!</p>
        <Btn class="hero__cta" url="https://www.etsy.com" icon="external" target="_blank">Get my planner</Btn>
      </div>
    </header>
    <section id="about" class="about">
      <div class="about__inner container">
        <img class="about__img" src="/images/about.jpg" alt="Jack Domleo & Ella Parsons" height="400" width="400" />
        <h2 class="about__title">About us</h2>
        <p class="about__info">We are <a href="https://jackdomleo.dev" target="_blank" rel="nofollow">Jack</a> & Ella, an engaged couple from Nottinghamshire, UK. Ella is also a certified travel agent, so go check out her website. We have a passion for travel and living life to the fullest. Our favourite holiday destination is Florida, US.</p>
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
</script>

<style lang="scss" scoped>
.hero {
  background-image: url('/images/hero-bg.jpeg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
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