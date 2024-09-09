import { getSession } from '@/lib/auth/utils';
import { Button } from '@logicate/ui/button';
import { Input } from '@logicate/ui/input/index';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@logicate/ui/modal';
import { notFound } from 'next/navigation';
import { Textarea } from '@logicate/ui/textarea';
import ChangelogForm from './changelog-form';

export default async function AdminPage() {
  const session = await getSession();
  if (!session.user.isAdmin) {
    notFound();
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
  );
}
