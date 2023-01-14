import type { EntryFields } from 'contentful'

export interface BasicPage {
  title: string,
  slug: string,
  body: EntryFields.RichText,
}