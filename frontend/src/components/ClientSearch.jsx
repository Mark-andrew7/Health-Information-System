import { useState, useContext } from 'react';
  import { Link } from 'react-router-dom';
  import axios from 'axios';
  import { AuthContext } from '../context/AuthContext';

  function ClientSearch() {
    const [query, setQuery] = useState('');
    const [clients, setClients] = useState([]);
    const [error, setError] = useState('');
    const { token } = useContext(AuthContext);

    const handleSearch = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.get(`http://localhost:5000/api/clients/search?query=${query}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClients(res.data.clients);
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Search failed');
        setClients([]);
      }
    };

    return (
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Search Clients</h2>
        <form onSubmit={handleSearch} className="mb-6 flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or ID"
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clients.map((client) => (
            <Link
              to={`/profile/${client._id}`}
              key={client._id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">{client.firstName} {client.lastName}</h3>
              <p className="text-secondary">{client.contact}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  export default ClientSearch;