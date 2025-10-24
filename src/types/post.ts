export interface Post {
  id: number
  title: string
  slug: string
  author: string
  category: string
  imageUrl: string
  createdAt: string
}

export interface PostMarkDown {
  title: string
  author: string
  category: string
  imageUrl: string
  createdAt: string
  markdownContent: string
}