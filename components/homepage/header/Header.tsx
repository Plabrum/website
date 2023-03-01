import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import ThemeSwitch from "components/general/ThemeSwitch";
import SocialRow from "./SocialRow";
import MobileMenu from "./MobileMenu";
import CentralTabs from "./CentralTabs";
import Head from "next/head";

type Props = { showNav: boolean; homepage?: boolean };

// Adding mobile menu: https://codesandbox.io/s/framer-motion-variants-rj7ks0?from-embed=&file=/src/App.tsx

export default function Header({ showNav, homepage = true }: Props) {
  const { systemTheme } = useTheme();

  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    const breakpoint = 1000;
    if (window.innerWidth > breakpoint) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > breakpoint) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const navbutton_style = `text-2xs px-4 py-1 lg:text-xs lg:px-6 lg:py-2 border border-custom-t2 rounded-full 
                            uppercase text-xs tracking-widest 
                            text-custom-t2 transition-all hover:bg-custom-t2 hover:text-custom-t3`;
  const icon_size = "lg:h-7 lg:w-7 h-6 w-6";
  if (isDesktop) {
    return (
      <header
        className={`fixed top-0 z-20 w-screen grid md:grid-cols-3 grid-cols-2 sm:p-4 p-3 items-center 
       ${showNav ? " sm:backdrop-blur-lg transition-500" : ""}`}
      >
        <Head>
          <link
            id="favicon"
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={
              systemTheme === "dark"
                ? "/favicon_dark/favicon-32x32.png"
                : "/favicon-32x32.png"
            }
          />
          <link
            id="favicon"
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={
              systemTheme === "dark"
                ? "/favicon_dark/favicon-16x16.png"
                : "/favicon-16x16.png"
            }
          />
          <link
            id="favicon"
            rel="apple-touch-icon"
            href={
              systemTheme === "dark"
                ? "/favicon_dark/apple-touch-icon.png"
                : "/apple-touch-icon.png"
            }
          />
          <link
            id="favicon"
            rel="icon"
            type="image/png"
            sizes="192x192"
            href={
              systemTheme === "dark"
                ? "/favicon_dark/android-chrome-192x192.png"
                : "/android-chrome-192x192.png"
            }
          />
          <link
            id="favicon"
            rel="icon"
            type="image/png"
            sizes="192x192"
            href={
              systemTheme === "dark"
                ? "/favicon_dark/android-chrome-512x512.png"
                : "/android-chrome-512x512.png"
            }
          />
        </Head>

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
          <SocialRow className=" ml-4 text-custom-t2 " />
          {/* <MobileMenu /> */}
        </motion.div>
        <motion.div
          className="max-md:hidden flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showNav ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
          }}
        >
          <CentralTabs homepage={homepage} />
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
          <ThemeSwitch className={icon_size} />
        </motion.div>
      </header>
    );
  } else {
    return (
      <header className={`fixed top-0 z-20 items-center`}>
        <motion.div
          className=""
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
          <MobileMenu homepage={homepage} />
        </motion.div>
      </header>
    );
  }
}
