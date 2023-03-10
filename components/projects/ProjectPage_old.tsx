import { PortableText } from "@portabletext/react";
import SanityImage from "components/general/SanityImage";
import Link from "next/link";
import { ProjectType } from "schemas/schema_types";

export default function ProjectPage({ project }: { project: ProjectType }) {
  const {
    _id,
    title,
    coverImage,
    meta_description,
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
    <div className="sm:mt-40 mt-20 flex-grow px-4 md:px-16 lg:px-32">
      <div className="w-5/6 lg:w-3/5 mb-8 ">
        {/* Title */}
        <div className="text-3xl font-bold tracking-tight md:text-5xl text-custom-t1">
          {title}
        </div>
        {/* Description */}
        <div className="mt-4 font-serif text-xl text-custom-t2 md:text-2xl">
          {meta_description}
        </div>
      </div>
      <div className="mb-20 space-y-6">
        {/* Header */}

        <div className="rounded-md border border-custom-t2 overflow-hidden">
          {/* Image  */}
          <SanityImage
            sanitySrc={coverImage}
            alt={"coverimage"}
            className="`w-full object-cover overflow-hidden rounded-[3px] object-top max-h-[600px]"
            width={3500}
            height={2000}
          />

          <div className="border-custom-t2 divide-inherit grid grid-cols-1 divide-y lg:grid-cols-4 lg:divide-y-0 lg:divide-x">
            {/* Duration */}
            {
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Duration</div>
                <div className="text-md md:text-lg">{`${startString} -  ${endString}`}</div>
              </div>
            }

            {/* Client */}
            {repo_url && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Code Repository</div>
                <Link
                  target="_blank"
                  className="text-md break-words md:text-lg"
                  href={repo_url}
                >
                  {repo_url}
                </Link>
              </div>
            )}

            {/* Site */}

            <div className="p-3 lg:p-4">
              <div className="text-xs md:text-sm">Demo</div>
              {demo_url && (
                <Link
                  target="_blank"
                  className="text-md break-words md:text-lg"
                  href={demo_url}
                >
                  {demo_url}
                </Link>
              )}
            </div>

            {/* Tags */}
            <div className="p-3 lg:p-4">
              <div className="text-xs md:text-sm">Tags</div>
              <div className="text-md flex flex-row flex-wrap md:text-lg">
                {technologies?.map((tech, key) => (
                  <div key={key} className="mr-1 break-words ">
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="font-serif max-w-3xl text-xl text-custom-t1">
            <PortableText value={description} />
          </div>
        )}
      </div>
    </div>
  );
}
