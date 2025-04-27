import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProgramForm from './components/ProgramForm';
import ClientForm from './components/ClientForm';
import EnrollmentForm from './components/EnrollmentForm';
import ClientSearch from './components/ClientSearch';
import ClientProfile from './components/ClientProfile';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <nav className="bg-primary text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold">Health System</Link>
              <div className="space-x-4">
                <Link to="/register" className="hover:underline">Register</Link>
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/programs" className="hover:underline">Programs</Link>
                <Link to="/clients" className="hover:underline">Register Client</Link>
                <Link to="/enroll" className="hover:underline">Enroll</Link>
                <Link to="/search" className="hover:underline">Search</Link>
              </div>
            </div>
          </nav>
          <div className="container mx-auto p-6">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/programs" element={<ProgramForm />} />
              <Route path="/clients" element={<ClientForm />} />
              <Route path="/enroll" element={<EnrollmentForm />} />
              <Route path="/search" element={<ClientSearch />} />
              <Route path="/profile/:id" element={<ClientProfile />} />
              <Route path="/" element={<h1 className="text-3xl font-bold text-center mt-10">Welcome to Health System</h1>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;