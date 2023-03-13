import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Image, PortableTextBlock } from "sanity";
import { ExternalIframeType } from "schemas/schema_types";
import SanityImage from "../general/SanityImage";

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    list: {
      // Ex. 1: customizing common list types
      bullet: ({ children }) => (
        <ul className="mt-xl pl-10 list-disc marker:text-custom-t4">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="mt-lg pl-10 list-decimal">{children}</ol>
      ),
    },
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>;
      },
      h1: ({ children }) => {
        return <p className="text-2xl font-bold mb-4">{children}</p>;
      },
      h2: ({ children }) => {
        return <p className="text-xl text-center mb-2">{children}</p>;
      },
      h3: ({ children }) => {
        return (
          <div>
            <p className="text-xl text-center ">{children}</p>
            <div className="h-px w-1/4 bg-custom-accent mx-auto mb-2" />
          </div>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className=" py-2 pl-2 text-custom-t4 bg-custom-bg1 sm:w-5/6 mx-2 sm:mx-auto rounded-md">
          <div className="border-l-2 p-2 border-custom-accent">{children}</div>
        </blockquote>
      ),
    },

    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string };
      }) => {
        return (
          <div className="my-6 space-y-2">
            <div className="relative aspect-[16/9]">
              <SanityImage
                sanitySrc={value}
                width={1000}
                height={1000}
                alt="cover image"
              />
            </div>
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        );
      },
      external: ({ value }: { value: ExternalIframeType }) => {
        console.log("value", value.link_to_html);
        return (
          <iframe
            width={"100%"}
            className="aspect-video"
            src={value.link_to_html}
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        );
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
