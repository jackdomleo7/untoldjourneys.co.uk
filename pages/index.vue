<template>
  <div>
    <header class="hero">
      <div class="hero__box">
        <h1 class="hero__title">Welcome to Untold Journeys!</h1>
        <p class="hero__intro">We are a couple who are passionate about travelling and writing travel-related articles on our travel blog. We have created handy trip planners to help you plan your next trip!</p>
        <Btn class="hero__cta" url="https://www.etsy.com" icon="external" target="_blank">Get my planner</Btn>
      </div>
    </header>
    <VagabondAd />
  </div>
</template>

<script lang="ts" setup>
import Btn from '@/components/Btn.vue';
import VagabondAd from '@/components/VagabondAd.vue';
</script>

<style lang="scss" scoped>
.hero {
  margin-top: 6rem;
  background-image: url('/images/hero-bg.jpeg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 60vh;
  padding: 1rem;
  display: grid;
  place-items: center;

  @media (min-width: $responsive-large-tablet) {
    margin-top: 9rem;
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
</style>