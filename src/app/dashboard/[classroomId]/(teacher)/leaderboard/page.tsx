import { getProfilePictureSource } from "@/components/ui/profile-picture/client"
import { Progress } from "@/components/ui/progress"
import { H3 } from "@/components/ui/typography"
import { prisma } from "@/database"
import { cn } from "@/lib"
import { randomAvatar } from "@/lib/random"
import { unstable_cache } from "next/cache"

const getLeaderboard = (classroomId: string) =>
  unstable_cache(async () => {
    return await prisma.user.findMany({
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
    })
  }, [`teacher-classroom-leaderboard-${classroomId}`])

export default async function TeacherClassroomDashboardPage(props: { params: Promise<{ classroomId: string }> }) {
  const { classroomId } = await props.params
  const leaderboard = await getLeaderboard(classroomId)()

  return (
    <>
      <H3 className="mt-0">Class Leaderboard</H3>

      <div className="mt-8 flex h-full grow flex-col">
        {leaderboard.map((leaderboardUser, index) => (
          <div
            key={index}
            className="even:bg-neutralgrey-200 flex w-full min-w-[442px] max-w-xl flex-row items-center justify-between border-b px-4 py-4 first-of-type:pt-0 last-of-type:border-y-0"
          >
            <div className="flex items-center justify-start gap-4">
              <div
                className={cn("size-9 bg-contain bg-center bg-no-repeat")}
                style={
                  index === 0
                    ? {
                        border: "none",
                        backgroundImage: `url(/_static/elements/gold-border.png), url(${getProfilePictureSource(leaderboardUser.publicDisplay.length > 0 ? leaderboardUser.publicDisplay[0].profilePicture : randomAvatar())})`,
                        backgroundClip: "padding-box, content-box",
                        backgroundOrigin: "border-box, content-box",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%, contain",
                        padding: "2.5px",
                        imageRendering: "pixelated",
                      }
                    : {
                        backgroundImage: `url(${getProfilePictureSource(leaderboardUser.publicDisplay.length > 0 ? leaderboardUser.publicDisplay[0].profilePicture : randomAvatar())})`,
                      }
                }
              />
              <h4
                className={cn("text-neutralgrey-1000 font-medium", {
                  "text-squash-800": index === 0,
                })}
              >
                {leaderboardUser.name}
              </h4>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-2xs text-neutralgrey-1000 font-medium">LEVEL {Math.floor(leaderboardUser.progressLevel)}</p>
              <Progress
                value={Math.max(0, Math.min(100, (leaderboardUser.progressLevel - Math.floor(leaderboardUser.progressLevel)) * 100))}
                max={100}
                className="h-[5px] w-[196px]"
                indicatorStyles={cn("to-ultramarine-600 bg-gradient-to-r from-blue-900")}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
