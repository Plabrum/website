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
    blurb,
    duration,
    repo_url,
    demo_url,
    technologies,
    tags,
  } = project;
  const router = useRouter();

  const startMo = duration?.start ? new Date(duration.start) : "now";

  const datestring: string = startMo.toLocaleString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Force tailwind to cache all the colors:
  const colors = [
    "bg-fuchsia-500",
    "bg-orange-500",
    "bg-rose-500",
    "bg-lime-500",
    "bg-teal-500",
    "bg-sky-500",
    "bg-yellow-500",
  ];
  function assign_color(tag: TagType) {
    if (tag.color !== undefined) {
      const index = tag.color % colors.length;
      return colors[index];
    } else {
      return "bg-gray-500";
    }
  }

  return (
    <div
      className={`grid md:grid-cols-2 grid-cols-1 group relative  ${className}`}
    >
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

        <Link
          className="self-center md:hidden flex flex-row h-8 px-4 mt-2 rounded-full bg-custom-bg2 items-center text-custom-t3"
          href={{ pathname: slug, query: { name: router.asPath } }}
        >
          <p className=" text-xs uppercase tracking-widest">View Project</p>
          <FaChevronRight className="ml-3 w-2 " />
        </Link>
      </div>
      <div className="max-md:hidden flex flex-col justify-center items-center relative aspect-square object-fit mb-3">
        <SanityImage
          alt={"project thumbnail"}
          sanitySrc={coverImage}
          // height={1000}
          // width={2000}
          fill={true}
          // sizes="(max-width: 400px) 50vw,
          //     (max-width: 1200px) 50vw,
          //     33vw"
          className="object-cover rounded-xl"
        />
      </div>
      <div className="col-span-2 max-md:hidden mx-2 flex flew-row gap-2 h-8 justify-start overflow-auto">
        {tags.slice(0, 3).map(
          (tag, index) =>
            tag && (
              <div
                className={
                  "flex rounded-md items-center whitespace-nowrap " +
                  assign_color(tag)
                }
                key={index}
              >
                <p className="px-4 text-custom-t3 text-sm ">{tag.name}</p>
              </div>
            )
        )}
      </div>
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
