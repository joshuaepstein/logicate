'use server';

import { Changelog, prisma } from '@logicate/database';

export async function getChangelogs() {
  const changelogs = await prisma.changelog.findMany();
  return changelogs;
}

export async function getChangelog(id: string) {
  const changelog = await prisma.changelog.findUnique({
    where: {
      id,
    },
  });
  return changelog;
}

export async function createChangelog(changelog: Omit<Changelog, 'id'>) {
  const newChangelog = await prisma.changelog.create({
    data: changelog,
  });
  return newChangelog;
}
