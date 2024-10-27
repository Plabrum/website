import React from 'react'
import { motion } from 'framer-motion'
import { ExperienceType } from 'schemas/schema_types'
import ExperienceCard from './ExperienceCard'

type Props = {
  experiences: ExperienceType[];
};

export default function Experiences({ experiences }: Props) {
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        // duration: 1,
        delayChildren: 0.4,
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 0 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="flex w-full justify-center my-auto ">
      <motion.div
        viewport={{ once: true }}
        className="mt-4 grid sm:w-3/4 mr-4 grid-cols-1"
        variants={container}
        initial="hidden"
        whileInView="show"
      >
        {experiences?.map((experience, index) => (
          <motion.li className="list-none" variants={item} key={index}>
            <ExperienceCard isLast={experiences.length - 1 === index} experience={experience} />
          </motion.li>
        ))}
      </motion.div>
    </div>
  )
}
