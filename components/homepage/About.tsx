import { PortableText } from '@portabletext/react'
import { motion } from 'framer-motion'
import React from 'react'
import { AboutType } from 'schemas/schema_types'
import SanityImage from '../general/SanityImage'
// import type { Image as SanImage } from "sanity";

// interface Props {
//   about_photo: SanImage;
//   desc_title: string;
//   description: string;
// }

function About({ about }: { about: AboutType }) {
  const { about_photo, desc_title, description } = about
  return (
    <div className="grid grid-cols-1 my-auto md:grid-cols-3 relative md:w-5/6 md:text-left mx-auto text-center items-center overflow-hidden">
      {/* <h3 className="col-span-3 mt-20 uppercase tracking-[20px] text-custom-t2 text-2xl text-center ">
        About
      </h3> */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{ once: true }}
        className="flex-shrink-0 col-span-1 justify-self-center max-sm:mt-4 max-sm:hidden"
      >
        <SanityImage
          sanitySrc={about_photo}
          alt="About section photo"
          width={1000}
          height={1000}
          className=" w-48 h-48 rounded-full object-cover md:rounded-lg md:w-64 md:h-64 xl:w-[300px] xl:h-[300px]"
        />
      </motion.div>
      <div className="col-span-2 md:space-y-10 md:px-10 px-6 ">
        <h4 className="text-4xl font-semibold max-md:my-4">{desc_title}</h4>
        <div className="">
          <PortableText value={description} />
        </div>
      </div>
    </div>
  )
}

export default About
