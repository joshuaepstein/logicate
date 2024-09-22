import { Cursor03Icon, CursorArrowIcon } from '@jfstech/icons-react/24/outline'
import { LogicateSession } from '@logicate/database'

export default function FloatingToolbar({ session }: { session: LogicateSession }) {
  return (
    <>
      <div className="shadow-hard-soft-2xs fixed bottom-5 left-[50%] right-[50%] flex w-max gap-4 rounded-xl bg-white px-8 py-4">
        <CursorArrowIcon className="h-5 w-5" />
      </div>
    </>
  )
}
