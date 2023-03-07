import React from "react";
import Link from "next/link";
import SanityImage from "components/general/SanityImage";
import { ProjectType, TechnologyType } from "schemas/schema_types";
import {
  FaChevronCircleRight,
  FaChevronRight,
  FaGithub,
  FaHammer,
} from "react-icons/fa";
import { PortableText, toPlainText } from "@portabletext/react";

interface Props {
  className?: string;
  project: ProjectType;
}
export default function ProjectCardNew({ project, className }: Props) {
  const {
    title,
    slug,
    coverImage,
    thumbnailImage,
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

  // const capped_tech = technologies.slice(0, 4);

  // Create actual card
  return (
    <div
      className={`grid md:grid-cols-2 grid-cols-1 ${className}`}
      //
    >
      <div className="flex flex-col col-span-1 justify-evenly pl-3 py-2 ">
        <div className="max-sm:flex max-sm:flex-row sm:mt-4 justify-between ">
          <div>
            <h1 className="sm:text-4xl text-3xl font-bold text-custom-t1">
              {title}
            </h1>
            <h2 className="text-custom-t2 text-sm mt-1">{datestring}</h2>
          </div>
          <div className="sm:hidden h-full aspect-square mr-4  relative">
            (
            <SanityImage
              alt={"project thumbnail"}
              sanitySrc={thumbnailImage}
              // height={500}
              // width={2000}
              fill={true}
              sizes="(max-width: 400px) 50vw,
              (max-width: 1200px) 50vw,
              33vw"
              className=" object-cover rounded-md"
            />
            )
          </div>
        </div>

        <div className="max-sm:grow flex items-center ">
          <p className="text-ellipsis">{overview}</p>
          {/* <p className="grow-0">{plaintext}</p> */}
        </div>

        <Link
          className="self-center flex flex-row h-8 px-4 rounded-full bg-custom-t2 text-custom-t3 items-center"
          href={slug || ""}
        >
          <p className="text-xs uppercase tracking-widest">View Project</p>
          <FaChevronRight className="ml-3 w-2 " />
        </Link>
        <div className="max-md:hidden flex flew-row gap-2 h-8  justify-start overflow-auto">
          {technologies.map(
            (tech, index) =>
              tech && (
                <div
                  className="flex rounded-md bg-custom-bg3 items-center whitespace-nowrap"
                  key={index}
                >
                  <p className="px-4 text-custom-t3 text-sm ">{tech.name}</p>
                </div>
              )
          )}
        </div>
      </div>
      {/* <div className=" max-sm:hidden  col-span-1 md:p-4 border border-green-500"> */}
      <div className="max-md:hidden flex flex-col justify-center items-center relative m-4 aspect-square">
        <SanityImage
          alt={"project thumbnail"}
          sanitySrc={coverImage}
          // height={1000}
          // width={2000}
          fill={true}
          sizes="(max-width: 400px) 50vw,
              (max-width: 1200px) 50vw,
              33vw"
          className="object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
