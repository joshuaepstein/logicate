'use server'

import { Failure, Success } from '@/types/api'
import { prisma } from '@logicate/database'
import { hashPassword } from '@/lib/encrypt'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { randomAvatar } from '@/lib/random'

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(1),
})

// Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export async function registerAction(_: Failure<string> | Success<string> | undefined, formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    const error = validatedFields.error.flatten().fieldErrors
    return Failure('Missing fields: ' + Object.keys(error).join(', '))
  }

  const { name, email, username, password } = validatedFields.data

  const existingUserByEmail = await prisma.user.findUnique({
    where: { email },
  })
  if (existingUserByEmail) {
    return Failure('A user with this email already exists')
  }
  const existingUserByUsername = await prisma.user.findUnique({
    where: { username },
  })
  if (existingUserByUsername) {
    return Failure('A user with this username already exists')
  }

  if (password.length < 8) {
    return Failure('Password must be at least 8 characters long')
  } else if (!/[A-Z]/.test(password)) {
    return Failure('Password must contain at least one uppercase letter')
  } else if (!/[a-z]/.test(password)) {
    return Failure('Password must contain at least one lowercase letter')
  } else if (!/\d/.test(password)) {
    return Failure('Password must contain at least one number')
  } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return Failure('Password must contain at least one special character')
  }

  const hashedPassword = await hashPassword(password)

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      name,
      password: hashedPassword,
      accountType: 'TEACHER',
      publicDisplay: {
        create: {
          profilePicture: `internal:${randomAvatar()}`,
        },
      },
    },
  })

  if (!newUser) {
    return Failure('Failed to create user')
  }

  return Success('User created successfully', {
    email,
    password,
  })
}
