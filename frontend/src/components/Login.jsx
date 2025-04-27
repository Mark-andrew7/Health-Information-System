import { useState, useContext } from 'react';
  import { useNavigate } from 'react-router-dom';
  import api, { setAuthToken } from '../utils/api';
  import { AuthContext } from '../context/AuthContext';

  function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await api.post('/auth/login', { username, password });
        setAuthToken(res.data.token);
        login(res.data.token);
        navigate('/search');
      } catch (err) {
        setError(err.response?.data?.error || 'Login failed');
      }
    };

    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-secondary">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-secondary">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  export default Login;