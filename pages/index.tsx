import Link from "next/link";
import groq from "groq";
import { client } from "../lib/sanity.client";
import SanityImage from "components/general/SanityImage";
import { PortableText } from "@portabletext/react";
import { AboutType, ExperienceType, ProjectType } from "schemas/schema_types";
import About from "../components/homepage/About";
import Contact from "../components/homepage/Contact";
import Header from "../components/homepage/Header";
import Hero from "../components/homepage/Hero";
import Projects from "../components/homepage/Projects";
import Skills from "../components/homepage/Skills";
import Experiences from "../components/homepage/Experiences";

type Props = {
  abouts: AboutType[];
  projects: ProjectType[];
  experiences: ExperienceType[];
};

function Index({ abouts, projects, experiences }: Props) {
  // const about: AboutType = abouts[0];
  // console.log("about", about);
  return (
    <div
      className="
    bg-custom-bg1 text-custom-t1  h-screen 
    snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 "
    >
      {/* Header */}
      <Header />
      {/* Hero */}
      <section id="hero" className="snap-start">
        <Hero abouts={abouts} />
      </section>
      {/* About */}
      <section id="about" className="snap-center">
        <About abouts={abouts} />
      </section>
      {/* Experiences */}
      {/* <section id="experience" className="snap-center">
        <Experiences experiences={experiences} />
      </section> */}
      {/* Skills */}
      {/* <section id="skills" className="snap-center">
        <Skills />
      </section> */}

      <section id="projects" className="snap-center">
        <Projects projects={projects} />
      </section>

      {/* Contact Me */}
      <section id="contact" className="snap-center">
        <Contact />
      </section>
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
  console.log("abouts", abouts);
  // console.log("tags", about.taglines);
  const projects: ProjectType[] = await client.fetch(groq`
  *[_type == "project" && !(_id in path('drafts.**'))]{
    _id,
    title,
    'slug': slug.current,
    coverImage,
    overview,
    duration
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
    }
    | order(duration.start asc)`);

  return {
    props: {
      abouts,
      projects,
      experiences,
    },
  };
}

export default Index;
