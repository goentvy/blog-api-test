import axios from "../lib/axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { resolveImageUrl } from "../lib/image"
import type { Post } from '../types/post'
import Thumbnail from "../components/Thumbnail"

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("목록 불러오기 실패", err))
  }, [])

  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/posts/${id}`)
        setPosts((prev) => prev.filter((post) => post.id !== id))
      } catch (err) {
        console.error("삭제 실패", err)
      }
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📚 블로그 글 목록</h2>
        <button
          onClick={() => navigate("/editor")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ✍️ 글 작성
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">제목</th>
              <th className="px-4 py-3 text-left">작성자</th>
              <th className="px-4 py-3 text-left">카테고리</th>
              <th className="px-4 py-3 text-left">작성일</th>
              <th className="px-4 py-3 text-left">이미지</th>
              <th className="px-4 py-3 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t hover:bg-gray-50">
                <td
                  className="px-4 py-3 text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate(`/posts/slug/${post.slug}`)}
                >
                  {post.title}
                </td>
                <td className="px-4 py-3 text-gray-800">{post.author}</td>
                <td className="px-4 py-3 text-gray-800">{post.category}</td>
                <td className="px-4 py-3 text-gray-800">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {post.imageUrl ? (
                    <Thumbnail imageUrl={resolveImageUrl(post.imageUrl)} />
                  ) : (
                    <span className="text-gray-400">없음</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => navigate(`/posts/slug/${post.slug}`)}
                    className="text-blue-500 hover:underline"
                  >
                    상세
                  </button>
                  <button
                    onClick={() => navigate(`/editor/${post.slug}`)}
                    className="text-green-500 hover:underline"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 hover:underline"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}