export const randomBetweenIncluding = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomAvatar = () => {
  return `/_static/avatars/avatar-${randomBetweenIncluding(1, 29)}.png`
}

export const getAvatar = (avatar: number) => {
  if (avatar >= 1 && avatar <= 29) {
    return `/_static/avatars/avatar-${avatar}.png`
  } else {
    return `/_static/avatars/avatar-1.png`
  }
}

export const getAvatarFromId = (id: string) => {
  // the id is in the format: b8be882e-4229-4432-8087-d5a29e531fa9
  // we will find the first number in the id and use that as the avatar
  const firstNumber = id.match(/\d+/)?.[0]
  if (firstNumber) {
    return getAvatar(parseInt(firstNumber, 10))
  } else {
    return getAvatar(1)
  }
}
