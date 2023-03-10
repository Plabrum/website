import React from "react";

type Props = {};

function Footer({}: Props) {
  return (
    <div className="flex flex-row sm:h-36 justify-center items-end bg-custom-bg4 snap-end mt-20">
      <div className="my-6 ">
        <h4 className="text-custom-t4 text-md">© 2023 Philip Labrum</h4>
      </div>
    </div>
  );
}

export default Footer;
