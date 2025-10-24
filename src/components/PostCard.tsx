import { Link } from "react-router-dom"
import { resolveImageUrl } from "../lib/image"
import type { Post } from '../types/post'

const PostCard = ({ title, slug, author, category, imageUrl, createdAt}: Post) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all overflow-hidden">
            <div className="aspect-[4/3] bg-gray-100">
                <img src={resolveImageUrl(imageUrl)} alt={title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                    <span>#{category}</span>
                    <span>{new Date(createdAt).toLocaleDateString()}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-800 line-clamp-2">{title}</h2>
                <p className="text-sm text-gray-600">by {author}</p>
                <Link to={`/posts/${slug}`} className="text-sm text-blue-600 hover:underline font-medium">
                자세히 보기 →
                </Link>
            </div>
        </div>
    )
}

export default PostCard