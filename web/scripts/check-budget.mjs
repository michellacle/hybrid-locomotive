import { readdir, stat } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const MAX_BYTES = 20 * 1024 * 1024
const scriptDir = dirname(fileURLToPath(import.meta.url))
const DIST_DIR = resolve(scriptDir, '../dist')
const RUNTIME_DIR = resolve(scriptDir, '../public/assets/runtime')

const listFilesRecursively = async (dirPath) => {
  const entries = await readdir(dirPath, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const absolute = join(dirPath, entry.name)
    if (entry.isDirectory()) {
      const nestedFiles = await listFilesRecursively(absolute)
      files.push(...nestedFiles)
      continue
    }

    files.push(absolute)
  }

  return files
}

const totalSize = async (files) => {
  let bytes = 0
  for (const file of files) {
    const fileStats = await stat(file)
    bytes += fileStats.size
  }
  return bytes
}

const bytesToMb = (bytes) => (bytes / (1024 * 1024)).toFixed(2)

const main = async () => {
  const distFiles = await listFilesRecursively(DIST_DIR)
  const distBytes = await totalSize(distFiles)

  const runtimeFiles = await listFilesRecursively(RUNTIME_DIR)
  const glbFiles = runtimeFiles.filter((file) => file.toLowerCase().endsWith('.glb'))

  console.log(`[budget] Dist files: ${distFiles.length}`)
  console.log(`[budget] Dist total: ${bytesToMb(distBytes)} MB`)
  console.log(`[budget] Runtime GLB files: ${glbFiles.length}`)

  if (glbFiles.length === 0) {
    console.warn('[budget] Warning: no runtime GLB assets found yet under public/assets/runtime/.')
  }

  if (distBytes > MAX_BYTES) {
    throw new Error(
      `[budget] Build size ${bytesToMb(distBytes)} MB exceeds limit ${bytesToMb(MAX_BYTES)} MB.`
    )
  }

  console.log(`[budget] OK: build is within ${bytesToMb(MAX_BYTES)} MB budget.`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
