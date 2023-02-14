import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";

type Props = {};

export default function Hero({}: Props) {
  const [text, count] = useTypewriter({
    words: ["Hi, My name is Phil", "nerdy_tag_line.tsx", "blah blah blah bruh"],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div
      className="h-screen flex flex-col space-y-8 justify-center 
    text-center overflow-hidden"
    >
      <BackgroundCircles />
      <img
        className="relative rounded-full h-32 w-32 mx-auto object-cover"
        src="https://media.licdn.com/dms/image/C4D03AQElvWX47eE8tQ/profile-displayphoto-shrink_200_200/0/1518124128261?e=1676505600&v=beta&t=EKrhBUJL6FzrhGPzGg4SS_-FXVm03EB1RF2aYmMJrOE"
        alt=""
      />
      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
          Software Engineer
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
          <Link href="/#skills">
            <button className="heroButton">Skills</button>
          </Link>
          <Link href="/#Experience">
            <button className="heroButton">Experience</button>
          </Link>
          <Link href="/#Projects">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
