'use server'

import { cookies } from 'next/headers'

const RECENT_CLASSROOMS_COOKIE = 'recentClassrooms'

const setRecentClassrooms = async (classrooms: string[]) => {
  const response = await (await cookies()).set(RECENT_CLASSROOMS_COOKIE, classrooms.join(','))
  console.log('setRecentClassrooms', response)
  return response
}

const getRecentClassrooms = async (): Promise<string[]> => {
  if (!(await cookies()).has(RECENT_CLASSROOMS_COOKIE)) {
    return []
  }

  const recentClassrooms = (await cookies()).get(RECENT_CLASSROOMS_COOKIE)

  if (!recentClassrooms) {
    return []
  }

  if (recentClassrooms.value === '') {
    return []
  }

  return recentClassrooms.value.split(',')
}

const addRecentClassroom = async (classroomId: string) => {
  const recentClassrooms = await getRecentClassrooms()
  if (recentClassrooms.includes(classroomId)) {
    // ensure its the first item
    recentClassrooms.splice(recentClassrooms.indexOf(classroomId), 1)
    recentClassrooms.unshift(classroomId)
  } else {
    recentClassrooms.push(classroomId)
  }

  const response = setRecentClassrooms(recentClassrooms)

  return response
}

export { addRecentClassroom, getRecentClassrooms, setRecentClassrooms }
