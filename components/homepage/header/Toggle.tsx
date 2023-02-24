import { motion, Variants } from "framer-motion";
import { MouseEventHandler } from "react";

interface Props {
  toggle: () => void;
  className?: string;
}
export const Toggle = ({ toggle, className }: Props) => (
  <button onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23" className={className}>
      <motion.path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <motion.path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <motion.path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  </button>
);
