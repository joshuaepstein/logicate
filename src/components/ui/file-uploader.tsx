import {
  CheckContainedIcon as CheckCircleFill,
  AlertCircleIcon as ExclamationCircleIcon,
  X02Icon as X,
} from "@jfstech/icons-react/24/outline"
import { FileIcon } from "@radix-ui/react-icons"
import { VariantProps, cva } from "class-variance-authority"
import { FC } from "react"
// import { CheckCircleFill } from "../shared/icons";
// import X from "../shared/icons/x";
import { Progress } from "./progress"

import { humanFileSize } from "@/lib"
import { TrashIcon } from "lucide-react"
import { Button } from "./button"

type FileUploaderProps = VariantProps<typeof fileUploaderVariants> & {
  fileName: string
  fileSize: number
  progress?: number
  maxProgress?: number
  className?: string
  uploadedAction?: () => void
  uploadedActionText?: string
  errorText?: string
  errorRetryAction?: () => void

  primaryAction: () => void
}

const defaultFileUploaderProps: FileUploaderProps = {
  status: "uploading",
  fileName: "File Name",
  fileSize: 4 * 1024 * 1024,
  progress: 0,
  maxProgress: 100,
  size: "sm",
  visibility: "low",
  primaryAction: () => {},
}

const fileUploaderVariants = cva("", {
  variants: {
    visibility: {
      low: "border border-neutralgrey-500",
      medium: "medium",
    },
    size: {
      sm: "flex h-10 min-w-[360px] flex-row items-center gap-2 rounded-md p-[10px]",
      lg: "",
    },
    status: {
      uploading: "",
      uploaded: "",
      uploaded_action: "",
      error: "",
    },
  },
  defaultVariants: {
    visibility: "low",
    size: "sm",
    status: "uploading",
  },
})

export const FileUploader: FC<React.PropsWithChildren<FileUploaderProps>> = ({
  size,
  visibility,
  status,
  fileName,
  fileSize,
  progress,
  maxProgress,
  className,
  uploadedAction,
  uploadedActionText,
  errorRetryAction,
  errorText,
  primaryAction,
} = defaultFileUploaderProps) => {
  return (
    <div className={fileUploaderVariants({ status, size, visibility, className })}>
      {status === "uploading" ? (
        <FileIcon className="size-5 text-neutralgrey-800" />
      ) : status === "uploaded" || status === "uploaded_action" ? (
        <CheckCircleFill className="size-5 text-green-800" />
      ) : (
        <ExclamationCircleIcon className="size-5 text-red-800" />
      )}
      <div className="flex grow flex-row items-center gap-2">
        <p className="line-clamp-1 flex grow flex-row items-center gap-2 text-ellipsis text-sm font-[475] text-neutralgrey-1300">
          {(fileName.includes(".") && fileName.split(".").slice(0, -1).join(".")) || fileName}
          {(status === "error" && errorText && <p className="text-2xs leading-none text-red-800">{errorText}</p>) || null}
        </p>
        {status === "uploading" && <Progress max={maxProgress || 100} value={progress} className="w-[80px] bg-neutralgrey-400" />}
        {status === "uploaded" && <p className="text-right text-sm text-neutralgrey-900">{humanFileSize(fileSize, true)}</p>}
        {status === "uploaded_action" && uploadedAction && (
          <Button onClick={uploadedAction} size="text-sm" variant="text-primary">
            {uploadedActionText || "Action"}
          </Button>
        )}
        {status === "error" && errorRetryAction && (
          <Button onClick={errorRetryAction} size="text-sm" variant="text-destructive">
            Retry
          </Button>
        )}
        <button onClick={primaryAction}>
          {(status?.includes("uploaded") && <TrashIcon className="size-5 text-neutralgrey-900" />) || (
            <X className="size-5 text-neutralgrey-1300" />
          )}
        </button>
      </div>
    </div>
  )
}
