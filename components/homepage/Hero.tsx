import Image from "next/image";
import Link from "next/link";
import React, { RefObject } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import SanityImage from "../general/SanityImage";
// import type { Image as SanImage } from "sanity";
import { AboutType } from "schemas/schema_types";
import CentralTabs from "./header/CentralTabs";

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
    <div className="flex flex-col space-y-2 text-center justify-center items-center px-4">
      {/* <BackgroundCircles /> */}
      {/* <img
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
        src="https://media.licdn.com/dms/image/C4D03AQElvWX47eE8tQ/profile-displayphoto-shrink_200_200/0/1518124128261?e=1676505600&v=beta&t=EKrhBUJL6FzrhGPzGg4SS_-FXVm03EB1RF2aYmMJrOE"
        alt=""
      /> */}
      <SanityImage
        sanitySrc={hero_photo}
        alt="hero photo"
        width={200}
        height={200}
        className="relative rounded-full h-32 w-32 object-cover"
      />

      <h2 className="text-sm uppercase text-custom-t2 pb-2 tracking-[15px]">
        {job_title}
      </h2>
      <h1 className="text-5xl lg:text-6xl font-semibold px-10">
        <span className="mr-3">
          {name}
          {/* {text}
            <Cursor cursorColor="#F7AB0A" /> */}
        </span>
      </h1>

      <CentralTabs className="max-sm:hidden " />
    </div>
  );
}
