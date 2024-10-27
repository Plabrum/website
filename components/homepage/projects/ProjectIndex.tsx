'use client'

import HeaderComponent from 'components/homepage/header/Header'
import ProjectCard from 'components/homepage/projects/ProjectCard'
import { Suspense } from 'react'
import { ProjectType } from 'schemas/schema_types'

type Props = { projects: ProjectType[] };

export default function ProjectIndex({ projects }: Props) {
  return (
    <Suspense>
      <div className="min-h-screen mb-20">
        <HeaderComponent />

        <div className="grid lg:grid-cols-2 grid-cols-1 mt-20 2xl:mx-16 md:mx-20 sm:mx-8 mx-2 2xl:gap-x-8 gap-x-2">
          {projects.map((project, index) => (
            <div key={index}>
              <ProjectCard project={project} className=" max-sm:min-h-[220px]  my-4" />
              {index < projects.length - 1 && <div className="bg-custom-t4 h-px mx-8 rounded-full" />}
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  )
}
