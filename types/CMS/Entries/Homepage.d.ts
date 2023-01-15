import type { Asset, EntryFields } from 'contentful'

export interface Homepage {
  heroTitle: string,
  heroBody: EntryFields.RichText,
  heroCtaText?: string,
  heroCtaUrl?: string,
  heroBackgroundImage: Asset,
  aboutTitle: string,
  aboutBody: EntryFields.RichText,
  aboutImage: Asset
}