import React from 'react';

interface Bookmark {
  name: string;
  href: string;
}

interface BookmarkMenuProps {
  bookmarks: Bookmark[];
}

export function BookmarkMenu({ bookmarks }: BookmarkMenuProps) {
  return (
    <div className="mt-12 flex justify-center">
      <nav className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 max-w-full overflow-x-auto">
        <ul className="flex space-x-1 whitespace-nowrap">
          {bookmarks.map((bookmark) => (
            <li key={bookmark.name}>
              <a
                href={bookmark.href}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-healing-ocean hover:bg-healing-ocean/10 rounded-md transition-colors inline-block"
              >
                {bookmark.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}