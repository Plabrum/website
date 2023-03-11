import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { FaExternalLinkSquareAlt, FaGithub } from "react-icons/fa";

interface Props {
  from_homepage: boolean;
  repo_url?: string;
  demo_url?: string;
  className?: string;
}
export default function ProjectButtons({
  from_homepage,
  repo_url,
  demo_url,
  className,
}: Props) {
  return (
    <div
      className={`w-5/6 flex flex-row mx-auto lg:justify-between md:justify-end justify-center font-mono ${className}`}
    >
      <Link
        className="grow-0 flex flex-row max-lg:hidden items-center text-custom-bg2 "
        href={from_homepage ? "/#projects" : "/"}
      >
        <ArrowLeftCircleIcon className="w-10 h-10 m-2" />
        <p className="text-center lg:w-full w-24">
          {from_homepage ? "Highlighted Projects" : "All Projects"}
        </p>
      </Link>
      <div className="flex flex-col space-y-2">
        {demo_url && (
          <Link
            href={demo_url}
            className="grow-0 flex flex-row items-center text-custom-bg2"
          >
            <p className="text-center ">Demo</p>
            <FaExternalLinkSquareAlt className="sm:w-8 sm:h-8 ml-2 w-6 h-6" />
          </Link>
        )}
        {repo_url && (
          <Link
            href={repo_url}
            className="grow-0 flex flex-row items-center text-custom-bg2"
          >
            <p className="text-center">Code</p>
            <FaGithub className="sm:w-8 sm:h-8 ml-2 w-6 h-6" />
          </Link>
        )}
      </div>
    </div>
  );
}
