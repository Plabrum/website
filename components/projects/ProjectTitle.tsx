import React from 'react';

type Props = {
  title: string;
  date_string: string;
  className?: string;
};

export default function Title({ title, date_string, className }: Props) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-3 relative ${className}`}>
      <h1 className="md:text-5xl text-4xl text-custom-t1 font-medium ">{title}</h1>
      <h2 className="sm:text-md text-sm text-custom-t2">{date_string}</h2>
    </div>
  );
}
