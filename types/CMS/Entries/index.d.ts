import type { BlogPage as EntryBlogPage } from './BlogPage'
import type { CookieConsent as EntryCookieConsent } from './CookieConsent'

export namespace ContentfulEntries {
  export interface BlogPage extends EntryBlogPage {}
  export interface CookieConsent extends EntryCookieConsent {}
}