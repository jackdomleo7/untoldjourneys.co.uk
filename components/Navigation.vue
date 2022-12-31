<template>
  <nav class="navbar" :class="{ 'navbar--open': isMobileNavOpen }">
    <div class="navbar__inner container">
      <div class="navbar__logo">
        <nuxt-link to="/">
          <img
            src="/images/UntoldJourneys-logo.svg"
            alt="Untold Journeys"
            width="160"
            height="35"
          />
          <span class="sr-only" translate="no">Untold Journeys</span>
        </nuxt-link>
      </div>
      <div class="navbar__links">
        <ul class="navbar__links-list">
          <li v-for="navLink in navLinks" :key="navLink.url">
            <a :href="navLink.url">
              {{ navLink.text }}
            </a>
          </li>
        </ul>
      </div>
      <div class="navbar__social">
        <ul class="navbar__social-list">
          <li v-for="socialLink in socialLinks" :key="socialLink.url">
            <a
              ref="noopener noreferrer"
              :href="socialLink.url"
              target="_blank"
              :title="socialLink.text"
            >
              <nuxt-icon class="navbar__social-icon" :name="socialLink.icon" />
              <span class="sr-only">{{ socialLink.text }}</span>
            </a>
          </li>
        </ul>
      </div>
      <button
        class="navbar__hamburger"
        :class="{ 'navbar__hamburger--open': isMobileNavOpen }"
        @click="isMobileNavOpen = !isMobileNavOpen"
      >
        <div class="navbar__hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span class="sr-only">{{ isMobileNavOpen ? 'Close' : 'Menu' }}</span>
      </button>
    </div>
    <div
      class="navbar__nav"
      :class="{
        'navbar__nav--open': isMobileNavOpen
      }"
    >
      <div>
        <ul class="navbar__links-list">
          <li v-for="navLink in navLinks" :key="navLink.url">
            <a :href="navLink.url">
              {{ navLink.text }}
            </a>
          </li>
        </ul>
        <ul class="navbar__social-list">
          <li v-for="socialLink in socialLinks" :key="socialLink.url">
            <a
              ref="noopener noreferrer"
              :href="socialLink.url"
              target="_blank"
              :title="socialLink.text"
            >
              <nuxt-icon class="navbar__social-icon" :name="socialLink.icon" />
              <span class="sr-only">{{ socialLink.text }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const isMobileNavOpen = ref(false)
const navLinks = [
  { text: 'Blog', url: '/blog' },
  { text: 'Gallery', url: '/gallery' },
  { text: 'Shop', url: 'https://jackdomleo.dev' }
]
const socialLinks = [
  { icon: 'instagram', text: 'Instagram', url: 'https://www.instagram.com' },
  { icon: 'etsy', text: 'Etsy', url: 'https://www.etsy.com' }
]
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100vw;
  height: 3.5rem;
  color: var(--color-secondary-text);
  background-color: #fff;

  @media (min-width: $responsive-small-desktop) {
    position: sticky;
    top: 0;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    position: relative;
    padding-inline: 2rem;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }

  &__logo {
    margin: 0;
    width: 8.625rem;

    @media (min-width: $responsive-small-desktop) {
      width: 12.875rem;
    }

    img {
      height: 100%;
    }
  }

  &__hamburger {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.375rem;
    height: 1.9375rem;
    border: none;
    margin: 1rem 0;
    background-color: transparent;

    @media (min-width: $responsive-small-desktop) {
      display: none;
    }

    &-icon {
      width: 1.3rem;
      height: 1.1rem;
      position: relative;
      z-index: 2;
      transform: rotate(0deg);
      cursor: pointer;

      span {
        display: block;
        position: absolute;
        height: 0.125rem;
        width: 100%;
        background-color: var(--color-primary-text);
        border-radius: 0.5rem;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: 0.25s ease-in-out;

        &:nth-child(1) {
          top: 0;
        }

        &:nth-child(2),
        &:nth-child(3) {
          top: 45%;
        }

        &:nth-child(4) {
          top: 90%;
        }

        .navbar__hamburger--open & {
          &:nth-child(1),
          &:nth-child(4) {
            top: 45%;
            width: 0;
            left: 50%;
          }

          &:nth-child(2) {
            transform: rotate(45deg);
          }

          &:nth-child(3) {
            transform: rotate(-45deg);
          }
        }
      }
    }
  }

  &__nav {
    position: absolute;
    top: -30rem;
    left: 0;
    width: 200vw;
    background-color: #fff;
    transition: all 480ms ease;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    &--open {
      top: 100%;
    }

    > div {
      display: flex;
      flex-direction: column;
    }

    .navbar__links-list {
      display: flex;
      flex-direction: column;
      list-style-type: none;
      margin: 0;
      padding-inline: 1rem;

      li {
        border-bottom: 2px solid var(--color-secondary-text);
        display: grid;
        place-items: center;
      }

      a,
      button {
        font-family: sans-serif;
        font-size: 1rem;
        font-weight: 700;
        color: var(--color-secondary-text);
        text-decoration: none;
        padding: 1.25rem 1rem;
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        background-color: transparent;
        border: none;

        @media (prefers-reduced-motion: no-preference) {
          transition: color 280ms ease;
        }

        @media (hover: hover) {
          &:hover {
            color: var(--color-primary-text);
          }
        }

        svg {
          height: 1.5rem;
          width: 1.5rem;
        }
      }
    }

    .navbar__social-list {
      display: flex;
      gap: 1.25rem;
      list-style-type: none;
      padding-left: 0;
      margin: 2.5rem auto;
      height: 100%;

      li,
      a {
        color: var(--color-secondary-text);
        display: flex;
        align-items: center;
        height: 100%;

        @media (prefers-reduced-motion: no-preference) {
          transition: color 280ms ease;
        }

        @media (hover: hover) {
          &:hover {
            color: var(--color-primary-text);
          }
        }
      }
    }

    .navbar__social-icon {
      height: 2rem;
      width: 2rem;
    }

    @media (min-width: $responsive-small-desktop) {
      display: none;
    }
  }

  &__links {
    display: none;

    @media (min-width: $responsive-small-desktop) {
      display: flex;
      height: 100%;

      &-list {
        display: flex;
        gap: 2rem;
        list-style-type: none;
        padding-left: 0;
        margin: 0;
        height: 100%;

        li,
        a {
          font-family: sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-secondary-text);
          display: flex;
          align-items: center;
          text-decoration: none;

          @media (prefers-reduced-motion: no-preference) {
            transition: color 280ms ease;
          }

          @media (hover: hover) {
            &:hover {
              color: var(--color-primary-text);
            }
          }
        }
      }
    }
  }

  &__social {
    display: none;

    @media (min-width: $responsive-small-desktop) {
      display: flex;
      height: 100%;

      &-list {
        display: flex;
        gap: 0.75rem;
        list-style-type: none;
        padding-left: 0;
        margin: 0;
        height: 100%;

        li,
        a {
          color: var(--color-secondary-text);
          display: flex;
          align-items: center;
          height: 100%;

          @media (prefers-reduced-motion: no-preference) {
            transition: color 280ms ease;
          }

          @media (hover: hover) {
            &:hover {
              color: var(--color-primary-text);
            }
          }
        }
      }

      &-icon {
        height: 1.5rem;
        width: 1.5rem;
      }
    }
  }
}
</style>