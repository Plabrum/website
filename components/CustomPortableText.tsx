import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Image, PortableTextBlock } from "sanity";
import SanityImage from "./SanityImage";

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>;
      },
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
                width={200}
                height={200}
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
    },
  };

  return <PortableText components={components} value={value} />;
}
