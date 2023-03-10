import React from "react";

type Props = {
  title: string;
  date_string: string;
  tags: string[];
  className: string;
};

function Title({ title, date_string, tags, className }: Props) {
  return (
    <div
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      <h1 className="md:text-5xl text-4xl text-custom-t1 font-medium ">
        {title}
      </h1>
      <h2 className="sm:text-md text-sm text-custom-t2">{date_string}</h2>
      <div className="flex flex-row space-x-5">
        {tags.map((tag, index) => {
          return (
            <p
              className="tracking-widest lowercase sm:text-sm text-xs text-custom-t4"
              key={index}
            >
              {"#" + tag}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Title;
