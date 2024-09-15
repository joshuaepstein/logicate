import { CenterIcon, Eraser01Icon, File01Icon, FileCheck01Icon, FileCheck02Icon, FileIcon } from '@jfstech/icons-react/24/outline'
import { Button } from '@logicate/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@logicate/ui/modal'
import { useEffect, useState } from 'react'
import useCanvasStore from './hooks/useCanvasStore'
import SettingsPopup from './settings-popup'
import LoadingCircle from '@logicate/ui/icons/loading-circle'
import { updateDatabase } from './hooks/updateCanvasStore'
import SuperJSON from 'superjson'

export default function useCanvasActions(canvasId: string) {
  const [confirmClear, setConfirmClear] = useState(false)
  const { setItems, setWires, setCanvas, updatingDatabase } = useCanvasStore()

  return {
    CanvasActions: (
      <div className="absolute bottom-4 right-4 flex flex-col items-end justify-end gap-4">
        <SettingsPopup />
        <div className="flex flex-row">
          <Button className="mr-2" variant="green" size="icon-sm" onClick={() => {
            updateDatabase(SuperJSON.stringify(useCanvasStore.getState()), canvasId)
          }}>
              <FileCheck02Icon className="size-5" />
          </Button>
          <Dialog open={confirmClear} onOpenChange={setConfirmClear}>
            <DialogTrigger asChild>
              <Button className="mr-2" variant="destructive-primary" size="icon-sm">
                <Eraser01Icon className="size-5" />
              </Button>
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
          <Button
            onClick={() => {
              setCanvas({
                x: 0,
                y: 0,
                zoom: 1,
              })
            }}
            className="mr-2"
            variant="dark"
            size="icon-sm"
            title="Center Canvas"
          >
            <CenterIcon className="size-5" />
          </Button>
        </div>
      </div>
    ),
    confirmClear,
    setConfirmClear,
  }
}
