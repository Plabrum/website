import Header from "components/homepage/header/Header";
import ProjectCardNew from "components/homepage/projects/ProjectCardNew";
import { client } from "lib/sanity.client";
import { GetStaticProps } from "next";
import { groq } from "next-sanity";
import React from "react";
import { ProjectType } from "schemas/schema_types";

type Props = { projects: ProjectType[] };

export default function index({ projects }: Props) {
  return (
    <div className="min-h-screen mb-20">
      <Header />
      {/* <div className="h-40">hello</div> */}
      <div className="flex items-center justify-center">
        <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-8 mt-20 ">
          {projects.map((project, index) => (
            <div key={index}>
              <ProjectCardNew project={project} className=" " />
              {index < projects.length - 1 && (
                <div className="bg-custom-t4 h-px mx-8 rounded-full" />
              )}
            </div>
          ))}
        </div>
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
    overview,
    duration,
    repo_url,
    demo_url,
    "technologies":technologies[]->{_id, name, tech_page, logo_image},
    }
    | order(duration.start asc)`);

  return {
    props: {
      projects,
    },
  };
};
