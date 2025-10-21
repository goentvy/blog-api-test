import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../lib/axios";
import MDEditor from "@uiw/react-md-editor";

export default function PostEditor() {
    const { slugparam } = useParams()
    const navigate = useNavigate()
    console.log(slugparam)

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [category, setCategory] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [markdown, setMarkdown] = useState('')
    const [isEditMode, setIsEditMode] = useState(false)

    useEffect(() => {
        if (slugparam) {
            setIsEditMode(true)
            axios.get(`/posts/slug/${slugparam}`)
                .then(res => {
                    const post = res.data
                    console.log(post)
                    setTitle(post.title)
                    setSlug(post.slug)
                    setCategory(post.category)
                    setImageUrl(post.imageUrl)
                    setMarkdown(post.markdownContent)
                })
                .catch(err => console.error('글 불러오기 실패:' ,  err))
        }
    }, [slugparam])

    const handleSubmit = async() => {
        try {
            if(isEditMode) {
                await axios.put(`/posts/slug/${slugparam}`, {
                    title,
                    slug,
                    category,
                    imageUrl,
                    markdownContent: markdown,
                    author: 'Entvy',
                })
                alert('글이 수정되었습니다.')
            } else {
                await axios.post('/posts', {
                    title,
                    slug,
                    category,
                    imageUrl,
                    markdownContent: markdown,
                    author: 'Entvy',
                })
                alert('글이 성공적으로 등록되었습니다!')
            }
            navigate('/')
        } catch (err) {
            console.error('글 등록 실패: ', err)
            alert('등록 중 오류가 발생했습니다.')
        }
    }

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">{isEditMode ? '✏️글 수정' : '✏️ 글 작성'}</h2>
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
                placeholder="카테고리"
                className="w-full border p-2 rounded"
            />
            <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="이미지 URL"
                className="w-full border p-2 rounded"
            />
            <MDEditor value={markdown} onChange={(v) => setMarkdown(v || '')} height={400} />
            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {isEditMode ? '수정하기' : '등록하기'}
            </button>
        </div>
    )
}