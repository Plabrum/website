import { XMarkIcon } from "@heroicons/react/24/solid";
import ThemeSwitch from "components/general/ThemeSwitch";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import SocialRow from "./SocialRow";
import { Toggle } from "./Toggle";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    // transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: -20 },
  //     transition: { duration: 0.2 } },
};

export default function MobileMenu({ homepage }: { homepage: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!isOpen) return;
    function handleClick(event: any) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [isOpen]);

  const icon_size = "lg:h-7 lg:w-7 h-6 w-6";
  return (
    <motion.div
      ref={mobileMenuRef}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className=" "
    >
      <motion.ul
        className="absolute top-0 left-0 rounded-br-2xl  pl-8 py-4 w-56 backdrop-blur-md text-custom-t1"
        variants={{
          open: {
            visibility: "visible",
          },
          closed: {
            visibility: "hidden",
          },
        }}
      >
        <motion.li
          className="pr-4"
          variants={itemVariants}
          onClick={() => setIsOpen(false)}
        >
          <div className="flex flex-row justify-end">
            <ThemeSwitch className={icon_size + ""} />
          </div>
        </motion.li>

        <motion.li
          className="py-2 px-6 "
          variants={itemVariants}
          onClick={() => setIsOpen(false)}
        >
          <SocialRow className="text-custom-t1" />
        </motion.li>
        {!homepage && (
          <motion.li
            className="py-2 px-6 "
            variants={itemVariants}
            onClick={() => setIsOpen(false)}
          >
            <Link href="/">
              <button className=" text-md uppercase tracking-widest ">
                Home
              </button>
            </Link>
          </motion.li>
        )}
        <motion.li
          className="py-2  px-6"
          variants={itemVariants}
          onClick={() => setIsOpen(false)}
        >
          <Link href="/#about">
            <button className=" text-md uppercase tracking-widest ">
              About
            </button>
          </Link>
        </motion.li>

        <motion.li
          className="py-2 px-6"
          variants={itemVariants}
          onClick={() => setIsOpen(false)}
        >
          <Link href="/#experience">
            <button className="text-s  uppercase tracking-widest">
              Experience
            </button>
          </Link>
        </motion.li>

        <motion.li
          className="py-2 px-6"
          variants={itemVariants}
          onClick={() => setIsOpen(false)}
        >
          <Link href={homepage ? "/#projects" : "/projects"}>
            <button className="text-s  uppercase tracking-widest ">
              {homepage ? "Projects" : "All Projects"}
            </button>
          </Link>
        </motion.li>
        <motion.li
          className="py-2 px-6"
          variants={itemVariants}
          onClick={() => setIsOpen(false)}
        >
          <Link href="/#contact">
            <button className="text-s  uppercase tracking-widest ">
              Contact
            </button>
          </Link>
        </motion.li>
      </motion.ul>

      <div
        className={
          "absolute top-0 left-0 pt-4 pl-4 pr-4 pb-1 rounded-br-xl" +
          (!isOpen && " backdrop-blur-md")
        }
      >
        <Toggle
          toggle={() => setIsOpen((isOpen) => !isOpen)}
          className="stroke-custom-t2 "
        />
      </div>
    </motion.div>
  );
}
