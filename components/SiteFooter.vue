<template>
  <footer class="footer">
    <nuxt-link to="/" class="footer__logo">
      <nuxt-img
        src="/images/UntoldJourneys-logo.png"
        alt="Untold Journeys"
        width="192"
        height="78"
        sizes="4kdesktop:192px"
        loading="lazy"
      />
    </nuxt-link>
    <ul class="footer__quick-links">
      <li v-for="quickLink in quickLinks" :key="quickLink.url">
        <nuxt-link :to="quickLink.url" :rel="quickLink.url.startsWith('https://') ? 'noopener' : undefined">
          {{ quickLink.text }}
        </nuxt-link>
      </li>
    </ul>
    <ul class="footer__social">
      <li v-for="socialLink in socialLinks" :key="socialLink.url">
        <nuxt-link :href="socialLink.url" target="_blank" rel="noopener noreferrer">
          <nuxt-icon class="footer__social-icon" :name="socialLink.icon" />
          <span class="sr-only">{{ socialLink.text }}</span>
        </nuxt-link>
      </li>
    </ul>
    <div class="footer__legal">
      <p>
        <nuxt-link to="/privacy-policy" class="link">Privacy Policy</nuxt-link>
      </p>
      <p>&copy; Copyright 2023. All rights reserved.</p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const quickLinks = [
  { text: 'Home', url: '/' },
  { text: 'Blog', url: '/blog' }
]
const socialLinks = [
  { icon: 'instagram', text: 'Instagram', url: 'https://www.instagram.com' },
  { icon: 'facebook', text: 'Facebook', url: 'https://www.facebook.com' },
  { icon: 'etsy', text: 'Etsy', url: 'https://www.etsy.com' }
]
</script>

<style lang="scss" scoped>
.footer {
  max-width: 32rem;
  min-width: 100%;
  margin-top: 8rem;
  margin-inline: auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;

  @media (min-width: $responsive-small-tablet) {
    padding-inline: 2rem;
    min-width: 32rem;
  }

  &__logo {
    width: 12rem;
    margin-inline: auto;
  }

  &__quick-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    list-style-type: none;
    padding-left: 0;
    margin-block: 1.5rem;

    @media (min-width: $responsive-small-tablet) {
      gap: 1rem;
    }

    a {
      color: var(--color-primary-text);
      text-decoration: none;

      &:hover,
      &:active {
        text-decoration: underline;
        text-decoration-color: var(--color-accent);
      }
    }
  }

  &__social {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
    margin-bottom: 1.5rem;

    a {
      display: grid;
      place-items: center;
      border-radius: 50%;
      overflow: hidden;
      background-color: var(--color-background);
      border: 1px solid var(--color-primary-text);
      transition: all 280ms ease;
      padding: 0.375rem;
      color: var(--color-primary-text);
      width: 2.5rem;
      aspect-ratio: auto 1 / 1;
      outline-offset: 2px;
    }

    &-icon {
      height: 1.5rem;
      width: 1.5rem;
    }
  }

  &__legal {
    text-align: center;
    margin-block: 0;
    line-height: 1.3;

    @media (min-width: $responsive-small-tablet) {
      line-height: unset;
    }
  }
}
</style>