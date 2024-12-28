import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { signup } from '../../services/auth';
import { PasswordRequirements } from './components/PasswordRequirements';
import { AuthInput } from './components/AuthInput';

interface SignupPageProps {
  isModal?: boolean;
  onSwitchMode?: () => void;
  onSuccess?: () => void;
}

export default function SignupPage({ isModal, onSwitchMode, onSuccess }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const user = await signup(email, password, name);
      setUser(user);
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const content = (
    <>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <button
            onClick={onSwitchMode}
            className="font-medium text-healing-ocean hover:text-healing-ocean/80"
          >
            sign in to your account
          </button>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="flex items-center p-4 text-red-800 bg-red-50 rounded-lg">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="rounded-md shadow-sm space-y-4">
          <AuthInput
            id="name"
            type="text"
            label="Full name"
            value={name}
            onChange={setName}
            icon={<User className="h-5 w-5 text-gray-400" />}
            required
          />

          <AuthInput
            id="email"
            type="email"
            label="Email address"
            value={email}
            onChange={setEmail}
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            required
          />

          <div>
            <AuthInput
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={setPassword}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              required
            />
            <PasswordRequirements />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-healing-ocean hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healing-ocean disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <UserPlus className="h-5 w-5 text-healing-ocean/50 group-hover:text-healing-ocean/70" />
            </span>
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
    </>
  );

  if (isModal) {
    return content;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        {content}
      </motion.div>
    </div>
  );
}