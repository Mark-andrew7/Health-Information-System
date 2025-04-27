import { useState, useEffect, useContext } from 'react';
  import api, { setAuthToken } from '../utils/api';
  import { AuthContext } from '../context/AuthContext';

  function EnrollmentForm() {
    const [clients, setClients] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [formData, setFormData] = useState({ clientId: '', programId: '' });
    const [message, setMessage] = useState('');
    const { token } = useContext(AuthContext);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setAuthToken(token);
          const [clientRes, programRes] = await Promise.all([
            api.get('/clients/search'),
            api.get('/programs')
          ]);
          setClients(clientRes.data.clients);
          setPrograms(programRes.data);
        } catch (err) {
          setMessage('Failed to load data');
        }
      };
      fetchData();
    }, [token]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setAuthToken(token);
        await api.post('/enrollments', formData);
        setMessage('Enrollment successful!');
        setFormData({ clientId: '', programId: '' });
      } catch (err) {
        setMessage(err.response?.data?.error || 'Failed to enroll');
      }
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Enroll Client</h2>
        {message && <p className={message.includes('success') ? 'text-green-500' : 'text-red-500'}>{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-secondary">Client</label>
            <select
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.firstName} {client.lastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-secondary">Program</label>
            <select
              name="programId"
              value={formData.programId}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Program</option>
              {programs.map((program) => (
                <option key={program._id} value={program._id}>{program.name}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Enroll
          </button>
        </form>
      </div>
    );
  }

  export default EnrollmentForm;