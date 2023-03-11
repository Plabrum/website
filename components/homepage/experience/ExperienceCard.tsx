import React from "react";
import { motion } from "framer-motion";
import { CompanyType, ExperienceType } from "schemas/schema_types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import SanityImage from "components/general/SanityImage";
import Link from "next/link";

type Props = { isLast: boolean; experience: ExperienceType };
const components: PortableTextComponents = {
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="mt-xl list-disc">{children}</ul>,
    number: ({ children }) => (
      <ol className="mt-lg list-decimal">{children}</ol>
    ),
  },
};

function ExperienceCard({ isLast, experience }: Props) {
  const { role, overview, duration, description, technologies, company } =
    experience;
  // const { name, comp_description, logo_image, company_page } = company;
  const startTime = duration?.start ? new Date(duration.start) : "now";
  const endTime = duration?.end ? new Date(duration.end) : "now";

  const startString: string = startTime.toLocaleString("en-us", {
    year: "numeric",
    month: "short",
  });
  const endString: string = endTime.toLocaleString("en-us", {
    year: "numeric",
    month: "short",
  });

  return (
    <div className="flex mt-4 grow sm:min-h-[100px]">
      <div className="flex flex-col sm:w-16 w-12 shrink-0 mx-6">
        <Link href={company.company_page || ""} className="">
          <SanityImage
            sanitySrc={company.logo_image}
            alt="Company or school logo"
            className="rounded-md object-contain drop-shadow-md"
            height={100}
            width={100}
          />
        </Link>
        {!isLast && (
          <div className="mt-2 w-px grow self-center bg-custom-accent" />
        )}
      </div>
      <div className="flex flex-col grow">
        <h1 className="sm:text-2xl text-xl justify-self-start">{role}</h1>
        <div className="text-custom-t4 text-xs">
          <h2>
            {startString} - {endString}
          </h2>
        </div>

        <h2 className="font-bold sm:text-lg text-md">{company.name}</h2>
        {/* {overview && (
          <p className="text-sm text-custom-t1">
            <PortableText value={overview} />
          </p>
        )} */}
        {/* {description && <PortableText value={description} />} */}
        {description && (
          <div className="ml-4 text-md text-custom-t1">
            <PortableText value={description} components={components} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ExperienceCard;
