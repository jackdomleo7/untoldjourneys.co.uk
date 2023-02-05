import { documentToHtmlString, type Options } from '@contentful/rich-text-html-renderer';
import { type Node, type Document } from '@contentful/rich-text-types';
import { decode } from 'html-entities';
import type { EntryFields } from 'contentful';

export function parseRichText(document: EntryFields.RichText | Node | Document, composables?: { $img: any }, options?: Options) {
  return documentToHtmlString(document, {
    renderNode: {
      'embedded-asset-block': (node: Node) => `<img src="${composables?.$img(node.data.target.fields.file.url, { width: 768 }, { provider: 'contentful' })}" alt="${node.data.target.fields.description}" width="768" height="403" loading="lazy" style="border-radius: var(--border-radius-standard);" />`,
      'table': (node: Node) => `<div class="table"><table>${parseRichText(node, composables)}</table></div>`,
      'hyperlink': (node) => {
        return `<a href="${node.data.uri}" ${node.data.uri.startsWith('/') || node.data.uri.includes('https://untoldjourneys.co.uk') ? '' : 'rel="nofollow noopener"'}>${node.content[0].value}</a>`
      },
      'blockquote': (node: Node) => `<div class="quote"><blockquote>${parseRichText(node, composables, {
        renderNode: {
          'paragraph': (node: Node) => {
            if (node.content[0].value.startsWith('-')) {
              return `<cite>${parseRichText(node, composables)}</cite>`
            }
            else {
              return `<p>${parseRichText(node, composables)}</p>`
            }
          }
        }
      })}</blockquote></div>`,
      ...options?.renderNode
    },
    renderMark: {
      'code': (text: string) => {
        if (text.split('\n')[0] === 'RAW_HTML') {
          return decode(text.replace('RAW_HTML\n', ''))
        }
        else {
          return `<code>${text}</code>`
        }
      },
      ...options?.renderMark
    }
  })
}