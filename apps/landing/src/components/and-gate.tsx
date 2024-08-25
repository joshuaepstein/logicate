"use client";

import { motion } from "framer-motion";

export default function AndGate() {
  return (
    <motion.svg
      width="369"
      height="288"
      viewBox="0 0 369 288"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, rotate: "-20deg" }}
      animate={{ opacity: 1, rotate: "-12deg" }}
      transition={{ duration: 1 }}
      key="and-gate-animatable"
      className="absolute left-8  size-24 top-36"
      style={{
        rotate: "-12deg",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0.5}
      dragMomentum={false}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
    >
      <path
        d="M58 7C52.4772 7 48 11.4771 48 17V61H11C8.23858 61 6 63.2386 6 66C6 68.7614 8.23858 71 11 71H48V217.5H11C8.23858 217.5 6 219.739 6 222.5C6 225.261 8.23858 227.5 11 227.5H48V271C48 276.523 52.4771 281 58 281H185C258.989 281 319.279 222.347 321.91 149H358.5C361.261 149 363.5 146.761 363.5 144C363.5 141.239 361.261 139 358.5 139H321.91C319.279 65.6532 258.989 7 185 7H58Z"
        fill="#2C2E33"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M185 15H58C56.8954 15 56 15.8954 56 17V271C56 272.105 56.8954 273 58 273H185C256.245 273 314 215.245 314 144C314 72.7553 256.245 15 185 15Z"
        fill="white"
      />
    </motion.svg>
  );
}
