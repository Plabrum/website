import { ProjectType } from "schemas/schema_types";

import ProjectCard from "./ProjectCard";
import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";

export default function Projects({ projects }: { projects: ProjectType[] }) {
  // const curtailed_project = projects.slice(0, 3);
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex flex-col ">
        {projects.map((project, index) => (
          <div key={index}>
            <ProjectCard
              project={project}
              className="2xl:w-[800px] lg:w-[650px] md:w-[600px] max-sm:min-h-[220px] my-2 mx-6"
            />
            {index < projects.length - 1 && (
              <div className="bg-custom-t4 h-px mx-8 rounded-full" />
            )}
          </div>
        ))}
      </div>

      <Link
        className="mt-8 flex flex-row h-16 px-16 w-1/4 min-w-fit rounded-full bg-custom-accent text-custom-t3 
        items-center justify-center"
        href={"/projects"}
      >
        <p className="text-md text-custom-t3 uppercase tracking-widest ">
          See All Projects
        </p>
        <FaChevronRight className="ml-3 w-2 " />
      </Link>
    </div>
  );
}
