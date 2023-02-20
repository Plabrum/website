import type { Image, PortableTextBlock } from "sanity";

export interface ProjectType {
  _id?: string;
  title: string;
  _createdAt?: string;
  slug: string;
  overview: PortableTextBlock[];
  coverImage: Image;
  duration?: {
    start?: string;
    end?: string;
  };
  description?: PortableTextBlock[];
  repo_url: string;
  demo_url: string;
  technologies?: TechnologyType[];
}

export interface TechnologyType {
  _id?: string;
  name: string;
  description?: string;
  logo_image: Image;
  tech_page: string;
}

export interface AboutType {
  _id: string;
  name: string;
  job_title: string;
  taglines: string[];
  hero_photo: Image;
  about_photo: Image;
  desc_title: string;
  description: PortableTextBlock[];
}

export interface HeroType {
  name: string;
  job_title: string;
  taglines: string[];
  hero_photo: Image;
}

export interface ExperienceType {
  _id: string;
  role?: string;
  overview?: PortableTextBlock[];
  duration?: {
    start?: string;
    end?: string;
  };
  description?: PortableTextBlock[];
  technologies?: TechnologyType[];
}
