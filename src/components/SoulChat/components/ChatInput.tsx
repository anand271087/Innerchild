import React, { useState } from 'react';
import { MessageCircle, Sparkles, Loader2 } from 'lucide-react';
import { useChatActions } from '../hooks/useChatActions';
import type { JourneyEntry } from '../../../types/history';

interface ChatInputProps {
  onSuccess: (journey: JourneyEntry) => void;
}

export function ChatInput({ onSuccess }: ChatInputProps) {
  const [inputText, setInputText] = useState('');
  const { handleSubmit, isLoading, error } = useChatActions();

  const onSubmit = async () => {
    if (!inputText.trim() || isLoading) return;
    const journey = await handleSubmit(inputText);
    if (journey) {
      onSuccess(journey);
      setInputText('');
    }
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Begin Your Inner Healing Journey</h1>
        <p className="text-xl text-gray-600 mb-8">
          Share what's on your mind, and receive personalized healing insights to support your growth.
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Share what's on your mind..."
          className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-healing-ocean focus:border-transparent"
        />

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          onClick={onSubmit}
          disabled={isLoading || !inputText.trim()}
          className="w-full py-3 bg-healing-ocean text-white rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Begin Analysis
            </>
          )}
        </button>
      </div>
    </div>
  );
}