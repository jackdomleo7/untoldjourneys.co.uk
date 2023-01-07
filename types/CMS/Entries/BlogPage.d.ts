import type { Asset, EntryFields } from 'contentful'

export interface BlogPage {
  title: string,
  slug: string,
  description: string,
  image: Asset,
  publishDate: string
  tags: string[],
  body: EntryFields.RichText,
}