import Link from "next/link";
import groq from "groq";
import { client } from "../lib/sanity.client";
import SanityImage from "components/SanityImage";
import { PortableText } from "@portabletext/react";
// import type { Image as SanImage, PortableTextBlock } from "sanity";
import { ProjectType } from "schemas/schema_types";
import About from "../components/About";
import Contact from "../components/Contact";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import WorkExperience from "../components/WorkExperience";

function Index({ projects }: { projects: ProjectType[] }) {
  return (
    <div
      className="
    bg-[rgb(36,36,36)] text-white h-screen 
    snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 "
    >
      {/* Header */}
      <Header />
      {/* Hero */}
      <section id="hero" className="snap-start">
        <Hero />
      </section>
      {/* About */}
      <section id="about" className="snap-center">
        <About />
      </section>
      {/* Experiences */}
      <section id="experience" className="snap-center">
        <WorkExperience />
      </section>
      {/* Skills */}
      <section id="skills" className="snap-center">
        <Skills />
      </section>

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
  return {
    props: {
      projects,
    },
  };
}

export default Index;
