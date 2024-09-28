'use client'
import { cn, humanFileSize } from '@/lib'
import { UploadIcon } from '@radix-ui/react-icons'
import { ClassValue } from 'clsx'
import React, { DragEvent, FC } from 'react'
import { toast } from 'sonner'

type AcceptProp = `${string}/${string}` | string

type DragNDropProps = {
  /**
   * The file types that the input should accept
   * @example 'image/*'
   * @author joshuaepstein
   */
  accept: string
  /**
   * Whether or not the input should accept multiple files
   * @example true
   * @author joshuaepstein
   */
  acceptMultiple?: boolean
  /**
   * An additional function to be called when a file, or multiple files, are dropped
   * @example (files: File[]) => console.log(files[0].name) // 'my-file.jpg'
   * @author joshuaepstein
   */
  onDrop?: (files: File[]) => void
  /**
   * String to be displayed for "Accepted file types:"
   * @example 'PNG, JPEG, JPG, GIF, BMP, TIFF, WebP' // Default: 'Any file type'
   * @default 'Any file type'
   * @author joshuaepstein
   */
  acceptedFileTypesString?: string
  /**
   * File size limit in kilobytes
   */
  fileSizeLimit?: number
}

export const DragNDropComponent: FC<
  React.PropsWithChildren<DragNDropProps> & {
    className?: ClassValue | ClassValue[]
  }
> = ({
  children,
  accept,
  acceptMultiple = false,
  onDrop,
  acceptedFileTypesString = acceptTypeToReadable(accept, 3),
  fileSizeLimit,
  className,
}) => {
  const [dragOn, setDragOn] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOn = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOn(true)
  }

  const handleDragOff = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOn(false)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragOn(false)

    const dropFiles = Array.from(event.dataTransfer.files)

    if (onDrop) {
      onDrop(files)
    }

    if (fileSizeLimit) {
      const fileSizes = dropFiles.map((file) => file.size)
      const overLimit = fileSizes.some((size) => size > fileSizeLimit * 1024)

      if (overLimit) {
        toast.error('One or more files are over the size limit of 2MB', {
          description: `Files with the name ${dropFiles
            .filter((file) => file.size > fileSizeLimit * 1024)
            .map((file) => file.name)
            .join(', ')} are over the size limit of 2MB`,
        })
        return
      }
    }

    if (acceptMultiple) {
      setFiles((prev) => {
        const newFiles = dropFiles.filter((file) => !prev.some((prevFile) => prevFile.name === file.name))

        return [...prev, ...newFiles]
      })
    } else {
      setFiles(dropFiles)
    }
  }

  return (
    <div
      className={cn(
        'border-neutralgrey-700 hover:bg-neutralgrey-200 group box-border flex w-max min-w-[300px] max-w-[600px] items-center justify-center rounded-lg border border-dashed px-8 py-6 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        {
          'border-2 border-solid border-blue-900 bg-blue-200': dragOn,
        },
        className
      )}
      tabIndex={0}
      onDragOver={handleDragOn}
      onDragLeave={handleDragOff}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        onChange={(e) => {
          const files = e.target.files
          if (files) {
            setFiles(Array.from(files))
            if (onDrop) {
              onDrop(Array.from(files))
            }
          }
        }}
        multiple={acceptMultiple}
        ref={inputRef}
        className="invisible hidden"
      />
      <div className="flex flex-col items-center gap-2">
        <div
          className="bg-neutralgrey-300 hover:bg-neutralgrey-400 cursor-pointer rounded-lg p-3 transition"
          onClick={(e) => {
            e.preventDefault()
            if (inputRef.current) {
              inputRef.current.click()
            }
          }}
        >
          <UploadIcon className="text-neutralgrey-1000 size-5" />
        </div>
        <p className="text-sm font-[475]">
          Drag & drop files or{' '}
          <span
            className="cursor-pointer text-blue-900"
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.click()
              }
            }}
          >
            browse files
          </span>
        </p>
        <p className="text-2xs text-neutralgrey-1000">
          {(files.length > 0 && files.map((file) => file.name).join(', ')) ||
            // 'JPG, PNG or GIF - Max file size 2MB'
            acceptedFileTypesString + ' - Max file size ' + humanFileSize(fileSizeLimit || 2000 * 1024, true)}
        </p>
      </div>
    </div>
  )
}

const acceptTypeToReadable = (accept: AcceptProp, limit: number = -1) => {
  const mappings: Record<AcceptProp, string> = {
    'image/*': 'PNG, JPEG, JPG, GIF, BMP, TIFF, WebP',
    'audio/*': 'MP3, WAV, FLAC, AAC, OGG',
    'video/*': 'MP4, AVI, MKV, MOV, WMV, WebM',
    'application/pdf': 'PDF',
    '*/*': 'Any file type',
  }

  // return mappings[accept] || 'Unknown file type'
  if (mappings[accept] && limit === -1) {
    return mappings[accept]
  } else if (mappings[accept] && limit !== -1) {
    return mappings[accept].split(',').slice(0, limit).join(', ') + '...'
  }
  return 'Unknown file type'
}
