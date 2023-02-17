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
    // <motion.div
    //   initial={{ opacity: 0 }}
    //   whileInView={{ opacity: 1 }}
    //   transition={{ duration: 1 }}
    //   className="flex flex-col relative h-screen text-center md:text-left md:flex-row
    //  max-w-7xl px-10 justify-evenly mx-auto items-center"
    // >
    <div
      className="flex flex-col relative h-screen md:text-left md:flex-row
     max-w-7xl mx-auto items-center text-center 
     "
    >
      <h3 className="absolute sm:left-0 sm:right-0 md:top-24 top-16  text-center mx-auto uppercase tracking-[20px] text-custom-t2 text-2xl">
        About
      </h3>

      <motion.div
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        className="flex-shrink-0 mt-28"
      >
        <SanityImage
          sanitySrc={about_photo}
          alt="About section photo"
          width={200}
          height={200}
          className=" w-56h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-64 xl:w-[300px] xl:h-[300px]"
        />
      </motion.div>
      <div className="md:space-y-10 md:px-10 px-6">
        <h4 className="text-4xl font-semibold max-md:my-8">{desc_title}</h4>
        <PortableText value={description} />
      </div>
      {/* </motion.div> */}
    </div>
  );
}

export default About;
