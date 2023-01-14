import type { BasicPage as EntryBasicPage } from './BasicPage'
import type { BlogPage as EntryBlogPage } from './BlogPage'
import type { CookieConsent as EntryCookieConsent } from './CookieConsent'

export namespace ContentfulEntries {
  export interface BasicPage extends EntryBasicPage {}
  export interface BlogPage extends EntryBlogPage {}
  export interface CookieConsent extends EntryCookieConsent {}
}