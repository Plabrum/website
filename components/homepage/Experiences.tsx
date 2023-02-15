import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { ExperienceType } from "schemas/schema_types";

type Props = {
  experiences: ExperienceType[];
};

export default function Experiences({ experiences }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="h-screen flex relative overflow-hidden flex-col text-lft md:flex-row max-w-full px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Experience
      </h3>

      <div className="w-full mt-20 flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory">
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </motion.div>
  );
}
