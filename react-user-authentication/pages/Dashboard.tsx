
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { storeLocalData, getLocalData } from '../utils/util.utils';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const {
    token = '',
    userDetails,
  } = useAppSelector(state => state.userReducer);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const data = getLocalData('user_details');
    if (data) {
      // console.log("Stored user details:", data);
    }
  }, []);


  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="bg-slate-800 shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div>
            <Link to="/profile" className="text-indigo-400 hover:text-indigo-300 mr-4 transition">Profile</Link>
            <button onClick={handleLogout} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition">
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-6 py-12 flex items-center justify-center">
        <div className="bg-slate-800 p-12 rounded-2xl shadow-2xl text-center max-w-2xl w-full">
          <h2 className="text-5xl font-extrabold mb-4">
            Welcome, {userDetails?.f_name}!
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            We're glad to have you here. You can manage your account and view your details from your profile page.
          </p>
          <div className="bg-slate-700 p-6 rounded-lg mb-8 text-left">
            <h3 className="font-bold text-lg mb-2 text-indigo-400">Your User ID:</h3>
            <p className="font-mono bg-slate-900 p-3 rounded-md">{userDetails?.e_mail}</p>
          </div>
          <Link
            to="/profile"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Go to Profile
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
