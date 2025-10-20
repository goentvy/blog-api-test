import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "../lib/axios";

export default function PostEditor() {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [category, setCategory] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [markdown, setMarkdown] = useState('')

    const handleSubmit = async() => {
        try {
            await axios.post('/posts', {
                title,
                slug,
                category,
                imageUrl,
                markdownContent: markdown,
                author: 'Entvy',
            })
            alert('글이 성공적으로 등록되었습니다!')
        } catch (err) {
            console.error('글 등록 실패: ', err)
            alert('등록 중 오류가 발생했습니다.')
        }
    }

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">✏️ 글 작성</h2>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목"
                className="w-full border p-2 rounded"
            />
            <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="슬러그"
                className="w-full border p-2 rounded"
            />
            <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="카테고리 (예: React, Spring)"
                className="w-full border p-2 rounded"
            />
            <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="대표 이미지 URL"
                className="w-full border p-2 rounded"
            />
            <MDEditor value={markdown} onChange={(v) => setMarkdown(v || '')} height={400} />
            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                등록하기
            </button>
        </div>
    )
}