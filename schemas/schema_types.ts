import type { Image, PortableTextBlock } from "sanity";

export interface projectType {
  _id: string;
  title: string;
  _createdAt: string;
  slug: string;
  overview: PortableTextBlock[];
  coverImage: Image;
  duration?: {
    start?: string;
    end?: string;
  };
  description?: PortableTextBlock[];
  repo_url?: string;
  demo_url?: string;
  technologies?: technologyType[];
}

export interface technologyType {
  _id?: string;
  name: string;
  description?: string;
  logo_image: Image;
  tech_page: string;
}
