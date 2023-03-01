import { PortableText } from "@portabletext/react";
import SanityImage from "components/general/SanityImage";
import { client } from "lib/sanity.client";
import { GetStaticProps } from "next";
import { groq } from "next-sanity";
import Link from "next/link";
import React from "react";
import { ProjectType } from "schemas/schema_types";

type Props = {};

function index({ project }: { project: ProjectType }) {
  const {
    _id,
    title,
    coverImage,
    overview,
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
    <div className="mt-20 flex-grow px-4 md:px-16 lg:px-32">
      <div className="w-5/6 lg:w-3/5 mb-8">
        {/* Title */}
        {title && (
          <div className="text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </div>
        )}
        {/* Description */}
        {overview && (
          <div className="mt-4 font-serif text-xl text-gray-600 md:text-2xl">
            {overview}
          </div>
        )}
      </div>
      <div className="mb-20 space-y-6">
        {/* Header */}
        {/* <Header title={title} description={overview} /> */}

        <div className="rounded-md border border-custom-t2 overflow-hidden">
          {/* Image  */}
          {/* <ImageBox
            image={coverImage}
            alt={`Cover image for ${title}`}
            classesWrapper="relative aspect-[16/9]"
          /> */}
          <SanityImage
            sanitySrc={coverImage}
            alt={"coverimage"}
            className="`w-full overflow-hidden rounded-[3px] "
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
            {client && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Client</div>
                <div className="text-md md:text-lg">N/A</div>
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
          <div className="font-serif max-w-3xl text-xl text-gray-600">
            <PortableText value={description} />
          </div>
        )}
        {/* Workaround: scroll to top on route change */}
        {/* <ScrollUp /> */}
      </div>
      <div className="absolute left-0 w-screen border-t" />
    </div>
  );
}

export default index;

export const getStaticProps: GetStaticProps = async (ctx) => {
  // console.log("ctx", ctx);
  const { params = {} } = ctx;
  // console.log("params.slug", params.slug);
  // const project = getProjectBySlug({ slug: params.slug });
  const project = await client.fetch(
    groq`
  *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      coverImage,
      overview,
      duration,
      description,
      repo_url,
      demo_url,
      "technologies":technologies[]->{_id, name, tech_page, logo_image},
    }`,
    { slug: "/projects/subway_status" }
  );
  // console.log("fetching projects", project);
  return {
    props: {
      project,
    },
  };
};
