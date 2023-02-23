import React from "react";
import { motion } from "framer-motion";
import { CompanyType, ExperienceType } from "schemas/schema_types";
import { PortableText } from "@portabletext/react";
import SanityImage from "components/general/SanityImage";

type Props = { isLast: boolean; experience: ExperienceType };

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
  console.log("company image source:", company.logo_image);
  return (
    <div className="flex mt-4 grow md:min-h-[150px] sm:min-h-[100px]">
      <div className="flex flex-col ">
        <SanityImage
          sanitySrc={company.logo_image}
          alt="Company or school logo"
          className="rounded-md object-contain sm:h-16 h-12"
          height={100}
          width={100}
        />
        {!isLast && <div className="mt-2 w-px grow self-center bg-custom-t2" />}
        {/* <div className="mt-2 w-px grow self-center bg-white" /> */}
      </div>
      <div className="flex flex-col grow">
        <h1 className="sm:text-2xl text-xl justify-self-start">{role}</h1>
        <div className="text-custom-t2 text-xs">
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
          <h2 className="ml-4 text-sm text-custom-t1">
            <PortableText value={description} />
          </h2>
        )}
      </div>
    </div>
  );
}

export default ExperienceCard;
