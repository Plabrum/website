import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function CentralTabs({
  className,
  homepage,
}: {
  className?: string;
  homepage: boolean;
}) {
  const navbutton_style = `text-2xs px-4 px-auto py-1 lg:text-xs lg:px-6 lg:py-2 border border-custom-t2 rounded-full 
                            uppercase text-xs tracking-widest 
                            text-custom-t2 transition-all hover:bg-custom-t2 hover:text-custom-t3`;
  return (
    <div className={"flex gap-4 " + className}>
      {!homepage && (
        <Link href="/">
          <button className={navbutton_style}>Home</button>
        </Link>
      )}

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
    </div>
  );
}

export default CentralTabs;
