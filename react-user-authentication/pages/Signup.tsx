
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/Card';

import { signupNewUserThunk } from '../redux/thunk/user.thunk';

import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [is_blocked, setIs_blocked] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const signupResult = await dispatch(signupNewUserThunk({ f_name: firstName, l_name: lastName, e_mail: email, password, is_blocked })).unwrap();
      if (signupResult && signupResult.status == 200 && signupResult.success === true) {
        navigate('/login');
      } else if (signupResult && signupResult.status == 200 && signupResult.success === false) {
        setError(signupResult.message);
      }
    } catch (err: any) {
      console.log("setError------------", err )
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const successfulCreateMessage = () => {
    setSuccess('Account created successfully! Redirecting to login...');
    setTimeout(() => navigate('/login'), 2000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <Card>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Create Account</h1>
          <p className="text-slate-500 mt-2">Get started with your new account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center">{error}</p>}
          {success && <p className="bg-green-100 text-green-700 p-3 rounded-lg text-center">{success}</p>}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-slate-600">First Name</label>
              <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-slate-600">Last Name</label>
              <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-600">Email Address</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-600">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
          </div>
          <button type="submit" disabled={loading} className="w-full flex justify-center mt-4 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
