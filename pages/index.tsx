import groq from "groq";
import { client } from "../lib/sanity.client";
import { AboutType, ExperienceType, ProjectType } from "schemas/schema_types";
import About from "../components/homepage/About";
import Contact from "../components/homepage/Contact";
import Header from "../components/homepage/header/Header";
import Hero from "../components/homepage/Hero";
import Projects from "../components/homepage/projects/Projects";
import Experiences from "../components/homepage/experience/Experiences";
import { useRef } from "react";
import { useIntersectionObserver } from "lib/Intersection";
import Section from "components/homepage/Section";
import Footer from "components/homepage/Footer";
import Head from "next/head";
import { useTheme } from "next-themes";

type Props = {
  abouts: AboutType[];
  projects: ProjectType[];
  experiences: ExperienceType[];
};

export default function Index({ abouts, projects, experiences }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const showNav = useIntersectionObserver(heroRef);
  const { resolvedTheme } = useTheme();
  const about = abouts[0];
  return (
    <div
      className="flex flex-col h-screen overflow-y-scroll scroll-smooth "
      // snap-y snap-proximity  scrollbar-hide
    >
      <Head>
        <meta
          name="theme-color"
          content={resolvedTheme === "dark" ? "#1b1a1a" : "#ffffff"}
        />
        <title>{"Phil Labrum | Software Engineering Portfolio"}</title>
        <meta name="description" content={about.meta_description} />
      </Head>
      {/* Header */}
      <Header showNav={showNav} homepage={true} />

      {/* Hero */}
      <Section
        idName="hero"
        className="min-h-screen flex flex-col items-center"
      >
        <div ref={heroRef} className="my-auto">
          <Hero about={about} />
        </div>
      </Section>

      {/* About */}
      <Section
        idName="about"
        titleName="About"
        className=" flex flex-col items-center sm:py-40 py-20"
      >
        <About about={about} />
      </Section>

      <Section idName="experience" titleName="Experience" className="">
        <Experiences experiences={experiences} />
      </Section>

      <Section idName="projects" titleName="Highlighted Projects" className="">
        <Projects projects={projects} />
      </Section>

      {/* Contact Me */}
      <Section idName="contact" titleName="Contact" className="min-h-[700px]">
        <Contact />
      </Section>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const abouts: AboutType = await client.fetch(
    groq`
  *[_type == "about" && !(_id in path('drafts.**'))]{
    _id,
    name,
    job_title,
    taglines,
    hero_photo,
    about_photo,
    desc_title,
    description,
    }`
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

  return {
    props: {
      abouts,
      projects,
      experiences,
    },
  };
}
