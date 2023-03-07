import { ProjectType } from "schemas/schema_types";

import ProjectCardNew from "./ProjectCardNew";
import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";

export default function Projects({ projects }: { projects: ProjectType[] }) {
  // const curtailed_project = projects.slice(0, 3);
  return (
    <div className="flex flex-col items-center justify-center">
      <Link
        className="self-center flex flex-row h-8 px-4 sm:my-8 my-4 rounded-full bg-custom-t2 text-custom-t3 items-center"
        href={"/projects"}
      >
        <p className="text-xs uppercase tracking-widest">See All Projects</p>
        <FaChevronRight className="ml-3 w-2 " />
      </Link>
      <div className="flex flex-col ">
        {projects.map((project, index) => (
          <div key={index}>
            <ProjectCardNew
              project={project}
              className="lg:w-[800px] md:w-[700px] w-[360px] max-sm:h-[200px] my-2"
            />
            {index < projects.length - 1 && (
              <div className="bg-custom-t4 h-px mx-8 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
