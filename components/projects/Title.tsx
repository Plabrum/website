import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  date_string: string;
  tags: string[];
  from_homepage: boolean;
  className: string;
};

function Title({ title, date_string, tags, from_homepage, className }: Props) {
  return (
    <div
      className={`flex flex-col xl:w-5/6 w-full items-center justify-center space-y-3 relative ${className}`}
    >
      <Link
        className="max-lg:hidden absolute left-0 max-xl:ml-10 md:pl-2 flex flex-row items-center text-custom-bg2"
        href={from_homepage ? "/#projects" : "/"}
      >
        <ArrowLeftCircleIcon className="w-8 h-8" />
        <p className="text-center lg:w-full w-24">
          {from_homepage
            ? "Back to Highlighted Projects"
            : "Back to All Projects"}
        </p>
      </Link>
      <h1 className="md:text-5xl text-4xl text-custom-t1 font-medium ">
        {title}
      </h1>
      <h2 className="sm:text-md text-sm text-custom-t2">{date_string}</h2>
      <div className="grid grid-cols-2 grid-flow-rows sm:gap-4 gap-2  ">
        {tags.map((tag, index) => {
          return (
            <div
              className="tracking-widest lowercase sm:text-sm text-xs text-custom-t4 whitespace-nowrap text-center"
              key={index}
            >
              {"#" + tag}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Title;
