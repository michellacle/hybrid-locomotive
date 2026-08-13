import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return { base: '/' }
  }

  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'hybrid-locomotive'

  return {
    base: `/${repoName}/`,
  }
})
