import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
// import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
// import { MdAutoFixHigh } from "react-icons/md";
import { SunIcon, MoonIcon, SparklesIcon } from "@heroicons/react/24/solid";

export default function ThemeSwitch({ className }: { className: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDefault: boolean = theme === "system";
  const isDark: boolean =
    theme === "dark" || (isDefault && systemTheme === "dark");
  // console.log(
  //   "systemtheme",
  //   systemTheme,
  //   "isdefault",
  //   isDefault,
  //   "isDark",
  //   isDark
  // );
  return (
    <button onClick={() => setTheme(isDark ? "light" : "dark")}>
      {isDark ? (
        <SunIcon
          title="Use Light Mode"
          className={"text-yellow-200 " + className}
        />
      ) : (
        <MoonIcon
          title="Use Dark Mode"
          className={"text-blue-900 " + className}
        />
      )}
    </button>
  );
}

//   function MoonSun({ active }: { active: boolean }) {
//     const isDark = (isDefault && systemTheme === "dark") || theme === "dark";
//     return (
//       <button onClick={() => setTheme(isDark ? "light" : "dark")}>
//         {isDark ? (
//           <SunIcon
//             title="Use Light Mode"
//             className={
//               active
//                 ? "text-yellow-200 h-7 w-7"
//                 : "text-custom-inactive h-7 w-7"
//             }
//           />
//         ) : (
//           <MoonIcon
//             title="Use Dark Mode"
//             className={
//               active ? "text-blue-900 h-7 w-7" : "text-custom-inactive h-7 w-7"
//             }
//           />
//         )}
//       </button>
//     );
//   }

//   return (
//     <div className="grid items-center grid-cols-2 gap-0">
//       {/* <MoonIcon className="text-white h-7 w-7" /> */}
//       <div>
//         <MoonSun active={!isDefault} />
//       </div>
//       <button onClick={() => setTheme("system")}>
//         <SparklesIcon
//           title="Use System Styling"
//           className={
//             isDefault
//               ? "text-custom-active h-7 w-7"
//               : "text-custom-inactive h-7 w-7"
//           }
//         />
//       </button>
//     </div>
//   );
// }
