"use client";
import { AboutType, ExperienceType, ProjectType } from "schemas/schema_types";
import About from "./About";
import Contact from "./Contact";
import HeaderComponent from "./header/Header";
import Hero from "./Hero";
import Projects from "./projects/Projects";
import Experiences from "./experience/Experiences";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "lib/Intersection";
import Section from "components/homepage/Section";
import Footer from "components/homepage/Footer";
import { useTheme } from "next-themes";

type Props = {
  abouts: AboutType[];
  projects: ProjectType[];
  experiences: ExperienceType[];
};

export default function HomePage({ abouts, projects, experiences }: Props) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const showNav = useIntersectionObserver(heroRef);
  const { resolvedTheme } = useTheme();
  const about = abouts[0];
  return (
    <div className="flex flex-col h-screen overflow-y-scroll scroll-smooth bg-custom-bg1">
      {/* Header */}
      <HeaderComponent showNav={showNav} homepage={true} />

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
