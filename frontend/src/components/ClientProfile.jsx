import { useState, useEffect, useContext } from 'react';
  import { useParams } from 'react-router-dom';
  import api, { setAuthToken } from '../utils/api';
  import { AuthContext } from '../context/AuthContext';

  function ClientProfile() {
    const { id } = useParams();
    const [client, setClient] = useState(null);
    const [enrollments, setEnrollments] = useState([]);
    const [error, setError] = useState('');
    const { token } = useContext(AuthContext);

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          setAuthToken(token);
          const res = await api.get(`/clients/${id}`);
          setClient(res.data.client);
          setEnrollments(res.data.enrollments);
        } catch (err) {
          setError(err.response?.data?.error || 'Failed to load profile');
        }
      };
      fetchProfile();
    }, [id, token]);

    if (!client) return <p>Loading...</p>;

    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Client Profile</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-4">
          <p><strong>Name:</strong> {client.firstName} {client.lastName}</p>
          <p><strong>Date of Birth:</strong> {new Date(client.dateOfBirth).toLocaleDateString()}</p>
          <p><strong>Gender:</strong> {client.gender}</p>
          <p><strong>Contact:</strong> {client.contact}</p>
        </div>
        <h3 className="text-xl font-semibold mt-6 mb-4">Enrollments</h3>
        {enrollments.length === 0 ? (
          <p>No enrollments found.</p>
        ) : (
          <ul className="space-y-4">
            {enrollments.map((enrollment) => (
              <li key={enrollment._id} className="p-4 bg-gray-50 rounded-lg">
                <p><strong>Program:</strong> {enrollment.programId.name}</p>
                <p><strong>Enrolled At:</strong> {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  export default ClientProfile;