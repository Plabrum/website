import { CustomPortableText } from 'components/general/CustomPortableText'
import { ProjectType } from 'schemas/schema_types'
import ProjectTechnologies from './ProjectTechnologies'
import ProjectHero from './ProjectHero'
import ProjectDemoButton from './ProjectDemoButton'

export default function ProjectPage({ project }: { project: ProjectType }) {
  if (project == null) {
    throw Error('unable to load project')
  }
  const { description, technologies, demo_url } = project

  return (
    <div className=" w-screen min-h-screen flex flex-col sm:space-y-14 space-y-8 items-center  pt-20">
      {/* Hero box */}
      <ProjectHero project={project} />
      {/* tech row */}
      {technologies && <ProjectTechnologies technologies={technologies} />}
      {/* Article */}
      <div className="flex flex-row items-center justify-center">
        {demo_url && <ProjectDemoButton url={demo_url} text="View Full Demo" />}
      </div>
      <div className="flex flex-col max-w-[600px] sm:py-16  px-4 py-4 ">
        <CustomPortableText value={description} />
      </div>
    </div>
  )
}
