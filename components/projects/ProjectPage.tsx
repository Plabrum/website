import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { PortableText } from "@portabletext/react";
import SanityImage from "components/general/SanityImage";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProjectType } from "schemas/schema_types";
import Technologies from "./Technologies";
import Title from "./Title";

export default function ProjectPage({ project }: { project: ProjectType }) {
  const {
    _id,
    title,
    tags,
    coverImage,
    description,
    duration,
    repo_url,
    demo_url,
    technologies,
  } = project;

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
  const router = useRouter();
  const from_slug = router.query["name"];
  var from_homepage = false;
  if (from_slug instanceof String || typeof from_slug === "string") {
    from_homepage = from_slug.split("#")[0] === "/";
  }

  return (
    <div className=" w-screen min-h-screen flex flex-col sm:space-y-20 space-y-14 items-center lg:pt-40 pt-20">
      {/* Title box */}

      <Title
        title={title}
        from_homepage={from_homepage}
        date_string={startString + " - " + endString}
        tags={tags.map((tag) => tag.name)}
        className=""
      />

      <SanityImage
        width={2000}
        // fill={true}
        // height={"auto"}
        className="2xl:w-1/2 lg:w-5/6 object-cover"
        alt={title + " cover image"}
        sanitySrc={coverImage}
      />

      <Technologies technologies={technologies} />
      <div className="flex flex-col max-w-[850px]  bg-custom-bg3 sm:space-y-10 space-y-6 sm:py-16 md:px-8 px-3 py-10 ">
        {/* <p>test</p> */}
        <h1 className="sm:text-2xl text-xl text-center mx-5 font-bold tracking-widest font-mono">
          Project Writeup
        </h1>
        <div className="xl:w-5/6 mx-auto">
          <PortableText value={description} />
        </div>
      </div>
    </div>
  );
}
