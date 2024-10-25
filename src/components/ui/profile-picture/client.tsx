import { PublicDisplay, User } from "@/database"
import { cn } from "@/lib"
import { getAvatar, getAvatarFromId } from "@/lib/random"

export default function ClientProfilePicture({
  className,
  style,
  ...props
}: React.HTMLProps<HTMLDivElement> &
  (
    | {
        user: Exclude<User, "password" | "invalidLoginAttempts" | "lockedAt"> & {
          publicDisplay: PublicDisplay
        }
        type: "user"
      }
    | {
        profilePicture: string | null
        type: "profilePicture"
      }
  )) {
  if (props.type === "user" && !props.user) {
    return <></>
  }

  const profilePicture = getProfilePictureSource(
    props.type === "user"
      ? props.user.publicDisplay.profilePicture || `internal:${getAvatarFromId(props.user.id)}`
      : props.profilePicture || getAvatar(7)
  )
  return (
    <div
      className={cn("size-8", className)}
      style={{
        ...style,
        backgroundImage: `url(${profilePicture})`,
      }}
    />
  )
}

export function getProfilePictureSource(profilePicture: string | null) {
  if (!profilePicture) {
    return getAvatar(7)
  }
  if (profilePicture.startsWith("internal:")) {
    return profilePicture.replace("internal:", "")
  }
  return profilePicture
}
