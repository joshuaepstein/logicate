'use server';

import { prisma } from '@logicate/database';

export async function createChangelog(prevState: string | undefined, formData: FormData) {
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  // additions, changes, fixes are string arrays - they need to be deserialized
  const additionsLength = formData.get('additions_length') as string;
  const changesLength = formData.get('changes_length') as string;
  const fixesLength = formData.get('fixes_length') as string;

  if (!title || !subtitle || !additionsLength || !changesLength || !fixesLength) {
    return 'All fields are required';
  }
  try {
    Number(additionsLength);
    Number(changesLength);
    Number(fixesLength);
  } catch (error) {
    return 'All fields are required';
  }

  const additions: string[] = [];
  const changes: string[] = [];
  const fixes: string[] = [];

  for (let i = 0; i < parseInt(additionsLength); i++) {
    additions.push(formData.get(`additions-${i}`) as string);
  }

  for (let i = 0; i < parseInt(changesLength); i++) {
    changes.push(formData.get(`changes-${i}`) as string);
  }

  for (let i = 0; i < parseInt(fixesLength); i++) {
    fixes.push(formData.get(`fixes-${i}`) as string);
  }

  const changelog = await prisma.changelog.create({
    data: {
      title,
      subtitle,
      additions,
      changes,
      fixes,
    },
  });

  if (changelog) {
    return 'Changelog created successfully';
  } else {
    return 'Failed to create changelog';
  }
}
