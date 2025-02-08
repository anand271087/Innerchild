import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { updatePassword } from '../../services/auth';
import { validatePassword } from '../../utils/validation';
import { supabase } from '../../services/supabase';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionSet, setIsSessionSet] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const setupSession = async () => {
      try {
        // Check if we have a valid session first
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsSessionSet(true);
          return;
        }

        // Get the query parameters from the URL
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        const type = queryParams.get('type');

        if (!token || type !== 'recovery') {
          console.error('Invalid or missing token/type in URL');
          setError('Invalid password reset link. Please request a new one.');
          return;
        }

        // Verify the token
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token,
          type: 'recovery'
        });

        if (verifyError) {
          console.error('Token verification error:', verifyError);
          setError('Invalid or expired reset link. Please request a new password reset.');
          return;
        }

        setIsSessionSet(true);
      } catch (err) {
        console.error('Setup error:', err);
        setError('Failed to process password reset link. Please try again.');
      }
    };

    setupSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isSessionSet) {
      setError('Please use a valid password reset link');
      return;
    }

    // Validate password
    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(password);
      
      // Sign out after password update
      await supabase.auth.signOut();
      
      // Redirect to login with success message
      navigate('/login', { 
        state: { message: 'Password updated successfully. Please log in with your new password.' }
      });
    } catch (err: any) {
      console.error('Password update error:', err);
      setError(err.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-magical"
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-4"
          >
            <div className="w-12 h-12 rounded-full bg-healing-ocean/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-healing-ocean" />
            </div>
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Update Your Password
          </h2>
          <p className="text-gray-600">
            Please enter your new password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center p-4 text-red-800 bg-red-50 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-healing-ocean focus:border-healing-ocean sm:text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-healing-ocean focus:border-healing-ocean sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !isSessionSet}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-healing-ocean hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healing-ocean disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}