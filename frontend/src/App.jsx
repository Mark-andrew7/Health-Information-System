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
        <div className="min-h-screen bg-background">
          <nav className="bg-primary text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold">Health System</Link>
              <div className="flex space-x-6">
                <Link to="/register" className="px-3 py-1 text-white hover:bg-blue-600 hover:underline rounded transition">Register</Link>
                <Link to="/login" className="px-3 py-1 text-white hover:bg-blue-600 hover:underline rounded transition">Login</Link>
                <Link to="/programs" className="px-3 py-1 text-white hover:bg-blue-600 hover:underline rounded transition">Programs</Link>
                <Link to="/clients" className="px-3 py-1 text-white hover:bg-blue-600 hover:underline rounded transition">Register Client</Link>
                <Link to="/enroll" className="px-3 py-1 text-white hover:bg-blue-600 hover:underline rounded transition">Enroll</Link>
                <Link to="/search" className="px-3 py-1 text-white hover:bg-blue-600 hover:underline rounded transition">Search</Link>
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
              <Route path="/" element={
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
                  <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Health System</h1>
                  <p className="text-lg text-secondary">Manage health programs, clients, and enrollments with ease.</p>
                </div>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;