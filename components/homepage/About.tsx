import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import React from "react";
import { AboutType } from "schemas/schema_types";
import SanityImage from "../general/SanityImage";
// import type { Image as SanImage } from "sanity";

// interface Props {
//   about_photo: SanImage;
//   desc_title: string;
//   description: string;
// }

function About({ abouts }: { abouts: AboutType[] }) {
  const { about_photo, desc_title, description } = abouts[0];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 5 }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row
     max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>
      <motion.div
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        className="-mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-64 xl:w-[300px] xl:h-[300px]"
      >
        <SanityImage
          sanitySrc={about_photo}
          alt="About section photo"
          width={300}
          height={300}
        />
      </motion.div>
      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">{desc_title}</h4>
        <PortableText value={description} />
      </div>
    </motion.div>
  );
}

export default About;
