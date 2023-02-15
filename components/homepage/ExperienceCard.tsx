import React from "react";
import { motion } from "framer-motion";

type Props = {};

function ExperienceCard({}: Props) {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden">
      <motion.img
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center"
        src="https://the-cs.org/static/media/TCS-logo.6487b75be624f930573f.png"
      />
      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">Lead Course Developer</h4>
        <p className="font-bold text-2xl mt-1">The Coding School</p>
        <div className="flex space-x-2 my-4">
          <img
            className="h-10 rounded-full"
            src="https://logos-world.net/wp-content/uploads/2021/10/Python-Symbol.png"
          />
          <img
            className="h-10 rounded-full"
            src="https://logos-world.net/wp-content/uploads/2021/10/Python-Symbol.png"
          />
          <img
            className="h-10 rounded-full"
            src="https://logos-world.net/wp-content/uploads/2021/10/Python-Symbol.png"
          />
        </div>
      </div>
      <p>Started work .... - Ended</p>
      <ul className="list-disc space-y-4 ml-5 text-lg">
        <li>Summary Points Summary Points Summary Points Summary Points </li>
        <li>Summary Points Summary Points Summary Points Summary Points </li>
        <li>Summary Points Summary Points Summary Points Summary Points </li>
        <li>Summary Points Summary Points Summary Points Summary Points </li>
      </ul>
    </article>
  );
}

export default ExperienceCard;
