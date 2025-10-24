import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from '../lib/axios'
import MarkdownViewer from "../components/MarkdownViewer"
import { resolveImageUrl } from '../lib/image'
import type { PostMarkDown } from "../types/post"

export default function PostDetail() {
  const { slugparam } = useParams()
  const [post, setPost] = useState<PostMarkDown | null>(null)

  useEffect(() => {
    axios.get(`/posts/slug/${slugparam}`)
      .then(res => setPost(res.data))
      .catch(err => console.error('글 불러오기 실패: ', err))
  }, [slugparam])

  if(!post) return <div className="p-6">글을 불러오는 중입니다...</div>

  return (
    <div className="p-6 space-y-4">
      {/* <img src={resolveImageUrl(post.imageUrl)} alt={post.title} className="w-full h-64 object-cover rounded" /> */}
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="text-sm text-gray-500">
        작성자: {post.author} · 카테고리: <Link to={`/category/${post.category}`} className="underline">{post.category}</Link> · {new Date(post.createdAt).toLocaleDateString()}
      </div>
      <MarkdownViewer content={post.markdownContent} />
      <Link to={`/editor/${slugparam}`} className="inline-block mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
        ✏️ 수정하기
      </Link>
    </div>
  )
}