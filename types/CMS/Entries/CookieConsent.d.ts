import type { EntryFields } from 'contentful'

export interface CookieConsent {
  title: string,
  content: EntryFields.RichText,
  acceptButtonText: string,
  rejectButtonText: string
}