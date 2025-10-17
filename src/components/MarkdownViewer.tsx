import MDEditor from '@uiw/react-md-editor'

interface Props {
  content: string
}

function MarkdownViewer({ content }: Props) {
  return (
    <div className="wmde-markdown-var">
      <MDEditor.Markdown source={content} className="p-6" />
    </div>
  )
}

export default MarkdownViewer