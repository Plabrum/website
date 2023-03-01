import Link from "next/link";
import groq from "groq";
import { client } from "../lib/sanity.client";
import SanityImage from "components/general/SanityImage";
import { PortableText } from "@portabletext/react";
import { AboutType, ExperienceType, ProjectType } from "schemas/schema_types";
import About from "../components/homepage/About";
import Contact from "../components/homepage/Contact";
import Header from "../components/homepage/header/Header";
import Hero from "../components/homepage/Hero";
import Projects from "../components/homepage/projects/Projects";
// import Skills from "../components/homepage/Skills";
import Experiences from "../components/homepage/experience/Experiences";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "lib/Intersection";
import Section from "components/homepage/Section";
import Footer from "components/homepage/Footer";

type Props = {
  abouts: AboutType[];
  projects: ProjectType[];
  experiences: ExperienceType[];
};

export default function Index({ abouts, projects, experiences }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const showNav = useIntersectionObserver(heroRef);

  return (
    <div className="snap-y snap-proximity h-screen overflow-y-scroll scrollbar-diss scroll-smooth">
      {/* Header */}
      <Header showNav={showNav} />

      {/* Hero */}
      <Section idName="hero">
        <div ref={heroRef} className="my-auto">
          <Hero abouts={abouts} />
        </div>
      </Section>

      {/* About */}
      <Section idName="about" titleName="About">
        <About abouts={abouts} />
      </Section>

      <Section
        idName="experience"
        titleName="Experience"
        className="snap-center flex flex-col "
      >
        <Experiences experiences={experiences} />
      </Section>

      <Section idName="projects" titleName="Projects">
        <Projects projects={projects} />
      </Section>

      {/* Contact Me */}
      <Section idName="contact" titleName="Contact">
        <Contact />
      </Section>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const abouts: AboutType[] = await client.fetch(
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
  *[_type == "project" && !(_id in path('drafts.**'))]{
    _id,
    title,
    'slug': slug.current,
    coverImage,
    overview,
    duration,
    repo_url,
    demo_url,
    }
    | order(duration.start asc)`);

  const experiences: ExperienceType[] = await client.fetch(groq`
  *[_type == "experience" && !(_id in path('drafts.**'))]{
    _id,
    role,
    overview,
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
