<template>
  <div>
    <BlogList :limit="1000" />
  </div>
</template>

<script lang="ts" setup>
import BlogList from '@/components/BlogList.vue';

useHead({
  title: 'Blog',
  meta: [
    { name: 'twitter:title', content: 'Blog | Untold Journeys' },
  ]
})
</script>

<style lang="scss" scoped>

</style>