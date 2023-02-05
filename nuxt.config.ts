import * as contentful from 'contentful'
import type { ContentfulEntries } from './types/CMS/Entries'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

const contentfulClient = contentful.createClient({
  space: process.env.NUXT_CTF_SPACE_ID,
  accessToken: process.env.NUXT_CTF_CDA_ACCESS_TOKEN
})

async function getBlog(): Promise<string[]> {
  const routes: string[] = []

  // Blog
  const blog = await contentfulClient.getEntries<Pick<ContentfulEntries.BlogPage, 'slug'>>({ content_type: 'blogPost', limit: 1000, select: ['fields.slug'] })
  for (const article of blog.items) {
    routes.push(`/blog/${article.fields.slug}`)
  }

  return routes
}

async function getBasicPages(): Promise<string[]> {
  const routes: string[] = []

  // Blog
  const basicPages = await contentfulClient.getEntries<Pick<ContentfulEntries.BasicPage, 'slug'>>({ content_type: 'basicPage', limit: 1000, select: ['fields.slug'] })
  for (const page of basicPages.items) {
    routes.push(`/${page.fields.slug}`)
  }

  return routes
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  typescript: {
    typeCheck: process.env.NODE_ENV === 'dev',
    strict: true
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.NUXT_BASE_URL,
      CTF_SPACE_ID: process.env.NUXT_CTF_SPACE_ID,
      CTF_CDA_ACCESS_TOKEN: process.env.NUXT_CTF_CDA_ACCESS_TOKEN,
      GOOGLE_ANALYTICS_ID: process.env.NUXT_GOOGLE_ANALYTICS_ID
    }
  },
  css: [
    'modern-normalize/modern-normalize.css',
    '@/assets/styles/main.scss'
  ],
  modules: ['nuxt-icons', '@nuxt/image-edge', 'nuxt-simple-sitemap'],
  image: {
    contentful: {},
    screens: {
      smallmobile: 340,
      standardmobile: 390,
      largemobile: 450,
      smalltablet: 640,
      standardtablet: 768,
      largetablet: 1000,
      smalldesktop: 1366,
      standarddesktop: 1920,
      largedesktop: 2880,
      '4kdesktop': 3840
    }
  },
  sitemap: {
    hostname: process.env.NUXT_BASE_URL
  },
  hooks: {
    async 'nitro:config' (nitroConfig) {
      if (nitroConfig.dev) { return }
      nitroConfig.prerender!.routes = [...(await getBasicPages()), ...(await getBlog())]
    }
  },
  vite: {
    plugins: [nodePolyfills({
      protocolImports: true
    })],
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/scss/variables/responsive.scss" as *;@use "sass:math";'
        }
      }
    }
  }
})
