import { hashPassword } from "@/lib/encrypt"
import { generateClassroomId } from "@/lib/id"
import { faker } from "@faker-js/faker"
import { PrismaClient, TimeFormat } from "@prisma/client"

const prisma = new PrismaClient()

const randInt = (max = 1, floor = 0) => {
  return Math.round(Math.random() * max) + floor
}

// TODO: Write functions to seed the database with data
async function main() {
  const password = faker.internet.password()
  const hashed = await hashPassword(password)
  const user = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: hashed,
      username: faker.internet.userName(),
      publicDisplay: {
        create: {
          profilePicture: faker.image.avatarGitHub(),
          timeFormat: TimeFormat.hours24,
          language: "enGB",
        },
      },
      accountType: "TEACHER",
    },
  })

  const classroom = await prisma.classroom.create({
    data: {
      name: faker.word.noun(),
      id: generateClassroomId(),
      students: {
        connect: user,
      },
    },
  })

  console.log(user)
  console.log(hashed)
  console.log(password)
  console.log(classroom)
}

main()
