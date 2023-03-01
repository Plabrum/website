import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ProjectType } from "schemas/schema_types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import ProjectCardNew from "./ProjectCardNew";

export default function Projects({ projects }: { projects: ProjectType[] }) {
  const curtailed_project = projects.slice(0, 3);
  return (
    <div className="flex flex-col w-full h-full items-center justify-center ">
      <div className="hidden  my-4 border-4">See all Projects </div>
      <div className="flex flex-col gap-y-4  mt-8">
        {curtailed_project.map((project, index) => (
          <>
            <ProjectCardNew key={index} project={project} />
            {index < curtailed_project.length - 1 && (
              <div className="bg-custom-t4 h-1 mx-3 rounded-full" />
            )}
          </>
        ))}
      </div>
    </div>
  );
}
