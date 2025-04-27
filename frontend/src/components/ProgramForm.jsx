import { useState, useContext } from 'react';
  import api, { setAuthToken } from '../utils/api';
  import { AuthContext } from '../context/AuthContext';

  function ProgramForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useContext(AuthContext);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setAuthToken(token);
        await api.post('/programs', { name, description });
        setMessage('Program created successfully!');
        setName('');
        setDescription('');
      } catch (err) {
        setMessage(err.response?.data?.error || 'Failed to create program');
      }
    };

    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Health Program</h2>
        {message && <p className={message.includes('success') ? 'text-green-500' : 'text-red-500'}>{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-secondary">Program Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-secondary">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Create Program
          </button>
        </form>
      </div>
    );
  }

  export default ProgramForm;