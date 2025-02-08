import React from 'react';
import { Save } from 'lucide-react';

interface JournalEntryProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  isSaving: boolean;
}

export default function JournalEntry({ value, onChange, onSave, isSaving }: JournalEntryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">✍️ Journal Entry</h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-healing-ocean focus:border-transparent"
        placeholder="Write your thoughts and feelings here..."
      />
      <button
        onClick={onSave}
        disabled={isSaving}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-healing-ocean hover:bg-opacity-90 disabled:opacity-50"
      >
        <Save className="w-4 h-4 mr-2" />
        {isSaving ? 'Saving...' : 'Save Journal Entry'}
      </button>
    </div>
  );
}