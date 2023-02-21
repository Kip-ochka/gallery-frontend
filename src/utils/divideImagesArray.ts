import { IPhoto } from '../types/models'

export const divideImagesArray = (screenWidth: number) => {
  if (screenWidth && screenWidth > 880) return 3
  if (screenWidth && screenWidth > 550) return 2
  return 1
}

function chunkify(a: IPhoto[], n: number, balanced: boolean) {
  if (n < 2) return [a]

  let len = a.length,
    out = [],
    i = 0,
    size

  if (len % n === 0) {
    size = Math.floor(len / n)
    while (i < len) {
      out.push(a.slice(i, (i += size)))
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--)
      out.push(a.slice(i, (i += size)))
    }
  } else {
    n--
    size = Math.floor(len / n)
    if (len % size === 0) size--
    while (i < size * n) {
      out.push(a.slice(i, (i += size)))
    }
    out.push(a.slice(size * n))
  }

  return out
}

export default chunkify
