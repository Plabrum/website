import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ProjectType } from "schemas/schema_types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import ProjectCard from "./ProjectCard";

type Props = {
  projects: Array<ProjectType | null>;
};
function chunkProjects(
  array: Array<ProjectType | null>,
  chunksize: number,
  cap?: number
) {
  const paddCards = chunksize - (array.length % chunksize);
  const newArr = array.concat(Array(paddCards).fill(null));
  var tmp = [];
  const stop = cap ? cap : newArr.length;

  for (var i = 0; i < stop; i += chunksize) {
    tmp.push(newArr.slice(i, i + chunksize));
  }
  return tmp;
}

export default function DesktopProjects({ projects }: Props) {
  const [overflowRowWidth, setOverflowRowWidth] = useState<number>(0);
  const overflowRowRef = useRef<HTMLDivElement | null>(null);
  const [xTrans, setXTrans] = useState<number>(0);

  function setWidth() {
    setOverflowRowWidth(overflowRowRef.current?.scrollWidth || 0);
  }
  useEffect(() => {
    setWidth();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", setWidth);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, [overflowRowRef]);

  const cardMat = chunkProjects(projects, 4);
  const divWidth = overflowRowRef.current?.clientWidth || 0;

  function newX(
    currentX: number,
    divWidth: number,
    rowWidth: number,
    pos: boolean
  ) {
    const posX: number = -currentX;
    if (pos) {
      const nextX = posX + divWidth;
      return nextX <= rowWidth - divWidth ? -nextX : 0;
    } else {
      const nextX = posX - divWidth;

      return nextX >= -5 ? -nextX : -(rowWidth - divWidth);
    }
  }

  return (
    <div className="flex flex-row mt-6 h-3/4 justify-center ">
      <button
        className="my-auto mr-4"
        onClick={() =>
          setXTrans(newX(xTrans, divWidth, overflowRowWidth, false))
        }
      >
        <ChevronLeftIcon className="h-16 text-custom-t2" />
      </button>
      <div className=" w-3/4 shrink-0 overflow-hidden snap-x snap-mandatory ">
        <motion.div
          className="flex flex-row h-full items-center "
          drag="x"
          dragConstraints={{ right: 0, left: -(overflowRowWidth - divWidth) }}
          animate={{ x: xTrans }}
          transition={{ duration: 0.5 }}
          ref={overflowRowRef}
        >
          {cardMat.map((value, index) => (
            <div
              key={index}
              className="w-full shrink-0 items-center snap-center mr-2"
            >
              <div key={index} className="grid grid-cols-2 gap-8 ">
                {value.map((val, ind) => {
                  return (
                    <div key={ind} className="">
                      <ProjectCard project={val} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <button
        className="my-auto ml-4"
        onClick={() =>
          setXTrans(newX(xTrans, divWidth, overflowRowWidth, true))
        }
      >
        <ChevronRightIcon className="h-16 text-custom-t2" />
      </button>
    </div>
  );
}
