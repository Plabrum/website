import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ProjectType } from "schemas/schema_types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import ProjectCard from "./ProjectCard";

import DesktopProjects from "./DesktopProjects";

type Props = {
  projects: Array<ProjectType | null>;
};

export default function Projects({ projects }: Props) {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    const breakpoint = 1000;
    if (window.innerWidth > breakpoint) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > breakpoint) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  if (isDesktop) {
    return (
      <div className="h-full min-h-[750px]">
        <DesktopProjects projects={projects} />
      </div>
    );
  } else {
    return (
      <div
        className=" mt-6 grid mx-auto w-5/6 h-3/4 gap-6  overflow-y-scroll scrollbar-hide 
      "
      >
        {projects.map((value, index) => (
          <div key={index} className="">
            <ProjectCard project={value} />
          </div>
        ))}
      </div>
    );
  }
}

//Proj grid
{
  /* <div
  key={index}
  className="grid grid-cols-2 gap-8 border  border-green-500"
>
  {value.map((val, ind) => {
    return (
      <div key={ind} className="">
        
        <ProjectCard project={val} />
      </div>
    );
  })}
</div> */
}

//   className="sm:w-5/6 sm:h-3/4 w-full h-5/6 mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8
//  border-2 border-blue-500 "
