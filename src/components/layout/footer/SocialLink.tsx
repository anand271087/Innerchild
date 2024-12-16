import React, { ReactNode } from 'react';

interface SocialLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      className="text-gray-400 hover:text-healing-ocean transition-colors"
      aria-label={label}
    >
      {icon}
    </a>
  );
}