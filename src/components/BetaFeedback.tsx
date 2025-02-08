import React, { useState } from 'react';
import { Save, Check, Star, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store/authStore';

export default function BetaFeedback() {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Please sign in to submit feedback');
      return;
    }

    if (!rating) {
      setError('Please select a rating');
      return;
    }

    if (!message.trim()) {
      setError('Please provide feedback');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // First verify we can connect to Supabase
      const { error: healthCheckError } = await supabase
        .from('soul_chat_feedback')
        .select('count')
        .limit(1);

      if (healthCheckError) {
        console.error('Supabase health check failed:', healthCheckError);
        throw new Error('Unable to connect to feedback service');
      }

      // Attempt to insert the feedback
      const { error: submitError } = await supabase
        .from('soul_chat_feedback')
        .insert([{
          user_id: user.id,
          rating,
          feedback: message.trim()
        }]);

      if (submitError) {
        console.error('Feedback submission error:', submitError);
        throw submitError;
      }
      
      setIsSubmitted(true);
      setRating(0);
      setMessage('');
    } catch (err: any) {
      console.error('Failed to submit feedback:', err);
      setError(err.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-healing-mint via-healing-lavender to-healing-blush">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Share Your Soul Chat Experience</h2>
            <p className="text-xl text-gray-600">
              Your feedback helps us improve and grow
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-gray-600">
                Your feedback helps make Soul Chat better for everyone.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you rate your experience?
                </label>
                <div className="flex items-center justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      className={`p-2 rounded-full transition-colors ${
                        rating >= value
                          ? 'text-healing-ocean'
                          : 'text-gray-300 hover:text-gray-400'
                      }`}
                    >
                      <Star className="w-8 h-8" fill={rating >= value ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-healing-ocean focus:ring-healing-ocean"
                  placeholder="Share your thoughts about Soul Chat..."
                  required
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !rating || !message.trim()}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-healing-ocean hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-healing-ocean disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}