import Link from "next/link";
import groq from "groq";
import { client } from "../lib/sanity.client";
import SanityImage from "components/SanityImage";
import { PortableText } from "@portabletext/react";
// import type { Image as SanImage, PortableTextBlock } from "sanity";
import { projectType } from "schemas/schema_types";

function Index({ projects }: { projects: projectType[] }) {
  return (
    <div>
      <h1>Welcome to a blog!</h1>
      {projects.length > 0 &&
        projects.map(({ _id, title, slug, coverImage, overview }) => {
          return (
            <div key={_id}>
              <Link href={"/projects/" + slug}>
                <h2>{title}</h2>
                <SanityImage
                  sanitySrc={coverImage}
                  width={200}
                  height={200}
                  alt="cover image"
                />
              </Link>
              <PortableText value={overview} />
            </div>
          );
        })}
    </div>
  );
}

export async function getStaticProps() {
  const projects: projectType = await client.fetch(groq`
  *[_type == "project" && !(_id in path('drafts.**'))]{
    _id,
    title,
    'slug': slug.current,
    coverImage,
    overview,
    duration
    }
    | order(duration.start asc)`);
  return {
    props: {
      projects,
    },
  };
}

export default Index;
