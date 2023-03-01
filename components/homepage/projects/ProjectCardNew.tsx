import React from "react";
import Link from "next/link";
import SanityImage from "components/general/SanityImage";
import { PortableText } from "@portabletext/react";
import { ProjectType } from "schemas/schema_types";
import {
  FaChevronCircleRight,
  FaChevronRight,
  FaGithub,
  FaHammer,
} from "react-icons/fa";
interface ProjectCardProp {
  project: ProjectType | null;
}
export default function ProjectCardNew({ project }: { project: ProjectType }) {
  const {
    title,
    slug,
    coverImage,
    overview,
    duration,
    repo_url,
    demo_url,
    technologies,
  } = project;

  const startMo = duration?.start ? new Date(duration.start) : "now";

  const datestring: string = startMo.toLocaleString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  // Create actual card
  console.log("tech", technologies);
  return (
    <div className="grow grid md:grid-cols-2 grid-cols-1  lg:w-[600px] lg:h-[300px] md:w-[400px] md:h-[200px] w-[360px] h-[180px]">
      <div className="flex flex-col col-span-1   p-2 ">
        <div className=" sm:mt-8 mt-2">
          <h1 className="sm:text-4xl text-3xl font-bold text-custom-t1">
            {title}
          </h1>
        </div>
        {/* <div className="border border-orange-500">
          <p>date start - date end</p>
        </div> */}
        <div className="text-custom-t2 text-sm items-end">
          <h2>{datestring}</h2>
        </div>

        <div className="grow sm:my-8 m-2">{overview}</div>

        <Link
          className="self-center flex flex-row h-8 px-4 sm:mb-8 mb-2 rounded-full bg-custom-t2 text-custom-t3 items-center"
          href={slug || ""}
        >
          <p className="text-xs uppercase tracking-widest">View Project</p>
          <FaChevronRight className="ml-3 w-2 " />
        </Link>
        {technologies && (
          <div className=" flex flew-row gap-4 ">
            {technologies.map((tech, index) => (
              <p
                className="rounded-md bg-custom-bg3 px-4 py-1 text-custom-t3 text-sm"
                key={index}
              >
                {tech.name}
              </p>
            ))}
          </div>
        )}
      </div>
      {/* <div className=" max-sm:hidden  col-span-1 md:p-4 border border-green-500"> */}
      <div className="max-md:hidden flex flex-col justify-center items-center relative m-4">
        <SanityImage
          alt={"project thumbnail"}
          sanitySrc={coverImage}
          // height={1000}
          // width={2000}
          fill={true}
          className="object-cover rounded-3xl"
        />
      </div>
    </div>
  );
}
