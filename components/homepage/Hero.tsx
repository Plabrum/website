import Link from 'next/link';
import { AboutType } from 'schemas/schema_types';
import { FaChevronDown } from 'react-icons/fa';
import SanityImage from '../general/SanityImage';
import CentralTabs from './header/CentralTabs';

export default function Hero({ about }: { about: AboutType }) {
  const { hero_photo, job_title, name } = about;
  return (
    <div className="flex flex-col space-y-2 text-center justify-center items-center px-4">
      <SanityImage
        sanitySrc={hero_photo}
        alt="hero photo"
        width={200}
        height={200}
        className="relative rounded-full h-32 w-32 object-cover"
      />

      <h2 className="text-sm font-title uppercase text-custom-t2 pb-2 tracking-[15px]">{job_title}</h2>
      <h1 className="text-5xl lg:text-6xl font-semibold px-10">
        <span className="mr-3">
          {name}
          {/* {text}
            <Cursor cursorColor="#F7AB0A" /> */}
        </span>
      </h1>

      <CentralTabs className="max-sm:hidden pt-4 " homepage />
      <Link href="/#about" className="md:hidden pt-8">
        <FaChevronDown className="md:hidden h-8 w-16 animate-pulse duration-30 text-custom-t2" />
      </Link>
    </div>
  );
}
