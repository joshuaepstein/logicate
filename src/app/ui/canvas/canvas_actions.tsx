'use client'

import {
  CenterIcon,
  Eraser01Icon,
  FavouriteIcon,
  File01Icon,
  FileCheck01Icon,
  FileCheck02Icon,
  FileIcon,
} from '@jfstech/icons-react/24/outline'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/modal'
import { useEffect, useState, useTransition } from 'react'
import useCanvasStore from './hooks/useCanvasStore'
import SettingsPopup from './settings-popup'
import LoadingCircle from '@/components/ui/icons/loading-circle'
import { updateDatabase } from './hooks/updateCanvasStore'
import SuperJSON from 'superjson'
import { toast } from 'sonner'
import useCookie from 'react-use-cookie'

export default function useCanvasActions(canvasId: string) {
  const [confirmClear, setConfirmClear] = useState(false)
  const { setItems, setWires, setCanvas, updatingDatabase, setUpdatingDatabase } = useCanvasStore()
  const [updating, setUpdating] = useTransition()
  const [loadingSave, setLoadingSave] = useState(false)
  const [autoSave, setAutoSave] = useCookie(`autoSave-${canvasId}`, 'true')
  const [autoSaving, setAutoSaving] = useState(false)

  useEffect(() => {
    if (canvasId === 'demo') return
    setAutoSaving(autoSave === 'true')
  }, [autoSave])

  useEffect(() => {
    if (canvasId === 'demo') return
    setLoadingSave(updatingDatabase.is)
  }, [updatingDatabase.is])

  return {
    CanvasActions: (
      <div className="absolute bottom-4 right-4 flex flex-col items-end justify-end gap-4">
        <SettingsPopup />
        <div className="flex flex-row">
          {canvasId !== 'demo' && (
            <>
              <Button
                className="mr-2"
                variant={autoSaving ? 'primary' : 'dark'}
                size="icon-sm"
                onClick={() => {
                  setAutoSave(autoSave === 'true' ? 'false' : 'true')
                  if (autoSave === 'true') {
                    toast.info('Auto Save Disabled')
                  } else {
                    toast.info('Auto Save Enabled')
                  }
                }}
              >
                <FavouriteIcon className="size-5" />
              </Button>
              <Button
                className="mr-2"
                variant="green"
                size="icon-sm"
                disabled={updating || loadingSave}
                onClick={() => {
                  const stringified = SuperJSON.stringify(useCanvasStore.getState())
                  if (updatingDatabase.is) return
                  setUpdating(async () => {
                    const db = await updateDatabase(stringified, canvasId)
                    if (db) {
                      setUpdatingDatabase({ is: false, lastUpdated: Date.now(), progress: 0 })
                      toast.success('Canvas Saved')
                    } else {
                      setUpdatingDatabase({ is: false, lastUpdated: null, progress: 0 })
                      toast.error('Failed to save canvas')
                    }
                  })
                }}
              >
                {updating || loadingSave ? <LoadingCircle className="size-5" /> : <FileCheck02Icon className="size-5" />}
              </Button>
            </>
          )}
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
