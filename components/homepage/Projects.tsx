import React from "react";
import { motion } from "framer-motion";
import { ProjectType } from "schemas/schema_types";

import ProjectCard from "./ProjectCard";

type Props = {
  projects: ProjectType[];
};

export default function Projects({ projects }: Props) {
  // const projects = [1, 2, 3, 4, 5];
  return (
    <div
      className=" mt-6 grid sm:grid-rows-2 sm:grid-flow-col  mx-auto
      border border-blue-500
      sm:w-[83vw] w-5/6 h-3/4 gap-6 overflow-x-scroll scrollbar-hide "
    >
      {projects.map(
        ({
          _id,
          title,
          slug,
          coverImage,
          overview,
          duration,
          repo_url,
          demo_url,
        }) => (
          <div key={_id} className="sm:w-[40vw]">
            <ProjectCard
              title={title}
              slug={slug}
              coverImage={coverImage}
              overview={overview}
              duration={duration}
              repo_url={repo_url}
              demo_url={demo_url}
            />
          </div>
        )
      )}
    </div>
  );
}

//   className="sm:w-5/6 sm:h-3/4 w-full h-5/6 mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8
//  border-2 border-blue-500 "
