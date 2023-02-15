import React from "react";
import { motion } from "framer-motion";
import { ProjectType } from "schemas/schema_types";

type Props = {
  projects: ProjectType[];
};

function Projects({ projects }: Props) {
  // const projects = [1, 2, 3, 4, 5];
  return (
    <div className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0">
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>
      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 mt-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="w-screen flex-shrink-0 snap-center-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen"
          >
            <motion.img
              initial={{
                y: -300,
                opacity: 0,
              }}
              transition={{
                duration: 1.2,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              viewport={{ once: true }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgsvsoz_3LMuPGAlVl_o0RY3qtXIBSdTyjag&usqp=CAU"
            />
            <div className="space-y-10 px-0 md:px-10 max-w-6xl">
              <h4 className="text-4xl font-semibold text-center">{`Case Study ${
                index + 1
              } of ${projects.length}: Coding thing..`}</h4>
              <p className="text-lg text-center md:text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full absolute top-[30%] bg-[#7FAB0A]/10 left-0 h-[500px] -skew-y-12"></div>
    </div>
  );
}

export default Projects;

// {projects.length > 0 &&
//   projects.map(({ _id, title, slug, coverImage, overview }) => {
//     return (
//       <div key={_id}>
//         <Link href={"/projects/" + slug}>
//           <h2>{title}</h2>
//           <SanityImage
//             sanitySrc={coverImage}
//             width={200}
//             height={200}
//             alt="cover image"
//           />
//         </Link>
//         <PortableText value={overview} />
//       </div>
//     );
//   })}
