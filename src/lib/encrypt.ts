import bcrypt from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
  const salt = process.env.SALT_PASSWORD || "12"
  const saltRounds = parseInt(salt)
  return await hash(password, saltRounds)
}

function hash(password: string, saltRounds: number): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err)
      resolve(hash || "")
    })
  })
}

export async function verifyPassword(password: string, hash: string) {
  return await compare(password, hash)
}

function compare(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}
