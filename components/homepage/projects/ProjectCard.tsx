import React from "react";
import Link from "next/link";
import SanityImage from "components/general/SanityImage";
import { ProjectType, TagType, TechnologyType } from "schemas/schema_types";
import {
  FaChevronCircleRight,
  FaChevronRight,
  FaGithub,
  FaHammer,
} from "react-icons/fa";
import { PortableText, toPlainText } from "@portabletext/react";
import { useRouter } from "next/router";
import TagRow from "./TagRow";

interface Props {
  className?: string;
  project: ProjectType;
}
export default function ProjectCard({ project, className }: Props) {
  const { title, slug, coverImage, blurb, duration, tags } = project;
  const router = useRouter();

  const startMo = duration?.start ? new Date(duration.start) : "now";

  const datestring: string = startMo.toLocaleString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Force tailwind to keep all the colors:

  return (
    <div
      className={`grid md:grid-cols-2 grid-cols-1 group relative  ${className}`}
    >
      {/* On Mobile show image above description */}
      <Link
        className="sm:hidden"
        href={{ pathname: slug, query: { name: router.asPath } }}
      >
        <SanityImage
          alt={"project thumbnail"}
          sanitySrc={coverImage}
          height={1000}
          className=" w-full aspect-[5/4] object-cover mt-2 "
        />
      </Link>

      {/* Text Area */}
      <div className="flex flex-col col-span-1 pl-3 py-2 ">
        <div className="max-sm:flex max-sm:flex-row sm:mt-4 justify-between ">
          <div>
            <h1 className="xl:text-3xl lg:text-2xl text-3xl font-bold text-custom-t1 ">
              {title}
            </h1>
            <h2 className="text-custom-t2 text-sm mt-1">{datestring}</h2>
          </div>
        </div>

        <div className="aspect-[3/2]  overflow-auto  my-auto">
          <PortableText value={blurb} />
        </div>

        {/* On Mobile Add a see more button */}
        <Link
          className="self-center md:hidden flex flex-row h-8 px-4 mt-2 rounded-full bg-custom-bg2 items-center text-custom-t3"
          href={{ pathname: slug, query: { name: router.asPath } }}
        >
          <p className=" text-xs uppercase tracking-widest">View Project</p>
          <FaChevronRight className="ml-3 w-2 " />
        </Link>
      </div>

      {/* Desktop Square photo */}
      <div className="max-md:hidden flex flex-col justify-center items-center relative aspect-square object-fit mb-3">
        <SanityImage
          alt={"project thumbnail"}
          sanitySrc={coverImage}
          // height={1000}
          // width={2000}
          fill={true}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              50vw"
          className="object-cover rounded-xl"
        />
      </div>
      {/* Desktop Tag Row */}
      <TagRow tags={tags} />
      <div className="md:group-hover:block hidden group-hover:backdrop-blur-md group-hover:bg-black/20 absolute w-full h-full ">
        <Link
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row h-20 w-1/2 rounded-full bg-custom-accent text-custom-t3 items-center justify-center"
          href={{ pathname: slug, query: { name: router.asPath } }}
        >
          <p className="text-md uppercase tracking-widest ">View Project</p>
          <FaChevronRight className="ml-3 w-2 " />
        </Link>
      </div>
    </div>
  );
}
