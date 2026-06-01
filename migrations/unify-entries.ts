/**
 * Folds the old `post` and `project` documents into the unified `entry` type.
 *
 * Run with:  npx sanity exec migrations/unify-entries.ts --with-user-token
 *
 * Non-destructive: creates `entry.<oldId>` documents (idempotent via
 * createOrReplace) and leaves the original `post`/`project` docs in place.
 * Verify the result, then delete the old docs + retire the schemas separately.
 *
 *   project → entry(type:'project')   description→body, blurb→summary,
 *                                     repo_url/demo_url→links, publishedAt←duration.end,
 *                                     technologies + duration dropped
 *   post    → entry(type:'essay')     excerpt→summary, mainImage→socialImage
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

type Block = { _type?: string; children?: Array<{ text?: string }> }

function blocksToSummary(blocks?: unknown): string | undefined {
  if (!Array.isArray(blocks)) return undefined
  const text = (blocks as Block[])
    .map((b) =>
      b?._type === 'block' && Array.isArray(b.children)
        ? b.children.map((c) => c?.text || '').join('')
        : '',
    )
    .join(' ')
    .trim()
  return text ? text.slice(0, 200) : undefined
}

function cleanSlug(s?: string): string {
  return (s || '').replace(/^\/?(projects|essays|writing)\//, '').replace(/^\/+/, '')
}

function entryId(oldId: string): string {
  return `entry.${oldId.replace(/^drafts\./, '')}`
}

async function run() {
  const posts = await client.fetch(`*[_type=="post" && !(_id in path('drafts.**'))]`)
  const projects = await client.fetch(`*[_type=="project" && !(_id in path('drafts.**'))]`)

  const tx = client.transaction()

  for (const p of posts) {
    tx.createOrReplace({
      _id: entryId(p._id),
      _type: 'entry',
      type: 'essay',
      title: p.title,
      slug: { _type: 'slug', current: cleanSlug(p.slug?.current) },
      publishedAt: p.publishedAt,
      ...(p.updatedAt ? { updatedAt: p.updatedAt } : {}),
      ...(p.excerpt ? { summary: p.excerpt.slice(0, 200) } : {}),
      ...(p.body ? { body: p.body } : {}),
      ...(Array.isArray(p.tags) ? { tags: p.tags } : {}),
      ...(p.mainImage ? { socialImage: p.mainImage } : {}),
    })
  }

  for (const pr of projects) {
    const links = [
      pr.repo_url ? { _key: 'lnk-repo', _type: 'link', url: pr.repo_url } : null,
      pr.demo_url ? { _key: 'lnk-demo', _type: 'link', url: pr.demo_url, caption: 'Live' } : null,
    ].filter(Boolean)

    tx.createOrReplace({
      _id: entryId(pr._id),
      _type: 'entry',
      type: 'project',
      title: pr.title,
      slug: { _type: 'slug', current: cleanSlug(pr.slug?.current) },
      // projects had no publish date — use the end of the build window, then start
      publishedAt: pr.duration?.end || pr.duration?.start || pr._createdAt,
      ...(blocksToSummary(pr.blurb) ? { summary: blocksToSummary(pr.blurb) } : {}),
      ...(links.length ? { links } : {}),
      ...(pr.description ? { body: pr.description } : {}),
      ...(Array.isArray(pr.tags) ? { tags: pr.tags } : {}),
    })
  }

  const res = await tx.commit()
  console.log(`Created/updated ${res.results.length} entry documents (${posts.length} essays, ${projects.length} projects).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
