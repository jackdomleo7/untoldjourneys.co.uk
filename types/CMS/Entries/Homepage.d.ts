import type { Asset, EntryFields } from 'contentful'

export interface Homepage {
  metaDescription: string;
  logo: Asset;
  heroTitle: string;
  heroBody: EntryFields.RichText;
  heroCtaText?: string;
  heroCtaUrl?: string;
  heroBackgroundImage: Asset;
  aboutTitle: string;
  aboutBody: EntryFields.RichText;
  aboutImage: Asset
}