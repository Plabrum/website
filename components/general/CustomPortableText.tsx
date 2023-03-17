import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Image, PortableTextBlock } from "sanity";
import { ExternalIframeType } from "schemas/schema_types";
import SanityImage from "../general/SanityImage";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  gruvboxDark,
  gruvboxLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useTheme } from "next-themes";

export function CustomPortableText({ value }: { value: PortableTextBlock[] }) {
  const { resolvedTheme } = useTheme();

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
        return (
          <p className="sm:text-xl text-lg font-serif sm:leading-normal leading-snug my-2">
            {children}
          </p>
        );
      },
      h1: ({ children }) => {
        return (
          <p className="sm:text-4xl text-3xl font-serif font-bold mt-4 my-4">
            {children}
          </p>
        );
      },
      h2: ({ children }) => {
        return (
          <p className="sm:text-3xl text-2xl font-serif text-center mt-4">
            {children}
          </p>
        );
      },
      h3: ({ children }) => {
        return (
          <p className="mx-auto sm:text-3xl text-2xl text-center font-serif mt-4 border-b border-custom-accent">
            {children}
          </p>
        );
      },
      h4: ({ children }) => {
        return (
          <p className="mx-auto sm:text-2xl text-xl font-serif mt-4">
            {children}
          </p>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="py-3 pl-2 text-custom-t4 bg-custom-bg1 sm:w-5/6 mx-2 sm:mx-auto rounded-md">
          <div className="border-l-2 p-2 border-custom-accent">{children}</div>
        </blockquote>
      ),
    },

    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline text-custom-t2 transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
            target="_blank"
          >
            {children}
          </a>
        );
      },
      code: ({ children }) => {
        return (
          <span className="mx-auto text-sm font-mono bg-custom-bg3 border border-custom-t4 px-2 rounded-sm">
            {children}
          </span>
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
                // height={1000}
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
      code: ({ value }) => {
        return (
          <SyntaxHighlighter
            language={value.language}
            style={resolvedTheme === "dark" ? gruvboxDark : gruvboxLight}
            wrapLongLines
          >
            {value.code}
          </SyntaxHighlighter>
        );
      },
      external: ({ value }: { value: ExternalIframeType }) => {
        const shape =
          value.width && value.height
            ? ` aspect-[${value.width}/${value.height}] `
            : "";

        const tailwind_cache = `aspect-[1/1]
                                aspect-[2/1] aspect-[1/2] 
                                aspect-[3/1] aspect-[1/3]
                                aspect-[3/2] aspect-[2/3]
                                aspect-[3/5] aspect-[5/3]
                                aspect[4/3] aspect-[3/4]
                                aspect-[5/4] aspect-[4/5]
                                aspect-[16/9]`;

        const back_up_ratio = tailwind_cache.includes(shape)
          ? shape
          : "aspect-square";

        return (
          <iframe
            width={"100%"}
            className={back_up_ratio}
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
