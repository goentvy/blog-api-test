// const IMAGE_BASE_URL = 'https://entvy-blog.onrender.com/api/image'

export const resolveImageUrl = (path: string) => {
  if (!path) return ''
  const filename = path.split('/').pop()
  const basePath = import.meta.env.DEV ? '' : '/blog-api-test'
  return `${basePath}/assets/thumbnails/${filename}`
}
