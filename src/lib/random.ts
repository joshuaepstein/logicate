export const randomBetweenIncluding = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randomAvatar = () => {
  return `/avatars/avatar-${randomBetweenIncluding(1, 29)}.png`
}

export const getAvatar = (avatar: number) => {
  if (avatar >= 1 && avatar <= 29) {
    return `/avatars/avatar-${avatar}.png`
  } else {
    return `/avatars/avatar-1.png`
  }
}
