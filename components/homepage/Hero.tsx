import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import SanityImage from "../general/SanityImage";
// import type { Image as SanImage } from "sanity";
import { AboutType } from "schemas/schema_types";

// export interface Props {
//   name: string;
//   job_title: string;
//   taglines: string[];
//   hero_photo: SanImage;
// }

export default function Hero({ abouts }: { abouts: AboutType[] }) {
  const { hero_photo, job_title, taglines, name } = abouts[0];
  const [text, count] = useTypewriter({
    words: taglines,
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div
      className="h-screen flex flex-col space-y-8 justify-center 
    text-center overflow-hidden"
    >
      <BackgroundCircles />
      {/* <img
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
        src="https://media.licdn.com/dms/image/C4D03AQElvWX47eE8tQ/profile-displayphoto-shrink_200_200/0/1518124128261?e=1676505600&v=beta&t=EKrhBUJL6FzrhGPzGg4SS_-FXVm03EB1RF2aYmMJrOE"
        alt=""
      /> */}
      <SanityImage
        sanitySrc={hero_photo}
        alt="hero photo"
        width={50}
        height={50}
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
      />
      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
          {name}
        </h2>
        <h1 className="text-5xl lg:text-6xl font-semibold px-10">
          <span className="mr-3">
            {text}
            <Cursor cursorColor="#F7AB0A" />
          </span>
        </h1>
        <div className="pt-5">
          <Link href="/#about">
            <button className="heroButton">About</button>
          </Link>
          {/* <Link href="/#skills">
            <button className="heroButton">Skills</button>
          </Link> */}
          <Link href="/#experience">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="/#projects">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
