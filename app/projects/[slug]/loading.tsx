import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="h-screen w-screen items-center justify-center flex flex-col">
      <div className="flex flex-row space-x-8 ">
        <p className=" text-custom-t1 dont-bold text-lg uppercase tracking-[4px]">
          Loading
        </p>
        <FaSpinner className="mx-auto animate-spin w-6 h-6" />
      </div>
    </div>
  );
}
