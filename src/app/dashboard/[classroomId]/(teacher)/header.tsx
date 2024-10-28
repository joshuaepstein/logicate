"use client"

import { cn } from "@/lib"
import { ActivityIcon, BarGroup03Icon, FileIcon, SettingsIcon, UsersProfiles01Icon } from "@jfstech/icons-react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { use } from "react"
import { getClassroom } from "./actions"

const TABS = [
  {
    name: "Activity",
    icon: ActivityIcon,
  },
  {
    name: "Assignments",
    icon: FileIcon,
  },
  {
    name: "Leaderboard",
    icon: BarGroup03Icon,
  },
  {
    name: "Students",
    icon: UsersProfiles01Icon,
  },
  {
    name: "Settings",
    icon: SettingsIcon,
  },
]

export default function TeacherClassroomDashboardHeader({
  classroomPromise,
}: {
  classroomPromise: ReturnType<ReturnType<typeof getClassroom>>
}) {
  const classroom = use(classroomPromise)
  const pathname = usePathname()

  if (!classroom) return null
  return (
    <header className="container flex w-full flex-row items-center justify-between">
      <ul className="[&>a]:hover:text-neutralgrey-800 group relative flex w-full flex-row items-center justify-start gap-0">
        <div className="bg-neutralgrey-400 absolute bottom-0 left-0 right-0 h-px w-full" />
        {TABS.map((tab, index) => (
          <Link
            key={"tab-" + index}
            href={`/dashboard/${classroom.id}/${tab.name.toLowerCase()}`}
            className={cn("hover:!text-neutralgrey-1300 text-neutralgrey-1300 relative transition", {
              "group-hover:!text-neutralgrey-1300": pathname === `/dashboard/${classroom.id}/${tab.name.toLowerCase()}`,
            })}
          >
            <div
              className={cn(
                "bg-neutralgrey-1300 absolute bottom-0 left-[51%] h-0.5 w-1/2 -translate-x-1/2 rounded-t-full opacity-0 transition",
                {
                  "opacity-100": pathname === `/dashboard/${classroom.id}/${tab.name.toLowerCase()}`,
                }
              )}
            />

            <p
              className={cn("flex items-center justify-center gap-2 px-10 py-4 text-[15px] font-[450]")}
              aria-current={pathname === `/dashboard/${classroom.id}/${tab.name.toLowerCase()}` ? "page" : undefined}
            >
              <tab.icon className="size-4" />
              {tab.name}
            </p>
          </Link>
        ))}
      </ul>
    </header>
  )
}
