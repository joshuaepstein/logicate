import { hashPassword } from "@/lib/encrypt"

async function main() {
  const password = await hashPassword("password")
  console.log(password)
}

main()
