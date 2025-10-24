import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from '../lib/axios'
import type { Post } from '../types/post'

export default function CategoryPosts() {
    const { name } = useParams()
    const [ posts, setPosts ] = useState<Post[]>([])

    useEffect(() => {
        axios.get(`/posts/category/${name}`)
            .then(res => setPosts(res.data))
            .catch(err => console.error('카테고리 글 불러오기 실패: ', err))
    }, [name])

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">📂 카테고리: {name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                <Link to={`/posts/slug/${post.slug}`} key={post.id} className="border rounded shadow hover:shadow-md transition">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-500">{post.author}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                </Link>
                ))}
            </div>
        </div>

    )
}