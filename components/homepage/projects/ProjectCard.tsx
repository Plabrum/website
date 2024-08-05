'use client';

import React from 'react';
import Link from 'next/link';
import SanityImage from 'components/general/SanityImage';
import { ProjectType } from 'schemas/schema_types';
import { FaChevronRight } from 'react-icons/fa';
import { PortableText } from '@portabletext/react';
import { usePathname } from 'next/navigation';
import TagRow from './TagRow';

interface Props {
  className?: string;
  project: ProjectType;
}
export default function ProjectCard({ project, className }: Props) {
  const { title, slug, coverImage, blurb, duration, tags } = project;
  const pathname = usePathname();

  const startMo = duration?.start ? new Date(duration.start) : 'now';

  const datestring: string = startMo.toLocaleString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Force tailwind to keep all the colors:

  return (
    <div className={`grid md:grid-cols-2 grid-cols-1 max-md:max-w-[400px] group relative  ${className}`}>
      {/* On Mobile show image above description */}
      <Link className="md:hidden" href={{ pathname: slug, query: { name: pathname } }}>
        <SanityImage
          alt="project thumbnail"
          sanitySrc={coverImage}
          height={1000}
          className=" w-full md:hidden aspect-[5/3] object-cover mt-2 "
        />
      </Link>

      {/* Text Area */}
      <div className="flex flex-col col-span-1 pl-3 py-2 ">
        <div className="max-sm:flex max-sm:flex-row sm:mt-4 justify-between ">
          <div>
            <h1 className="xl:text-3xl lg:text-2xl text-3xl font-bold text-custom-t1 ">{title}</h1>
            <h2 className="text-custom-t4 text-sm mt-1">{datestring}</h2>
          </div>
        </div>

        <div className="pr-2  my-auto">
          <PortableText value={blurb} />
        </div>

        {/* On Mobile Add a see more button */}
        <Link
          className="self-center md:hidden flex flex-row h-10 w-full justify-center rounded-full mt-2  bg-custom-bg2 items-center text-custom-t3"
          href={{ pathname: slug, query: { previous: pathname } }}
        >
          <p className=" text-xs uppercase tracking-widest">See More</p>
          <FaChevronRight className="ml-3 w-2 " />
        </Link>
      </div>

      {/* Desktop Square photo */}
      <div className="max-md:hidden flex flex-col justify-center items-center relative aspect-square object-fit mb-3">
        <SanityImage
          alt="project thumbnail"
          sanitySrc={coverImage}
          // height={1000}
          // width={2000}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              50vw"
          className="object-cover rounded-xl"
        />
      </div>
      {/* Desktop Tag Row */}
      {tags && <TagRow tags={tags} />}
      <div className="max-md:hidden md:group-hover:opacity-100 md:group-hover:scale-105 opacity-0 transition duration-300 ease-in-out group-hover:backdrop-blur-md group-hover:bg-black/20 absolute w-full h-full ">
        <Link
          className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row h-20 w-1/2 rounded-full bg-custom-accent text-custom-t3 items-center justify-center"
          href={{ pathname: slug, query: { previous: pathname } }}
          as={slug}
        >
          <p className="text-md uppercase tracking-widest ">View Project</p>
          <FaChevronRight className="ml-3 w-2 " />
        </Link>
      </div>
    </div>
  );
}
