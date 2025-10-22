import axios from "../lib/axios"
import { useEffect, useState } from "react"
import PostCard from "../components/PostCard"

interface Post {
    id: number
    title: string
    slug: string
    author: string
    category: string
    imageUrl: string
    createdAt: string
}

export default function PostList() {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        axios.get('/posts')
            .then(res => setPosts(res.data))
            .catch(err => console.error('목록 불러오기 실패', err))
    }, [])

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">📚 블로그 글 목록</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                    <PostCard key={post.id} {...post} />
                ))}
            </div>
        </div>
    )
}