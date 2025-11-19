import { currentUser } from '@clerk/nextjs/server'

import { db } from '@/lib/db'

export const checkUser = async () => {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    return null
  }

  let user = await db.user.findUnique({
    where: {
      clerkUserId: clerkUser.id
    }
  })

  if (!user) {
    user = await db.user.create({
      data: {
        clerkUserId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        name: clerkUser.fullName || '',
        imageUrl: clerkUser.imageUrl || ''
      }
    })
  }

  return user
}
