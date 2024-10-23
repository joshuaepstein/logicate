import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/modal'
import { getSession } from '@/lib/auth/utils'
import { notFound } from 'next/navigation'
import ChangelogForm from './changelog-form'

export default async function AdminPage() {
  const session = await getSession()
  if (!session.user.isAdmin) {
    notFound()
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Changelog</Button>
        </DialogTrigger>
        <DialogContent>
          <ChangelogForm />
        </DialogContent>
      </Dialog>
    </>
  )
}
