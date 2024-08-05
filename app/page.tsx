// Import your Client Component
import { groq } from 'next-sanity';
import { AboutType, ExperienceType, ProjectType } from 'schemas/schema_types';
import { client } from 'lib/sanity.client';
import HomePage from '../components/homepage/home-page';

export async function generateMetadata() {
  const abouts: AboutType[] = await client.fetch(
    groq`
  *[_type == "about" && !(_id in path('drafts.**'))]{
    _id,
    name,
    job_title,
    meta_description,
    taglines,
    hero_photo,
    about_photo,
    desc_title,
    description,
    }`,
  );
  const metaDescription = abouts[0]?.meta_description;

  return {
    title: 'Phil Labrum | Software Engineering Portfolio',
    // themeColor: resolvedTheme == "dark" ? "#1b1a1a" : "#f8f8f8",
    description: metaDescription,
  };
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const abouts: AboutType[] = await client.fetch(
    groq`
  *[_type == "about" && !(_id in path('drafts.**'))]{
    _id,
    name,
    job_title,
    meta_description,
    taglines,
    hero_photo,
    about_photo,
    desc_title,
    description,
    }`,
  );
  const projects: ProjectType[] = await client.fetch(groq`
  *[_type == "project" && !(_id in path('drafts.**')) && pin==true]{
    _id,
    title,
    'slug': slug.current,
    coverImage,
    thumbnailImage,
    blurb,
    duration,
    repo_url,
    demo_url,
    "tags":tags[]->{name, color},
    "technologies":technologies[]->{name, tech_page, logo_image},
    }
    | order(duration.start asc)`);

  const experiences: ExperienceType[] = await client.fetch(groq`
  *[_type == "experience" && !(_id in path('drafts.**'))]{
    _id,
    role,
    duration,
    description,
    technologies,
    company->{
        name,
        company_description,
        logo_image,
        company_page,
    },
  }
  | order(duration.start desc)`);

  // Forward fetched data to your Client Component
  return <HomePage abouts={abouts} projects={projects} experiences={experiences} />;
}
