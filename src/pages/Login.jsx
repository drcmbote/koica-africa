import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password123') {
      setError('');
      navigate('/dashboard');
    } else {
      setError('ID나 Password를 다시 확인해주세요');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 font-sans">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">아이디</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="아이디 입력"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="비밀번호 입력"
          />
        </div>
        {error && <p className="text-error text-center mb-4">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          로그인
        </button>
      </form>
    </div>
  );
}

export default Login;