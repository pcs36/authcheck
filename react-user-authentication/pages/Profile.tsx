
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Profile: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const {
        userDetails,
      } = useAppSelector(state => state.userReducer);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!userDetails) {
    return null; // Or a loading spinner, though ProtectedRoute should prevent this
  }
  
  const DetailItem: React.FC<{label: string, value: string}> = ({label, value}) => (
    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
      <dt className="text-sm font-medium text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm text-white sm:col-span-2 sm:mt-0">{value}</dd>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
       <header className="bg-slate-800 shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/dashboard" className="text-xl font-bold hover:text-indigo-400 transition">My App</Link>
          <div>
            <Link to="/dashboard" className="text-indigo-400 hover:text-indigo-300 mr-4 transition">Dashboard</Link>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition">
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="bg-slate-800 overflow-hidden shadow-2xl rounded-2xl max-w-4xl mx-auto">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-2xl font-bold leading-6 text-white">User Profile</h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-400">Your personal account details.</p>
          </div>
          <div className="border-t border-slate-700 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-slate-700">
              <div className="px-4 sm:px-6"><DetailItem label="First Name" value={userDetails.f_name} /></div>
              <div className="px-4 sm:px-6"><DetailItem label="Last Name" value={userDetails.l_name} /></div>
              <div className="px-4 sm:px-6"><DetailItem label="User ID (Email)" value={userDetails.e_mail} /></div>
              <div className="px-4 sm:px-6"><DetailItem label="Password" value="•••••••• (Hidden for security)" /></div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
