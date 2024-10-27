import ProjectIndex from 'components/homepage/projects/ProjectIndex'
import { client } from 'lib/sanity.client'
import { groq } from 'next-sanity'
import { ProjectType } from 'schemas/schema_types'

export default async function Page() {
  const projects: ProjectType[] = await client.fetch(groq`
        *[_type == "project" && !(_id in path('drafts.**'))]{
          _id,
          title,
          'slug': slug.current,
          coverImage,
          thumbnailImage,
          blurb,
          duration,
          repo_url,
          demo_url,
          "tags":tags[]->{_id, name, color}
          }
          | order(duration.start asc)`)
  return <ProjectIndex projects={projects} />
}
