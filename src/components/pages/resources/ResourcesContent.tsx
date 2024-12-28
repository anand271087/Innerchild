import React from 'react';
import ReadingMaterials from './content/ReadingMaterials';
import VideoContent from './content/VideoContent';
import AudioResources from './content/AudioResources';
import FeaturedContent from './content/FeaturedContent';

interface ResourcesContentProps {
  activeSection: string;
}

export default function ResourcesContent({ activeSection }: ResourcesContentProps) {
  return (
    <div className="lg:col-span-3 p-8">
      {activeSection === 'reading' && <ReadingMaterials />}
      {activeSection === 'videos' && <VideoContent />}
      {activeSection === 'audio' && <AudioResources />}
      {activeSection === 'featured' && <FeaturedContent />}
    </div>
  );
}