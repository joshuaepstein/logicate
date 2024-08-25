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
      initial={{ opacity: 0, rotate: "20deg" }}
      animate={{ opacity: 1, rotate: "12deg" }}
      transition={{ duration: 1, delay: 0.5 }}
      key="and-gate-animatable"
      className="absolute right-20 size-32 top-52"
      style={{
        rotate: "12deg",
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
        d="M99.6595 45.1016C182.456 57.8316 223.635 80.8153 279.486 136.703C282.564 139.782 282.564 144.771 279.486 147.851C223.635 203.738 182.456 226.722 99.6595 239.452C93.8267 240.349 89.0664 234.747 90.7104 229.08C96.3675 209.577 106.5 170.681 106.5 142.277C106.5 113.872 96.3675 74.9769 90.7104 55.4741C89.0664 49.8064 93.8267 44.2048 99.6595 45.1016Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M65 101.277C65 98.5154 67.2386 96.2768 70 96.2768H99.5V106.277H70C67.2386 106.277 65 104.038 65 101.277Z"
        fill="#2C2E33"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M65 183.277C65 180.515 67.2386 178.277 70 178.277H99.5V188.277H70C67.2386 188.277 65 186.038 65 183.277Z"
        fill="#2C2E33"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M314 142.277C314 145.038 311.761 147.277 309 147.277H285V137.277H309C311.761 137.277 314 139.515 314 142.277Z"
        fill="#2C2E33"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M203.36 67.6159C232.001 82.4658 256.923 102.807 285.145 131.048C291.345 137.251 291.345 147.303 285.145 153.506C256.923 181.747 232.001 202.088 203.36 216.938C174.705 231.794 142.793 240.914 100.875 247.359C89.0435 249.178 79.8168 237.919 83.0272 226.851C88.7017 207.288 98.5 169.404 98.5 142.277C98.5 115.15 88.7017 77.2654 83.0272 57.7028C79.8168 46.6349 89.0435 35.3754 100.875 37.1945C142.793 43.6393 174.705 52.7593 203.36 67.6159ZM279.487 136.703C223.635 80.8153 182.456 57.8315 99.6596 45.1016C93.8268 44.2048 89.0665 49.8063 90.7105 55.4741C96.3676 74.9768 106.5 113.872 106.5 142.277C106.5 170.681 96.3676 209.577 90.7105 229.08C89.0665 234.747 93.8268 240.349 99.6596 239.452C182.456 226.722 223.635 203.738 279.487 147.851C282.564 144.771 282.564 139.782 279.487 136.703Z"
        fill="#2C2E33"
      />
    </motion.svg>
  );
}
