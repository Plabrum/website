import SanityImage from 'components/general/SanityImage';
import Link from 'next/link';
import { TechnologyType } from 'schemas/schema_types';

type Props = {
  technologies: TechnologyType[];
};

export default function ProjectTechnologies({ technologies }: Props) {
  return (
    <div className="w-screen">
      <h1 className="sm:text-2xl text-xl text-center font-bold tracking-widest font-mono">Technology Used</h1>
      <div className="grid grid-rows-2 sm:grid-cols-4 grid-cols-3 gap-y-2 mt-8 lg:w-1/2 w-3/4 mx-auto justify-between ">
        {technologies.map((tech, index) => (
          <Link
            key={index}
            className="group flex flex-col space-y-2 "
            title={tech.description || ''}
            href={tech.tech_page}
          >
            <SanityImage
              height={100}
              width={100}
              sanitySrc={tech.logo_image}
              className="h-10 object-contain filter sm:grayscale group-hover:grayscale-0 w-auto"
              alt={tech.name}
            />
            <h1 className="h-8 text-sm font-mono font-medium text-custom-t4 group-hover:text-custom-t2 text-center">
              {tech.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
