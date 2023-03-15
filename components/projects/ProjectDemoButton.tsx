import Link from "next/link";
import React from "react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

type Props = { url: string; text: string };

function ProjectDemoButton({ url, text }: Props) {
  return (
    <Link
      href={url}
      className="grow-0 flex flex-row items-center text-custom-t3 bg-custom-accent rounded-md py-2 px-4"
    >
      <p className="text-center ">{text}</p>
      <FaExternalLinkSquareAlt className="sm:w-8 sm:h-8 ml-2 w-6 h-6" />
    </Link>
  );
}

export default ProjectDemoButton;
