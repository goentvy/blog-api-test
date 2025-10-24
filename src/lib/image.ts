const IMAGE_BASE_URL = 'https://entvy-blog.onrender.com/api/image'

export const resolveImageUrl = (path: string) => {
    if(!path) return ''
    const filename = path.split('/').pop() // 파일명만 추출
    return `${IMAGE_BASE_URL}/${filename}`
}