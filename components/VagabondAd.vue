<template>
  <section class="vagabond">
    <div class="vagabond__inner">
      <div class="vagabond__box">
        <h2 class="vagabond__title">Get 10% off any Vagabond Life purchase using our discount code</h2>
        <p class="vagabond__info">Use the discount code <strong>UNTOLDJOURNEYS</strong> at the checkout to receive 10% off any purchase</p>
        <Btn class="vagabond__cta" url="https://www.vagabond-life.com/untold-journeys" icon="external">Browse Vagabond Life</Btn>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Btn from './Btn.vue';
</script>

<style lang="scss" scoped>
.vagabond {
  padding: 4rem 1rem;

  &__inner {
    max-width: 70rem;
    margin-inline: auto;
    padding: 46vmin 1rem 1rem 1rem;
    text-align: center;
    background-image: url('https://shoutoutglobal.s3.amazonaws.com/ymuohz9msa.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: grid;
    place-items: center;
    grid-template-columns: 1fr;

    @media (min-width: $responsive-standard-tablet) {
      min-height: 30rem;
      padding: 3rem;
      grid-template-areas: '. . box';
      grid-template-columns: 1fr 1fr 2fr;
    }
  }

  &__box {
    grid-area: box;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(2px);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__title {
    margin: 0;
    font-size: var(--text-heading);
  }

  &__info {
    margin: 0;
    font-size: var(--text-body);
  }

  &__cta {
    align-self: center;
  }
}
</style>