import React from 'react';

interface MemberAvatarProps {
  src: string;
  alt?: string;
}

export function MemberAvatar({ src, alt = "Member" }: MemberAvatarProps) {
  return (
    <img 
      src={src} 
      alt={alt}
      className="w-8 h-8 rounded-full border-2 border-white"
    />
  );
}