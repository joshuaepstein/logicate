import {
  AlertCircleIcon as ExclamationCircleIcon,
  CheckContainedIcon as CheckCircleFill,
  X02Icon as X,
} from "@jfstech/icons-react/24/outline";
import { FileIcon } from "@radix-ui/react-icons";
import { VariantProps, cva } from "class-variance-authority";
import { FC } from "react";
// import { CheckCircleFill } from "../shared/icons";
// import X from "../shared/icons/x";
import { Progress } from "./progress";

import { humanFileSize } from "@logicate/ui";
import { TrashIcon } from "lucide-react";
import { Button } from "./button";

type FileUploaderProps = VariantProps<typeof fileUploaderVariants> & {
  fileName: string;
  fileSize: number;
  progress?: number;
  maxProgress?: number;
  className?: string;
  uploadedAction?: () => void;
  uploadedActionText?: string;
  errorText?: string;
  errorRetryAction?: () => void;

  primaryAction: () => void;
};

const defaultFileUploaderProps: FileUploaderProps = {
  status: "uploading",
  fileName: "File Name",
  fileSize: 4 * 1024 * 1024,
  progress: 0,
  maxProgress: 100,
  size: "sm",
  visibility: "low",
  primaryAction: () => {},
};

const fileUploaderVariants = cva("", {
  variants: {
    visibility: {
      low: "border-neutralgrey-500 border",
      medium: "medium",
    },
    size: {
      sm: "h-10 min-w-[360px] flex flex-row items-center gap-2 rounded-md p-[10px]",
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
});

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
    <div
      className={fileUploaderVariants({ status, size, visibility, className })}
    >
      {status === "uploading" ? (
        <FileIcon className="text-neutralgrey-800 size-5" />
      ) : status === "uploaded" || status === "uploaded_action" ? (
        <CheckCircleFill className="size-5 text-green-800" />
      ) : (
        <ExclamationCircleIcon className="size-5 text-red-800" />
      )}
      <div className="flex grow flex-row items-center gap-2">
        <p className="text-neutralgrey-1300 line-clamp-1 flex grow flex-row items-center gap-2 text-ellipsis text-sm font-[475]">
          {(fileName.includes(".") &&
            fileName.split(".").slice(0, -1).join(".")) ||
            fileName}
          {(status === "error" && errorText && (
            <p className="text-2xs leading-none text-red-800">{errorText}</p>
          )) ||
            null}
        </p>
        {status === "uploading" && (
          <Progress
            max={maxProgress || 100}
            value={progress}
            className="bg-neutralgrey-400 w-[80px]"
          />
        )}
        {status === "uploaded" && (
          <p className="text-neutralgrey-900 text-right text-sm">
            {humanFileSize(fileSize, true)}
          </p>
        )}
        {status === "uploaded_action" && uploadedAction && (
          <Button
            onClick={uploadedAction}
            size="text-sm"
            variant="text-primary"
          >
            {uploadedActionText || "Action"}
          </Button>
        )}
        {status === "error" && errorRetryAction && (
          <Button
            onClick={errorRetryAction}
            size="text-sm"
            variant="text-destructive"
          >
            Retry
          </Button>
        )}
        <button onClick={primaryAction}>
          {(status?.includes("uploaded") && (
            <TrashIcon className="text-neutralgrey-900 size-5" />
          )) || <X className="text-neutralgrey-1300 size-5" />}
        </button>
      </div>
    </div>
  );
};
