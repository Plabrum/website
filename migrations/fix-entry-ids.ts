/**
 * Repair: the unify migration created entries with ids like `entry.<uuid>`.
 * The `.` makes Sanity treat the id as a namespaced (draft-like) document that
 * is invisible to public/published reads — so the live site saw zero entries.
 * Recreate each with a dot-free id (`entry.` -> `entry-`) and delete the originals.
 *
 * Run: npx sanity exec migrations/fix-entry-ids.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

async function run() {
  const entries = await client.fetch(`*[_type=="entry"]`)
  const dotted = entries.filter((e: { _id: string }) => e._id.startsWith('entry.'))

  if (dotted.length === 0) {
    console.log('No dotted entry ids found — nothing to repair.')
    return
  }

  const tx = client.transaction()
  for (const e of dotted) {
    const newId = e._id.replace(/^entry\./, 'entry-')
    const { _id, _rev, _createdAt, _updatedAt, ...fields } = e
    tx.createOrReplace({ _id: newId, ...fields })
    tx.delete(_id)
  }

  const res = await tx.commit()
  console.log(`Repaired ${dotted.length} entries (recreated dot-free + deleted dotted). ${res.results.length} mutations.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
