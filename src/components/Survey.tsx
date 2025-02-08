import React from 'react';
import { ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Survey() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('showAuth', { 
        detail: { returnPath: '/assessment' }
      }));
      return;
    }
    navigate('/assessment');
  };

  return (
    <section id="inner-child-survey" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Inner Child Assessment
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover your inner child pattern and receive personalized healing recommendations
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="prose prose-lg mx-auto text-gray-500">
              <p>
                Our comprehensive assessment helps you understand:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-8">
                <li>Your inner child's primary pattern</li>
                <li>Core emotional triggers and responses</li>
                <li>Personalized healing recommendations</li>
                <li>Specific areas for growth and development</li>
              </ul>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleStartAssessment}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-healing-ocean hover:bg-opacity-90 transition-colors"
              >
                <ClipboardList className="w-5 h-5 mr-2" />
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}