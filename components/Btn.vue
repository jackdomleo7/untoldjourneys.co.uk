<template>
  <component :is="url ? defineNuxtLink({}) : 'button'" class="btn" :to="url" v-bind="$attrs">
    <slot />
    <nuxt-icon v-if="icon" :name="icon" class="btn__icon" />
  </component>
</template>

<script lang="ts" setup>
const props = defineProps({
  url: {
    type: String,
    default: undefined
  },
  icon: {
    type: String,
    default: undefined
  }
});
</script>

<style lang="scss" scoped>
.btn {
  background-color: var(--color-primary-text);
  color: #fff;
  padding: 1rem 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border: none;
  font-size: var(--text-large);
  text-decoration: none;

  &__icon {
    width: 1rem;
  }
}
</style>