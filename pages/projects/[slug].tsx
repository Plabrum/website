import { PortableText, toPlainText } from "@portabletext/react";
import SanityImage from "components/general/SanityImage";
import TechLogo from "components/general/TechLogo";
import { client } from "lib/sanity.client";
import { GetStaticProps } from "next";
import { groq } from "next-sanity";
import Head from "next/head";
import Link from "next/link";
import { ProjectType } from "schemas/schema_types";

export default function ProjectSlugRoute(project: ProjectType) {
  const {
    _id,
    title,
    coverImage,
    overview,
    description,
    repo_url,
    demo_url,
    technologies,
  } = project;

  const overview_plaintext: string = overview ? toPlainText(overview) : "";
  return (
    <div key={_id}>
      <Head>
        {
          <meta
            key="description"
            name="description"
            content={overview_plaintext}
          />
        }
      </Head>

      <h2>{title}</h2>
      <SanityImage
        sanitySrc={coverImage}
        width={200}
        height={200}
        alt="cover image"
      />
      <PortableText value={overview} />
      {description && <PortableText value={description} />}
      {technologies &&
        technologies.map(({ _id, name, logo_image, tech_page }) => {
          return (
            <div key={_id}>
              <TechLogo
                name={name}
                logo_image={logo_image}
                tech_page={tech_page}
              />
            </div>
          );
        })}

      {repo_url && <Link href={repo_url}>Repo URL</Link>}

      {demo_url && <Link href={demo_url}>Demo URL</Link>}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params = {} } = ctx;

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
    { slug: params.slug }
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
  const full_paths = paths?.map((slug) => "/projects/" + slug) || [];

  return {
    paths: full_paths,
    fallback: false,
  };
};

// pages/projects/[slug].js

// Generates `/projects/1` and `/projects/2`
// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { slug: "1" } }, { params: { slug: "2" } }],
//     fallback: false, // can also be true or 'blocking'
//   };
// }

// // `getStaticPaths` requires using `getStaticProps`
// export async function getStaticProps(context) {
//   return {
//     // Passed to the page component as props
//     props: { post: {} },
//   };
// }

// export default function Project({ post }) {
//   <h1>Post page</h1>;
//   // Render post...
// }
