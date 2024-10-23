'use server'

import { getSession } from '@/lib/auth/utils'
import { changelogId } from '@/lib/id'
import { Changelog, prisma } from '@logicate/database'

export async function createChangelog(prevState: string | undefined, formData: FormData) {
  const session = await getSession()
  if (!session.user.isAdmin) {
    return 'You are not authorized to create a changelog'
  }
  const title = formData.get('title') as string
  const subtitle = formData.get('subtitle') as string
  // additions, changes, fixes are string arrays - they need to be deserialized
  const additionsLength = formData.get('additions_length') as string
  const changesLength = formData.get('changes_length') as string
  const fixesLength = formData.get('fixes_length') as string

  if (!title || !subtitle || !additionsLength || !changesLength || !fixesLength) {
    return 'All fields are required'
  }

  try {
    Number(additionsLength)
    Number(changesLength)
    Number(fixesLength)
  } catch (error) {
    return 'All fields are required'
  }

  console.log(formData)

  const additions: string[] = []
  const changes: string[] = []
  const fixes: string[] = []

  for (let i = 0; i < parseInt(additionsLength); i++) {
    additions.push(formData.get(`additions-${i}`) as string)
    console.log(additions[i])
  }

  for (let j = 0; j < parseInt(changesLength); j++) {
    changes.push(formData.get(`changes-${j}`) as string)
    console.log(changes[j])
  }

  for (let a = 0; a < parseInt(fixesLength); a++) {
    fixes.push(formData.get(`fixes-${a}`) as string)
    console.log(fixes[a])
  }

  console.log(additions, additionsLength)
  console.log(changes, changesLength)
  console.log(fixes, fixesLength)
  const creation = {
    title,
    subtitle,
    additions: additions.filter((s) => s !== null),
    changes: changes.filter((s) => s !== null),
    fixes: fixes.filter((s) => s !== null),
    authorId: session.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: changelogId(),
  } satisfies Changelog

  const changelog = await prisma.changelog.create({
    data: creation,
  })

  if (changelog) {
    return 'Changelog created successfully'
  } else {
    return 'Failed to create changelog'
  }
}
