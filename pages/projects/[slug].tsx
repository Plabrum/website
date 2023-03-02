import Header from "components/homepage/header/Header";
import ProjectPage from "components/projects/ProjectPage";
import { client } from "lib/sanity.client";
import { GetStaticProps } from "next";
import { groq } from "next-sanity";
import { ProjectType } from "schemas/schema_types";

export default function ProjectSlugRoute({
  project,
}: {
  project: ProjectType;
}) {
  return (
    <div>
      <Header />
      <ProjectPage project={project} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params = {} } = ctx;
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
    { slug: "/projects/" + params.slug }
  );
  return {
    props: {
      project,
    },
  };
};

export const getStaticPaths = async () => {
  const paths: string[] = await client.fetch(groq`
*[_type == "project" && slug.current != null].slug.current
`);
  const full_paths = paths || [];
  return {
    paths: paths,
    fallback: false,
  };
};
