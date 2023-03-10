import type { BasicPage as EntryBasicPage } from './BasicPage'
import type { BlogDetails as EntryBlogDetails } from './BlogDetails'
import type { BlogPage as EntryBlogPage } from './BlogPage'
import type { Homepage as EntryHomepage } from './Homepage'

export namespace ContentfulEntries {
  export interface BasicPage extends EntryBasicPage {}
  export interface BlogDetails extends EntryBlogDetails {}
  export interface BlogPage extends EntryBlogPage {}
  export interface Homepage extends EntryHomepage {}
}