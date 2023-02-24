import { motion, Variants } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import SocialRow from "./SocialRow";

type Props = {};
const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

// function MobileMenu() {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className="absolute  border w-[150px] h-[300px]">
//       <div className="backdrop-blur-lg">
//         <ul>
//           <li>Hi</li>
//           <li>hello</li>
//           <li>bonjour</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

function MobileMenu({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const icon_size = "lg:h-7 lg:w-7 h-6 w-6";
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="sm:hidden text-custom-t2"
    >
      <motion.button
        className="flex items-center my-auto"
        whileTap={{ scale: 0.97 }}
        variants={{
          open: { rotate: 180 },
          closed: { rotate: 0 },
        }}
        transition={{ duration: 0.2 }}
        style={{ originY: 0.55 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaChevronDown className={`text-custom-t2  ${icon_size}`} />
      </motion.button>

      <motion.ul
        className="rounded-2xl absolute backdrop-blur-md text-custom-t1"
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.li className="py-2 pt-8 px-6 w-48" variants={itemVariants}>
          <SocialRow className="text-custom-t1" />
        </motion.li>

        <motion.li className="py-2  px-6" variants={itemVariants}>
          <Link href="/#about">
            <button className=" text-md uppercase tracking-widest ">
              About
            </button>
          </Link>
        </motion.li>

        <motion.li className="py-2 px-6" variants={itemVariants}>
          <Link href="/#experience">
            <button className="text-s  uppercase tracking-widest">
              Experience
            </button>
          </Link>
        </motion.li>

        <motion.li className="py-2 px-6 pb-8" variants={itemVariants}>
          <Link href="/#projects">
            <button className="text-s  uppercase tracking-widest ">
              Projects
            </button>
          </Link>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
}

export default MobileMenu;
