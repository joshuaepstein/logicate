"use client"

import LogicGateIcon from "@/components/icons/logic-gate-icon"

import { Book04Icon, FileReturn02Icon, UsersProfiles03Icon } from "@jfstech/icons-react/24/outline"
import { motion } from "framer-motion"
import Link from "next/link"
import { CSSProperties } from "react"

export default function LogicateDescription() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 10,
        scale: 0.95,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      viewport={{ once: true, amount: 0.9 }}
      id="what-we-do"
      className="flex min-h-[45dvh] items-center justify-center"
    >
      <p className="max-w-sm px-4 text-center text-lg font-medium text-neutralgrey-1200 sm:max-w-lg sm:px-0 md:max-w-xl md:text-2xl lg:max-w-3xl lg:text-3xl [&>span]:transition-colors [&>span]:duration-300">
        With Logicate you can{" "}
        <Link
          href="#feature-simulate"
          style={{ "--animation-duration": "3s" } as CSSProperties}
          className="hover-text-shimmer inline-flex items-center gap-2 text-indigo-900"
        >
          build and simulate <LogicGateIcon className="inline-block size-6 text-current md:size-10" />
        </Link>{" "}
        logic gates,{" "}
        <Link
          href="#feature-questions"
          style={{ "--animation-duration": "3s" } as CSSProperties}
          className="hover-text-shimmer inline-flex items-center gap-1 text-purple-900 md:gap-2"
        >
          test knowledge <Book04Icon className="inline-block size-5 text-current md:size-9" />
        </Link>{" "}
        and{" "}
        <Link
          href="#feature-learn"
          style={{ "--animation-duration": "1.5s" } as CSSProperties}
          className="hover-text-shimmer inline-flex items-center justify-start gap-1 text-orange-900 md:gap-2"
        >
          learn
          <svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            className="inline-block size-5 text-current md:size-9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.4475 17.2539L17.939 16.3929L18.4475 17.2539ZM18.939 16.3929H17.939H18.939ZM10.9657 20.4036L10.4292 21.2475L10.9657 20.4036ZM13.0555 20.4379L13.564 21.299L13.0555 20.4379ZM1.90419 7.13686L1.39226 6.27784L1.90419 7.13686ZM1.90419 7.99589L1.39226 8.85492L1.90419 7.99589ZM12.512 13.7074L13.024 14.5664L12.512 13.7074ZM11.4882 13.7074L12.0001 12.8483L11.4882 13.7074ZM22.096 7.13686L22.6079 6.27784L22.096 7.13686ZM22.096 7.99589L21.5841 7.13686L22.096 7.99589ZM6.01768 17.2583L6.55413 16.4144L6.01768 17.2583ZM12.512 1.4254L12.0001 2.28442L12.512 1.4254ZM11.4882 1.4254L12.0001 2.28442L11.4882 1.4254ZM23.2001 7.54973C23.2001 6.99745 22.7524 6.54973 22.2001 6.54973C21.6478 6.54973 21.2001 6.99745 21.2001 7.54973H23.2001ZM21.2001 12.9497C21.2001 13.502 21.6478 13.9497 22.2001 13.9497C22.7524 13.9497 23.2001 13.502 23.2001 12.9497H21.2001ZM12.0001 2.28442L21.5841 7.99589L22.6079 6.27784L13.024 0.566368L12.0001 2.28442ZM21.5841 7.13686L12.0001 12.8483L13.024 14.5664L22.6079 8.85492L21.5841 7.13686ZM2.41612 7.99589L12.0001 2.28442L10.9762 0.566367L1.39226 6.27784L2.41612 7.99589ZM12.0001 12.8483L6.06606 9.312L5.0422 11.0301L10.9762 14.5664L12.0001 12.8483ZM6.06606 9.312L2.41612 7.13686L1.39226 8.85492L5.0422 11.0301L6.06606 9.312ZM4.55413 10.171V16.4144H6.55413V10.171H4.55413ZM5.48123 18.1023L10.4292 21.2475L11.5021 19.5597L6.55413 16.4144L5.48123 18.1023ZM13.564 21.299L18.956 18.115L17.939 16.3929L12.5471 19.5768L13.564 21.299ZM19.939 16.3929L19.939 10.171H17.939L17.939 16.3929H19.939ZM18.956 18.115C19.5652 17.7553 19.939 17.1004 19.939 16.3929H17.939L18.956 18.115ZM10.4292 21.2475C11.3814 21.8527 12.5925 21.8726 13.564 21.299L12.5471 19.5768C12.2232 19.768 11.8195 19.7614 11.5021 19.5597L10.4292 21.2475ZM1.39226 6.27784C0.416118 6.85956 0.416123 8.2732 1.39226 8.85492L2.41612 7.13686C2.7415 7.33077 2.7415 7.80198 2.41612 7.99589L1.39226 6.27784ZM12.0001 12.8483L12.0001 12.8483L10.9762 14.5664C11.6071 14.9423 12.3931 14.9423 13.024 14.5664L12.0001 12.8483ZM21.5841 7.99589C21.2587 7.80199 21.2587 7.33077 21.5841 7.13686L22.6079 8.85492C23.5841 8.2732 23.5841 6.85956 22.6079 6.27784L21.5841 7.99589ZM4.55413 16.4144C4.55413 17.0986 4.90384 17.7353 5.48123 18.1023L6.55413 16.4144V16.4144H4.55413ZM13.024 0.566368C12.3931 0.190444 11.6071 0.190442 10.9762 0.566367L12.0001 2.28442L12.0001 2.28442L13.024 0.566368ZM21.2001 7.54973V12.9497H23.2001V7.54973H21.2001Z"
              fill="currentColor"
            />
          </svg>
        </Link>{" "}
        with our question generator,{" "}
        <Link
          href="#feature-classrooms"
          style={{ "--animation-duration": "3s" } as CSSProperties}
          className="hover-text-shimmer inline-flex items-center gap-1 text-green-900 md:gap-2"
        >
          create and manage <UsersProfiles03Icon className="inline-block size-5 text-current md:size-9" />
        </Link>{" "}
        classrooms, and{" "}
        <Link
          href="#feature-assign"
          style={{ "--animation-duration": "2s" } as CSSProperties}
          className="hover-text-shimmer inline-flex items-center gap-1 text-maroon-900 md:gap-2"
        >
          assign <FileReturn02Icon className="inline-block size-5 text-current md:size-9" />
        </Link>{" "}
        tasks and homework. <br />
        <span className="mt-2 inline-block text-neutralgrey-1000/85">All in one, easy to use platform.</span>
      </p>
    </motion.section>
  )
}
