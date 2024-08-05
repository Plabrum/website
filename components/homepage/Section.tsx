import React from 'react';

interface Props {
  idName: string;
  titleName?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Section({ idName, titleName, className, children }: Props) {
  return (
    <section
      id={idName}
      className={
        className
        // "snap-center flex flex-col h-screen w-screen sm:min-h-[700px] md:max-w-[1500px] self-center"
      }
    >
      {titleName && (
        <div className="w-full md:mt-28 xs:mt-20 mt-12 mb-10 text-center">
          <p className="font-title text-xl tracking-[10px] uppercase text-custom-t2 ">{titleName}</p>
          <div className="w-20 mt-2 bg-custom-accent h-px mx-auto" />
        </div>
      )}

      {children}
    </section>
  );
}
