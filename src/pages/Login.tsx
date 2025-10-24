import { useState } from 'react'
import axios from '../lib/axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/auth/login', {
        username,
        password,
      })
      login(response.data.token)
      navigate('/')
    } catch (err) {
      setError('로그인 실패. 아이디 또는 비밀번호를 확인하세요.')
      console.error(err);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>

        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          로그인
        </button>
      </form>
    </div>
  )
}

export default Login