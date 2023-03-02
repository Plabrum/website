import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { ExperienceType } from "schemas/schema_types";

type Props = {
  experiences: ExperienceType[];
};

export default function Experiences({ experiences }: Props) {
  return (
    <div className="flex w-full justify-center my-auto ">
      <div className="mt-4 grid sm:w-3/4 mr-4 grid-cols-1 ">
        {experiences?.map((experience, index) => {
          return (
            <ExperienceCard
              key={index}
              isLast={experiences.length - 1 === index}
              experience={experience}
            />
          );
        })}
      </div>
    </div>
  );
}
