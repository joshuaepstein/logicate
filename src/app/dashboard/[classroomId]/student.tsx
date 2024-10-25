import { getProfilePictureSource } from "@/components/ui/profile-picture/client"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib"
import { randomAvatar } from "@/lib/random"
import { prisma, User } from "@logicate/database"
import { notFound } from "next/navigation"

async function getClassroom(classroomId: string) {
  "use server"
  const classroom = await prisma.classroom.findUnique({
    where: {
      id: classroomId,
    },
  })
  return classroom
}

async function getLeaderboard(classroomId: string) {
  const leaderboardUsers = await prisma.user.findMany({
    where: {
      studentClassrooms: {
        some: {
          id: classroomId,
        },
      },
    },
    select: {
      id: true,
      name: true,
      progressLevel: true,
      publicDisplay: true,
    },
    orderBy: {
      progressLevel: "desc",
    },
    take: 10,
  })
  return leaderboardUsers
}

export default async function StudentDashboard({ user, classroomId }: { user: User; classroomId: string }) {
  const classroom = await getClassroom(classroomId)
  if (!classroom) notFound()
  const leaderboard = await getLeaderboard(classroomId)

  return (
    <main className="max-w-dvw mb-8 flex min-h-[calc(100dvh-15rem)] flex-col">
      <header className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold">{user.name}</h1>
          <p className="text-neutralgrey-1000">{classroom.name}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-2xs font-semibold text-neutralgrey-1000">LEVEL {Math.floor(user.progressLevel)}</p>
          <Progress
            value={Math.max(0, Math.min(100, (user.progressLevel - Math.floor(user.progressLevel)) * 100))}
            max={100}
            className="h-[5px] w-[196px]"
            indicatorStyles={cn("bg-gradient-to-r from-blue-900 to-ultramarine-600")}
          />
        </div>
      </header>

      <section className="mt-8 flex h-full w-full grow flex-row gap-8">
        <div className="flex w-max flex-col gap-3 bg-white p-4 shadow-hard-xs">
          <header>
            <h2 className="text-lg font-medium">Class Leaderboard</h2>
            <p className="text-2xs text-neutralgrey-900">View your fellow classmates and aim for the top!</p>
          </header>
          <div className="mt-2 flex h-full grow flex-col">
            {leaderboard.map((leaderboardUser, index) => (
              <div
                key={index}
                className="flex w-full min-w-[442px] max-w-md flex-row items-center justify-between border-b pb-4 pt-4 first-of-type:pt-0 last-of-type:border-y-0 last-of-type:pb-0"
              >
                <div className="flex items-center justify-start gap-4">
                  <div
                    className={cn("size-9 bg-contain bg-center bg-no-repeat", {
                      "border border-ultramarine-600": user.id === leaderboardUser.id,
                    })}
                    style={{
                      ...(user.id === leaderboardUser.id && index !== 0
                        ? {
                            // purple glow
                            boxShadow: "0px 1px 3px -1px #633fe8",
                          }
                        : index === 0
                          ? {
                              border: "none",
                              backgroundImage: `url(/_static/elements/gold-border.png), url(${getProfilePictureSource(leaderboardUser.publicDisplay.length > 0 ? leaderboardUser.publicDisplay[0].profilePicture : randomAvatar())})`,
                              backgroundClip: "padding-box, content-box",
                              backgroundOrigin: "border-box, content-box",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "100% 100%, contain",
                              padding: "2px",
                              imageRendering: "pixelated",
                            }
                          : {}),
                    }}
                  />
                  <h4
                    className={cn("font-medium", {
                      "text-ultramarine-600": user.id === leaderboardUser.id && index !== 0,
                      "text-squash-800": index === 0 && user.id === leaderboardUser.id,
                      "text-neutralgrey-1000": index !== 0 && user.id !== leaderboardUser.id,
                      "text-teal-600": index === 0 && user.id !== leaderboardUser.id,
                    })}
                  >
                    {leaderboardUser.name}
                  </h4>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-2xs font-medium text-neutralgrey-1000">LEVEL {Math.floor(leaderboardUser.progressLevel)}</p>
                  <Progress
                    value={Math.max(0, Math.min(100, (leaderboardUser.progressLevel - Math.floor(leaderboardUser.progressLevel)) * 100))}
                    max={100}
                    className="h-[5px] w-[196px]"
                    indicatorStyles={cn("bg-gradient-to-r from-blue-900 to-ultramarine-600")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full grow flex-col gap-8">
          <div className="h-full max-h-[50%] grow overflow-y-scroll p-4 shadow-hard-xs">
            <header className="sticky -top-4 z-10 -mt-4 flex w-full flex-col items-start justify-start bg-white pb-2 pt-4">
              <h2 className="text-lg font-medium">Homework Assignments</h2>
              <p className="text-2xs text-neutralgrey-900">Your active and completed assignments set by your teacher.</p>
            </header>
            <div className="mt-3 flex flex-wrap gap-x-8 gap-y-4">
              {Array.from({ length: 20 }).map((_, index) => (
                <div
                  key={index}
                  className="shadow-inner relative flex h-[82px] w-[130px] flex-col items-start justify-between overflow-hidden rounded-md bg-[#edecfe] px-2.5 py-2"
                >
                  <p
                    className="absolute -bottom-4 right-0 select-none text-7xl font-bold leading-none text-black"
                    style={{
                      mixBlendMode: "overlay",
                    }}
                  >
                    {index + 1}
                  </p>
                  <p className="text-3xs">
                    <span className="font-medium text-black">{index + 1} · </span>
                    <span className="font-normal text-black">Convert this boolean expression to a logic gate.</span>
                  </p>
                  <p className="text-2xs font-medium text-black">(A v B)</p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-full max-h-[50%] grow p-4 shadow-hard-xs">
            <header className="sticky -top-4 z-10 -mt-4 flex w-full flex-col items-start justify-start bg-white pb-2 pt-4">
              <h2 className="text-lg font-medium">Tasks</h2>
              <p className="text-2xs text-neutralgrey-900">Complete these tasks to gain extra XP!</p>
            </header>
            <div className="flex flex-row gap-4 overflow-x-scroll">
              {/* {Array.from({ length: 20 }).map((_, index) => (
                <div key={index} className="h-20 w-20 border border-red-500" />
              ))} */}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
