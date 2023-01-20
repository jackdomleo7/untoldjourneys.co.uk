import type { EntryFields } from 'contentful'

export interface BlogDetails {
  hubTitle: string;
  hubIntro: EntryFields.RichText,
  articleDisclaimer: EntryFields.RichText,
}