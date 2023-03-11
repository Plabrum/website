import Footer from "components/homepage/Footer";
import Header from "components/homepage/header/Header";
import ProjectPage from "components/projects/ProjectPage";
import { client } from "lib/sanity.client";
import { GetStaticProps } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import { ProjectType } from "schemas/schema_types";

export default function ProjectSlugRoute({
  project,
}: {
  project: ProjectType;
}) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="h-screen w-screen items-center justify-center flex flex-col">
        <div className="flex flex-row space-x-8 ">
          <p className=" text-custom-t1 dont-bold text-lg uppercase tracking-[4px]">
            Loading
          </p>
          <FaSpinner className="mx-auto animate-spin w-6 h-6" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{"Projects - " + project.title}</title>
        <meta name="description" content={project.meta_description} />
      </Head>

      <Header />
      <ProjectPage project={project} />
      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params = {} } = ctx;
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
    "technologies":technologies[]->{ name, tech_page, logo_image},
  }`,
    { slug: "/projects/" + params.slug }
  );
  if (!project) {
    return {
      notFound: true,
    };
  }
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
    fallback: true,
  };
};
