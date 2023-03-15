import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { PortableText } from "@portabletext/react";
import { CustomPortableText } from "components/general/CustomPortableText";
import SanityImage from "components/general/SanityImage";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProjectType } from "schemas/schema_types";
import ProjectTechnologies from "./ProjectTechnologies";
import ProjectHero from "./ProjectHero";
import Title from "./ProjectTitle";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import ProjectDemoButton from "./ProjectDemoButton";

export default function ProjectPage({ project }: { project: ProjectType }) {
  const { description, technologies, demo_url } = project;

  return (
    <div className=" w-screen min-h-screen flex flex-col sm:space-y-14 space-y-8 items-center  pt-20">
      {/* Hero box */}
      <ProjectHero project={project} />
      {/* tech row */}
      {/* <ProjectTechnologies technologies={technologies} /> */}
      {/* Article */}
      <div className="flex flex-col max-w-[850px]  bg-custom-bg3 sm:space-y-10 space-y-6 sm:py-16 md:px-8 px-3 py-10 ">
        {/* <p>test</p> */}
        <h1 className="sm:text-2xl text-xl text-center mx-5 font-bold tracking-widest font-mono">
          Project Writeup
        </h1>
        <div className="flex flex-row items-center justify-center">
          {demo_url && (
            <ProjectDemoButton url={demo_url} text={"View Full Demo"} />
          )}
        </div>
        <div className="xl:w-5/6 mx-auto">
          <CustomPortableText value={description} />
        </div>
      </div>
    </div>
  );
}
