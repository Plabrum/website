import React from "react";

interface Props {
  idName: string;
  titleName?: string;
  className?: string;
  children: JSX.Element;
}

function Section({ idName, titleName, className, children }: Props) {
  return (
    <section
      id={idName}
      className={
        className
          ? className
          : "snap-center flex flex-col h-screen sm:min-h-[700px]"
        // sm:min-h-[800px] min-h-[700px]
      }
    >
      {titleName && (
        <h3 className="relative md:mt-28 xs:mt-20 mt-12 uppercase tracking-[20px] max-md:pl-8 text-custom-t2 sm:text-2xl text-xl text-center">
          {titleName}
        </h3>
      )}
      {children}
    </section>
  );
}

export default Section;
