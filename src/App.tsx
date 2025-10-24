import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PostDetail from './pages/PostDetail'
import PostList from './pages/PostList'
import PostEditor from './pages/PostEditor'
import CategoryPosts from './pages/CategoryPosts'
import Login from './pages/Login'
import { useAuth } from './hooks/useAuth'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      <main className="container mx-auto max-w-screen-xl px-4 py-6">
        <Routes>
          {/* 메인화면 */}
          <Route path="/" element={isAuthenticated ? <PostList /> : <Login />} />
          {/* 카테고리 글 상세 페이지 */}
          <Route path="/posts/:category" element={<PostDetail />} />
          {/* 기존 글 상세 페이지 */}
          <Route path="/posts/slug/:slugparam" element={<PostDetail />} />
          {/* 카테고리 필터링된 리스트 */}
          <Route path="/category/:name" element={<CategoryPosts />} />
          {/* 글 작성 */}
          <Route path="/editor" element={<PostEditor />} />
          {/* 기존 글 수정 */}
          <Route path="/editor/:slugparam" element={<PostEditor />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App