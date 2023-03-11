import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import SanityImage from "components/general/SanityImage";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ProjectType } from "schemas/schema_types";
import ProjectButtons from "./ProjectButtons";
import ProjectTitle from "./ProjectTitle";

export default function ProjectHero({ project }: { project: ProjectType }) {
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
  const router = useRouter();
  const from_slug = router.query["name"];
  var from_homepage = false;
  if (from_slug instanceof String || typeof from_slug === "string") {
    from_homepage = from_slug.split("#")[0] === "/";
  }
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
    <div>
      <ProjectTitle
        title={title}
        date_string={startString + " - " + endString}
        className="sm:mt-16 mt-4"
      />

      <ProjectButtons
        from_homepage={from_homepage}
        demo_url={demo_url}
        repo_url={repo_url}
        className="sm:mb-10"
      />

      <div className="2xl:w-1/2 lg:w-3/4 mx-auto flex flex-row justify-center lg:space-x-10 space-x-4 mt-10">
        {tags.map((tag, index) => {
          return (
            <div
              className="tracking-widest lowercase sm:text-sm text-xs text-custom-t4 whitespace-nowrap text-center"
              key={index}
            >
              {"#" + tag.name}
            </div>
          );
        })}
      </div>
      <SanityImage
        width={2000}
        className="2xl:w-1/2 lg:w-3/4 object-cover mx-auto"
        alt={title + " cover image"}
        sanitySrc={coverImage}
      />
    </div>
  );
}
