import React from 'react';

function Footer() {
  return (
    <div className="flex flex-row sm:h-36 justify-center items-end bg-custom-bg4 snap-end mt-20">
      <div className="my-6 ">
        <h4 className="text-custom-t4 text-md text-center mx-6">
          Hand built with React & Next.js by <span className="whitespace-nowrap">Phil Labrum</span>{' '}
          <span className="whitespace-nowrap">© 2023</span>
        </h4>
      </div>
    </div>
  );
}

export default Footer;
