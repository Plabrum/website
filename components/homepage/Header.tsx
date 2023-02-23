import React, { useEffect, useRef, useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaChevronDown,
} from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import ThemeSwitch from "components/general/ThemeSwitch";

type Props = { showNav: boolean };

// Adding mobile menu: https://codesandbox.io/s/framer-motion-variants-rj7ks0?from-embed=&file=/src/App.tsx
const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function Header({ showNav }: Props) {
  function log() {
    console.log("showNav", showNav);
  }

  const [isOpen, setIsOpen] = useState(false);
  const navbutton_style = `text-2xs px-4 py-1 lg:text-xs lg:px-6 lg:py-2 border border-custom-t2 rounded-full 
                            uppercase text-xs tracking-widest 
                            text-custom-t2 transition-all hover:bg-custom-t2 hover:text-custom-t3`;
  const icon_size = `lg:h-7 lg:w-7 h-6 w-6`;

  return (
    <header
      className={`fixed top-0 z-20 w-screen grid md:grid-cols-3 grid-cols-2 sm:p-4 p-3 items-center 
      backdrop-blur-sm ${showNav ? "backdrop-blur-lg transition-500" : ""}`}
    >
      {/* <h1>
        This is the header and shouldnt move at all,{" "}
        {showNav ? "Showing nav" : "not showing nav"}
      </h1> */}
      <motion.div
        className="justify-self-start"
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
      >
        {/* DESKTOP */}
        {/* Social Icons */}
        <div className="max-sm:hidden flex flex-row items-center lg:gap-x-6 gap-x-3 ml-4  ">
          <Link href="https://www.linkedin.com/in/phil-labrum-profile/">
            <FaLinkedin className={`text-custom-t2 ${icon_size}`} />
          </Link>
          <Link href="https://www.linkedin.com/in/phil-labrum-profile/">
            <FaGithub className={`text-custom-t2 ${icon_size}`} />
          </Link>
          <Link href="https://www.linkedin.com/in/phil-labrum-profile/">
            <FaEnvelope className={`text-custom-t2 ${icon_size}`} />
          </Link>
        </div>
        {/* MOBILE */}

        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className="sm:hidden text-custom-t2"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaChevronDown className={`text-custom-t2 ${icon_size}`} />
          </motion.button>

          <motion.ul
            className="absolute"
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
            <motion.li className=" py-2 pt-8 px-6 w-48" variants={itemVariants}>
              <div className="flex flex-row item-center lg:gap-x-6 gap-x-3 ">
                <Link href="https://www.linkedin.com/in/phil-labrum-profile/">
                  <FaLinkedin className={`text-custom-t2 h-8 w-8`} />
                </Link>
                <Link href="https://www.linkedin.com/in/phil-labrum-profile/">
                  <FaGithub className={`text-custom-t2 h-8 w-8`} />
                </Link>
                <Link href="/#contact">
                  <FaEnvelope className={`text-custom-t2 h-8 w-8`} />
                </Link>
              </div>
            </motion.li>
            <motion.li className="py-2  px-6" variants={itemVariants}>
              <Link href="/#about">
                <button className=" text-md uppercase tracking-widest text-custom-t2">
                  About
                </button>
              </Link>
            </motion.li>
            <motion.li className="py-2 px-6" variants={itemVariants}>
              <Link href="/#experience">
                <button className="text-s  uppercase tracking-widest text-custom-t2">
                  Experience
                </button>
              </Link>
            </motion.li>
            <motion.li className="py-2 px-6 pb-8" variants={itemVariants}>
              <Link href="/#projects">
                <button className="text-s  uppercase tracking-widest text-custom-t2">
                  Projects
                </button>
              </Link>
            </motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-row max-md:hidden lg:gap-x-4 md:gap-x-2 gap-x-3 justify-self-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showNav ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
        }}
      >
        <Link href="/#about">
          <button className={navbutton_style}>About</button>
        </Link>
        <Link href="/#experience">
          <button className={navbutton_style}>Experience</button>
        </Link>
        <Link href="/#projects">
          <button className={navbutton_style}>Projects</button>
        </Link>
        <Link href="/#contact">
          <button className={navbutton_style}>Contact</button>
        </Link>
      </motion.div>

      <motion.div
        className="flex shrink mr-4 items-center cursor-pointer justify-self-end"
        initial={{
          x: 500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
      >
        {/* <button
          onClick={log}
          className="mx-4 border border-black rounded-full px-2 text-sm uppercase tracking-wide"
        >
          debug
        </button> */}
        <ThemeSwitch className={icon_size} />
      </motion.div>
    </header>
  );
}
