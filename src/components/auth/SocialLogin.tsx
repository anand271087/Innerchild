import React from 'react';

interface SocialLoginProps {
  onError: (error: string) => void;
}

export default function SocialLogin({ onError: _ }: SocialLoginProps) {
  return null; // Component no longer renders anything
}