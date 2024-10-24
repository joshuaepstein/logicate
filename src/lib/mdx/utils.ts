import fs from 'fs'
import path from 'path'

export const getMDXFiles = (dir: fs.PathLike) => {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}
