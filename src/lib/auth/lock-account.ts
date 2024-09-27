import { prisma, User } from '@logicate/database'
import { MAX_LOGIN_ATTEMPTS } from './constants'
import { sendEmail } from '@logicate/emails/index'
import AccountLockedEmail from '@logicate/emails/templates/AccountLocked'

export const incrementLoginAttemps = async (user: Pick<User, 'id' | 'email' | 'name'>) => {
  const { invalidLoginAttempts, lockedAt } = await prisma.user.update({
    where: { id: user.id },
    data: {
      invalidLoginAttempts: {
        increment: 1,
      },
    },
    select: {
      lockedAt: true,
      invalidLoginAttempts: true,
    },
  })

  if (!lockedAt && invalidLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
    const lockedAtTime = new Date()
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lockedAt: lockedAtTime,
      },
    })

    // TODO: Send email to user that their account has been locked
    const emailResponse = await sendEmail({
      email: user.email,
      subject: 'Account Locked',
      react: AccountLockedEmail({
        user: {
          email: user.email,
          name: user.name,
        },
        unlockUrl: '/',
      }),
      marketing: false,
      headers: {
        'X-Priority': '1',
      },
    })

    if (emailResponse.error) {
      console.error('Error sending email', emailResponse.error)
      return {
        invalidLoginAttempts,
        lockedAt: lockedAtTime,
        emailSent: false,
      }
    } else {
      return {
        invalidLoginAttempts,
        lockedAt: lockedAtTime,
        emailSent: true,
      }
    }
  }

  return {
    invalidLoginAttempts,
    lockedAt,
    emailSent: false,
  }
}

export const exceededLoginAttemptsThreshold = (user: Pick<User, 'invalidLoginAttempts'>) => {
  return user.invalidLoginAttempts >= MAX_LOGIN_ATTEMPTS
}
