import { useEffect, useState } from 'react'
import axios from '../lib/axios'
import MarkdownViewer from '../components/MarkdownViewer'

function PostDetail() {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    axios.get('/posts/52')
      .then(res => setMarkdown(res.data.markdownContent))
      .catch(err => console.error('API 오류:', err))
  }, [])

  return (
    <div>
      <h2>포스트 상세</h2>
      <MarkdownViewer content={markdown} />
    </div>
  )
}

export default PostDetail