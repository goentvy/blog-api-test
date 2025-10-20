import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import axios from 'axios'

function escapeMarkdown(markdown: string): string {
  return markdown
    .replace(/\\/g, '\\\\')         // 백슬래시
    .replace(/"/g, '\\"')           // 큰따옴표
    .replace(/\n/g, '\\n')          // 줄바꿈
}

function MarkdownToJson() {
  const [markdown, setMarkdown] = useState('')
  const escaped = escapeMarkdown(markdown)

  return (
    <div className="p-6">
      <h2>🛠 Markdown → JSON 변환기</h2>
      <MDEditor value={markdown} onChange={(v) => setMarkdown(v || '')} />
      <h3 className="mt-4">✅ JSON-safe 문자열</h3>
      <textarea
        value={escaped}
        readOnly
        rows={10}
        className="w-full border p-2 font-mono bg-gray-100"
      />
      <button onClick={() => axios.post('/posts', { markdownContent: escaped })}>
        저장하기
      </button>
    </div>
  )
}

export default MarkdownToJson