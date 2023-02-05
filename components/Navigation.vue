<template>
  <nav class="nav" :class="{ 'nav--sticky': !navIsAtTop || isMobileNavOpen }">
    <div class="nav__inner container">
      <div v-if="!isMobile" class="nav__links">
        <ul class="nav__links-list">
          <li v-for="navLink in navLinks" :key="navLink.url">
            <nuxt-link :to="navLink.url">
              {{ navLink.text }}
              <nuxt-icon class="nav__links-icon" v-if="navLink.url.startsWith('https://')" name="external" />
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="nav__logo">
        <nuxt-link to="/">
          <nuxt-picture
            :src="props.logo.fields.file!.url"
            :alt="props.logo.fields.description"
            width="352"
            height="134"
            sizes="4kdesktop:352px"
            format="webp"
            provider="contentful"
            preload
          />
          <span class="sr-only" translate="no">Untold Journeys - Time for adventure</span>
        </nuxt-link>
      </div>
      <div v-if="!isMobile" class="nav__social">
        <ul class="nav__social-list">
          <li v-for="socialLink in socialLinks" :key="socialLink.url">
            <nuxt-link
              ref="noopener noreferrer"
              :to="socialLink.url"
              target="_blank"
              :title="socialLink.text"
            >
              <nuxt-icon class="nav__social-icon" :name="socialLink.icon" />
              <span class="sr-only">{{ socialLink.text }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <button
        v-if="isMobile"
        class="nav__hamburger"
        :class="{ 'nav__hamburger--open': isMobileNavOpen }"
        @click="isMobileNavOpen = !isMobileNavOpen"
      >
        <div class="nav__hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span class="sr-only">{{ isMobileNavOpen ? 'Close' : 'Menu' }}</span>
      </button>
      <div v-if="isMobile" class="nav__more" :class="{'nav__more--open': isMobile && isMobileNavOpen}">
        <ul class="nav__more-list">
          <li v-for="navLink in navLinks" :key="navLink.text">
            <nuxt-link :to="navLink.url!">
              {{ navLink.text }}
              <nuxt-icon class="nav__more-list-icon" v-if="navLink.url.startsWith('https://')" name="external" />
            </nuxt-link>
          </li>
        </ul>
        <ul class="nav__more-social">
          <li v-for="socialLink in socialLinks" :key="socialLink.url">
            <nuxt-link
              ref="noopener noreferrer"
              :to="socialLink.url"
              target="_blank"
              :title="socialLink.text"
            >
              <nuxt-icon class="nav__more-social-icon" :name="socialLink.icon" />
              <span class="sr-only">{{ socialLink.text }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { socialLinks } from '@/utils/socialLinks'
import { type PropType } from 'vue';
import { type Asset } from 'contentful'

const props = defineProps({
  logo: {
    type: Object as PropType<Asset>,
      required: true
  }
})

const route = useRoute()

const isMobile = ref(false)
const isTouchscreen = ref(false)
const isMobileNavOpen = ref(false)
const navIsAtTop = ref(false)

const navLinks = [
  { text: 'Blog', url: '/blog' }
]

watch(route, () => {
  isMobileNavOpen.value = false
})

onMounted(() => {
  setResponsiveness()
  handleScroll()
  window.addEventListener('resize', setResponsiveness)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('resize', setResponsiveness)
  window.removeEventListener('scroll', handleScroll)
})

function setResponsiveness (): void {
  const navBreak = window.getComputedStyle(document.querySelector('nav.nav')!).getPropertyValue('--nav-break')
  isMobile.value = !window.matchMedia(`(min-width: ${navBreak})`).matches
  isTouchscreen.value = !window.matchMedia('(hover: hover)').matches

  if (window.matchMedia(`(min-width: ${navBreak})`).matches) {
    isMobileNavOpen.value = false
  }
}

function handleScroll (): void {
  navIsAtTop.value = !(document.body.scrollTop > 10 || document.documentElement.scrollTop > 10)
}
</script>

<style lang="scss" scoped>
$nav-break: $responsive-large-tablet;

.nav {
  --nav-break: #{$nav-break};
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100vw;
  height: 6rem;
  color: var(--color-primary-text);
  background-color: #fff;
  font-size: var(--text-large);

  @media (min-width: $nav-break) {
    height: 9rem;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: 280ms ease;
    transition-property: box-shadow, height;
    will-change: box-shadow, height;
  }

  &--sticky {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);

    @media (min-width: $nav-break) {
      height: 6rem;

      .nav__logo {
        width: 13rem;
      }
    }
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    position: relative;
    padding-inline: 1rem;
    background-color: #fff;
    position: relative;
    z-index: 1;

    @media (min-width: $nav-break) {
      padding-inline: 2rem;
    }
  }

  &__logo {
    margin: 0;
    width: 14rem;

    @media (min-width: $nav-break) {
      width: 22rem;
    
      @media (prefers-reduced-motion: no-preference) {
        transition: width 280ms ease;
        will-change: width;
      }
    }

    a {
      display: block;
    }
  }

  &__links {
    display: flex;
    height: 100%;

    &-list {
      display: flex;
      gap: 2rem;
      list-style-type: none;
      padding-left: 0;
      margin: 0;
      height: 100%;

      li {
        display: grid;
        place-items: center;
      }

      a {
        font-family: sans-serif;
        font-weight: 700;
        color: var(--color-primary-text);
        display: flex;
        align-items: center;
        gap: 0.25rem;
        text-decoration: none;
        padding: 0.25rem;
        border-bottom: 2px solid transparent;

        @media (prefers-reduced-motion: no-preference) {
          transition: border 280ms ease;
        }

        @media (hover: hover) {
          &:hover {
            border-bottom-color: var(--color-accent);
          }
        }
      }
    }

    &-icon {
      width: 0.75rem;
    }
  }

  &__social {
    grid-area: social;
    display: flex;
    height: 100%;

    &-list {
      display: flex;
      gap: 0.75rem;
      list-style-type: none;
      padding-left: 0;
      margin: 0;
      height: 100%;

      li {
        display: grid;
        place-items: center;
      }

      a {
        color: var(--color-primary-text);
        display: flex;
        align-items: center;
        padding: 0.5rem;
        border-radius: var(--border-radius-standard);

        @media (prefers-reduced-motion: no-preference) {
          transition: background-color 280ms ease;
        }

        &:hover,
        &:active {
          background-color: var(--color-foreground-1);
        }
      }
    }

    &-icon {
      height: 1.5rem;
      width: 1.5rem;
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
        border-radius: var(--border-radius-standard);
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

        .nav__hamburger--open & {
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

  &__more {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    height: 0;
    background-color: var(--color-background);
    border-top: 0 solid var(--color-accent);
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    padding: 0 3rem;
    min-width: 18rem;
    transition-property: height, padding, border;
    transition: 260ms ease;
    will-change: height, padding, border;
    overflow: hidden;
    visibility: hidden;

    &--open {
      height: max-content;
      padding-block: 1rem;
      border-top-width: 4px;
      visibility: visible;
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    &-list {
      margin: 0;
      padding: 0;
      max-height: 24rem;
      list-style-type: none;

      &-icon {
        width: 0.625rem;
      }
    }

    &-social {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0;
      margin-top: 1rem;
      margin-bottom: 0;
      list-style-type: none;

      &-icon {
        height: 1.5rem;
        width: 1.5rem;
      }
    }

    a {
      text-decoration: none;
      display: flex;
      padding: 0.5rem;
      gap: 0.375rem;
      color: var(--color-primary-text);
    }
  }
}
</style>