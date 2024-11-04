import { prisma } from "@/database"

async function main() {
  await prisma.logicateSession.deleteMany()
  await prisma.publicDisplay.deleteMany()
  await prisma.classroom.deleteMany()
  await prisma.invites.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.question.deleteMany()
  await prisma.userPermission.deleteMany()
  await prisma.user.deleteMany()
}

main()
