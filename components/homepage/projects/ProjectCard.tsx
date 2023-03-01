import React from "react";
import Link from "next/link";
import SanityImage from "components/general/SanityImage";
import { PortableText } from "@portabletext/react";
import { ProjectType } from "schemas/schema_types";
import { FaChevronCircleRight, FaGithub, FaHammer } from "react-icons/fa";
interface ProjectCardProp {
  project: ProjectType | null;
}
export default function ProjectCard({ project }: ProjectCardProp) {
  if (project) {
    const { title, slug, coverImage, overview, duration, repo_url, demo_url } =
      project;

    const startMo = duration?.start ? new Date(duration.start) : "now";

    const datestring: string = startMo.toLocaleString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    // Create actual card

    return (
      <div className="grid sm:grid-cols-3 grid-cols-4 bg-custom-bg2 sm:aspect-[2/1] aspect-[5/2] rounded-3xl overflow-hidden">
        <div className="relative col-span-1">
          <Link href={slug || "/"}>
            <SanityImage
              sanitySrc={coverImage}
              //   width={200}
              //   height={50}
              alt="cover image"
              className="object-cover object-top"
              fill={true}
            />
          </Link>
        </div>
        <div className="sm:col-span-2 col-span-3 grid grid-cols-1 w-5/6 sm:my-2 max-sm:h-full justify-self-center sm:self-center">
          {/* Title */}
          <Link className="max-sm:mt-4 self-start " href={slug || "/"}>
            <h1 className="sm:text-3xl text-xl">{title}</h1>
            <div className="max-sm:hidden flex flex-row text-custom-t4 text-sm">
              <h2>{datestring}</h2>
            </div>
          </Link>

          {/* Overview */}
          <div className="sm:text-lg sm:my-2 inline-block w-full max-sm:truncate">
            {overview}
          </div>

          {/* link tags */}
          <div className="max-sm:flex max-sm:flex-row self-end  mb-2">
            <div className="sm:hidden flex flex-row text-custom-t4 text-sm items-end">
              <h2>{datestring}</h2>
            </div>
            <div className="flex  flex-row sm:justify-between gap-x-2 ml-auto justify-self-end">
              <Link
                href={repo_url ? repo_url : ""}
                className="bg-custom-bg3 sm:rounded-md rounded-full sm:p-2 p-1 "
                title="Link to Code Repository"
              >
                <div className="flex flex-row">
                  <FaGithub className="text-custom-t3 sm:h-10 sm:w-10 w-8 h-8" />
                  <h3 className="max-md:hidden self-center px-2 uppercase tracking-[2px] text-custom-t3">
                    Code
                  </h3>
                </div>
              </Link>
              {demo_url && (
                <Link
                  href={demo_url}
                  className=" bg-custom-bg3 sm:rounded-md rounded-full sm:p-2 p-1 "
                  title="Link to Demo of project"
                >
                  <div className="flex flex-row">
                    <FaChevronCircleRight className="text-custom-t3 sm:h-10 sm:w-10 w-8 h-8" />
                    <h3 className="max-md:hidden  self-center px-2 uppercase tracking-[2px] text-custom-t3">
                      Demo
                    </h3>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="aspect-[2/1] "></div>;
    // Create a null card
  }
}

/* <Link href={"/projects/" + slug}>
<h3 className="text-4xl font-semibold text-center">{title}</h3>
<SanityImage
  sanitySrc={coverImage}
  width={200}
  height={200}
  alt="cover image"
  className="w-50 h-50"
/>
</Link>
<PortableText value={overview} /> */
