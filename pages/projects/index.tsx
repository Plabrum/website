import Header from "components/homepage/header/Header";
import ProjectCardNew from "components/homepage/projects/ProjectCardNew";
import { client } from "lib/sanity.client";
import { GetStaticProps } from "next";
import { groq } from "next-sanity";
import React from "react";
import { ProjectType } from "schemas/schema_types";
import { FaSearch } from "react-icons/fa";

type Props = { projects: ProjectType[] };
type Inputs = {
  keywords: string;
};

export default function Index({ projects }: Props) {
  return (
    <div className="min-h-screen mb-20">
      <Header />
      {/* <div className="h-40">hello</div> */}

      <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 mt-20 2xl:mx-16 md:mx-20 sm:mx-8 mx-2 2xl:gap-x-8 gap-x-2">
        {/* <div className="2xl:col-span-3 xl:col-span-2 col-span-1 mx-auto w-1/2 h-10 flex flex-row border-4 border-custom-t2 rounded-full ">
          <input
            placeholder="Enter keywords, technolgies, title..."
            className="px-3 appearance-none  outline-none bg-transparent w-full"
          />
          <FaSearch className="w-4 h-4 text-custom-t2 mr-3 my-auto" />
        </div> */}
        {projects.map((project, index) => (
          <div key={index}>
            <ProjectCardNew
              project={project}
              className=" max-sm:min-h-[220px]  my-4"
            />
            {index < projects.length - 1 && (
              <div className="bg-custom-t4 h-px mx-8 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects: ProjectType[] = await client.fetch(groq`
  *[_type == "project" && !(_id in path('drafts.**'))]{
    _id,
    title,
    'slug': slug.current,
    coverImage,
    thumbnailImage,
    blurb,
    duration,
    repo_url,
    demo_url,
    "tags":tags[]->{_id, name, color},
    "technologies":technologies[]->{_id, name, tech_page, logo_image},
    }
    | order(duration.start asc)`);

  return {
    props: {
      projects,
    },
  };
};
