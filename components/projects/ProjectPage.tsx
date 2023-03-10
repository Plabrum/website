import { PortableText } from "@portabletext/react";
import SanityImage from "components/general/SanityImage";
import Link from "next/link";
import { ProjectType } from "schemas/schema_types";
import Technologies from "./Technologies";
import Title from "./Title";

export default function ProjectPage({ project }: { project: ProjectType }) {
  const {
    _id,
    title,
    tags,
    coverImage,
    description,
    duration,
    repo_url,
    demo_url,
    technologies,
  } = project;

  const startTime = duration?.start ? new Date(duration.start) : "now";
  const endTime = duration?.end ? new Date(duration.end) : "now";

  const startString: string = startTime.toLocaleString("en-us", {
    year: "numeric",
    month: "short",
  });
  const endString: string = endTime.toLocaleString("en-us", {
    year: "numeric",
    month: "short",
  });

  return (
    <div className="w-screen  flex flex-col sm:space-y-20 space-y-14 items-center">
      {/* Title box */}
      <Title
        title={title}
        date_string={startString + " - " + endString}
        tags={tags.map((tag) => tag.name)}
        className="lg:mt-40 mt-20"
      />
      <SanityImage
        width={1000}
        className="sm:w-5/6 w-full"
        alt={title + " cover image"}
        sanitySrc={coverImage}
      />
      <Technologies technologies={technologies} />
      <div className="flex flex-col sm:w-3/4 bg-custom-bg3 sm:space-y-10 space-y-6 sm:py-16 md:px-8 px-3 py-10 ">
        {/* <p>test</p> */}
        <h1 className="sm:text-2xl text-xl text-center mx-5 font-bold tracking-widest font-mono">
          Project Writeup
        </h1>
        <div className="lg:w-3/4 mx-auto">
          <PortableText value={description} />
        </div>
      </div>
    </div>
  );
}
