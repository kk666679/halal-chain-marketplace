import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProjectCard = ({ 
  title, 
  description, 
  status, 
  developerCount, 
  slug,
  imagePath = '/images/projects/default.png'
}) => {
  // Status colors
  const statusColors = {
    'active': 'bg-green-600',
    'planning': 'bg-blue-600',
    'completed': 'bg-yellow-600',
    'on-hold': 'bg-red-600'
  };
  
  const statusColor = statusColors[status.toLowerCase()] || 'bg-gray-600';
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      <div className="h-48 bg-gray-100 relative">
        <Image
          src={imagePath}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className={`absolute top-4 right-4 ${statusColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
          {status}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{developerCount} Developers</span>
          <Link href={`/projects/${slug}`} className="text-green-600 hover:text-green-800">
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;