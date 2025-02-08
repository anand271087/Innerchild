import React from 'react';

interface AuthInputProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  required?: boolean;
}

export function AuthInput({
  id,
  type,
  label,
  value,
  onChange,
  icon,
  required
}: AuthInputProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={type === 'password' ? 'new-password' : id}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-healing-ocean focus:border-healing-ocean focus:z-10 sm:text-sm"
          placeholder={label}
        />
      </div>
    </div>
  );
}