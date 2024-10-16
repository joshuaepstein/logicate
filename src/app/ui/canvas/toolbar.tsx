import {
  CenterIcon,
  Cursor03Icon,
  Eraser01Icon,
  FavouriteIcon,
  MoveIcon,
  Save01Icon,
  Save02Icon,
  SettingsIcon,
} from '@jfstech/icons-react/24/outline'
import { LogicateSession } from '@logicate/database'
import useCanvasStore from './hooks/useCanvasStore'
import { cn } from '@/lib'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { H3 } from '@/components/ui/typography'
import { Toggle } from '@/components/ui/toggle'
import { Switch } from '@/components/ui/switch'
import { useCookie } from 'react-use'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/modal'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function FloatingToolbar({ session }: { session: LogicateSession }) {
  const [confirmClear, setConfirmClear] = useState(false)
  const { currentTool, setCurrentTool, setCanvas, setItems, setWires } = useCanvasStore()
  const [autoSaveCookie, changeAutoSaveCookie] = useCookie(`autoSave-${session.id}`)

  return (
    <>
      <div className="shadow-hard-soft-2xs fixed bottom-5 left-0 right-0 z-[123456] mx-auto flex w-max items-center justify-center gap-4 rounded-md bg-white/75 px-4 py-3 backdrop-blur-md">
        <div className="relative flex flex-row gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Cursor03Icon
                className={cn('size-5 cursor-pointer', {
                  '': currentTool === 'select',
                })}
                onClick={() => {
                  setCurrentTool('select')
                }}
              />
            </TooltipTrigger>
            <TooltipContent>Select Tool: Cursor</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <MoveIcon
                className="size-5 cursor-pointer"
                onClick={() => {
                  setCurrentTool('drag-canvas')
                }}
              />
            </TooltipTrigger>
            <TooltipContent>Select Tool: Drag Canvas</TooltipContent>
          </Tooltip>
          <div
            className={cn('bg-neutralgrey-800/30 absolute -bottom-1 -left-1 -top-1 -z-10 aspect-square w-auto rounded-md transition-all', {
              'translate-x-[36px]': currentTool === 'drag-canvas',
            })}
          />
        </div>
        <div className="bg-neutralgrey-1300/30 mx-[calc(0.5px+2px)] h-[18px] w-px" />

        <Tooltip>
          <TooltipTrigger asChild>
            <CenterIcon
              onClick={() => {
                setCanvas({
                  x: 0,
                  y: 0,
                  zoom: 1,
                })
              }}
              className="size-5 cursor-pointer"
            />
          </TooltipTrigger>
          <TooltipContent>Center Canvas</TooltipContent>
        </Tooltip>
        <Dialog open={confirmClear} onOpenChange={setConfirmClear}>
          <DialogTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                <Eraser01Icon className="size-5 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>Clear Canvas</TooltipContent>
            </Tooltip>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to clear the canvas?</DialogTitle>
              <DialogDescription className="text-neutralgrey-900 text-sm">
                This will clear all components and wires on the canvas. You cannot undo this action.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive-primary"
                onClick={() => {
                  setItems([])
                  setWires([])
                  setConfirmClear(false)
                }}
              >
                Clear Canvas
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Popover>
          <PopoverTrigger>
            <Tooltip>
              <TooltipTrigger asChild>
                <SettingsIcon className="size-5" />
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
          </PopoverTrigger>
          <PopoverContent>
            <p className="font-medium">Settings</p>
            <p className="text-neutralgrey-700 text-sm">Adjust settings for this canvas only</p>

            <div className="mt-2 flex flex-col gap-2">
              {session.id !== 'demo' && (
                <>
                  <div className="bg-neutralgrey-200 flex w-full items-center justify-between rounded-md px-2 py-2">
                    <p className="text-xs font-medium">Auto-Save</p>
                    <Switch
                      id="auto-save"
                      checked={
                        // if cookie autoSave-${canvasId}
                        autoSaveCookie === 'true'
                      }
                      onCheckedChange={(checked) => {
                        changeAutoSaveCookie(checked ? 'true' : 'false')
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
