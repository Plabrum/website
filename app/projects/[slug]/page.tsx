import ProjectIndex from "components/projects/ProjectsIndex";
import { client } from "lib/sanity.client";
import { groq } from "next-sanity";
type ProjectPageServerProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: ProjectPageServerProps) {
  const project = await client.fetch(
    groq`
    *[_type == "project" && slug.current == $slug][0] {
        title,
        coverImage,
        "slug":slug.current,
        "pallete": coverImage.asset->metadata.palette,
        overview,
        duration,
        description,
        repo_url,
        demo_url,
        "tags":tags[]->{name},
        "technologies":technologies[]->{ name, tech_page, logo_image, description},
      }`,
    { slug: "/projects/" + params.slug }
  );
  return {
    title: `Projects - ${project.title}`,
    description: project.meta_description,
  };
}

export async function generateStaticParams() {
  const paths: string[] = await client.fetch(groq`
    *[_type == "project" && slug.current != null].slug.current
    `);
  return paths.map((slug) => {
    slug;
  });
}

export default async function Page({ params }: ProjectPageServerProps) {
  const project = await client.fetch(
    groq`
*[_type == "project" && slug.current == $slug][0] {
    title,
    coverImage,
    "slug":slug.current,
    "pallete": coverImage.asset->metadata.palette,
    overview,
    duration,
    description,
    repo_url,
    demo_url,
    "tags":tags[]->{name},
    "technologies":technologies[]->{ name, tech_page, logo_image, description},
  }`,
    { slug: "/projects/" + params.slug }
  );

  return <ProjectIndex project={project} />;
}
