import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

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
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">📚 블로그 글 목록</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                    <Link to={`/posts/${post.slug}`} key={post.id} className="border rounded shadow hover:shadow-md transition">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-t" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <p className="text-sm text-gray-500">{post.category} · {post.author}</p>
                            <p className="text-xs text-gray-400 mt-1">{new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    )
}