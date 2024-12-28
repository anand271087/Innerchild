import React from 'react';

export function PasswordRequirements() {
  return (
    <ul className="text-xs text-gray-500 mt-1 list-disc list-inside">
      <li>At least 6 characters long</li>
      <li>One uppercase letter</li>
      <li>One lowercase letter</li>
      <li>One number</li>
    </ul>
  );
}