import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PostDetail from './pages/PostDetail'
import PostList from './pages/PostList'
import PostEditor from './pages/PostEditor'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:category" element={<PostDetail />} />
        <Route path="/editor" element={<PostEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App