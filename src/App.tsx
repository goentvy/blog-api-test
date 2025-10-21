import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PostDetail from './pages/PostDetail'
import PostList from './pages/PostList'
import PostEditor from './pages/PostEditor'
import CategoryPosts from './pages/CategoryPosts'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
        {/* <Route path="/posts/:category" element={<PostDetail />} /> */}
        <Route path="/posts/slug/:slugparam" element={<PostDetail />} />
        <Route path="/category/:name" element={<CategoryPosts />} />
        <Route path="/editor" element={<PostEditor />} />
        <Route path="/editor/:slugparam" element={<PostEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App