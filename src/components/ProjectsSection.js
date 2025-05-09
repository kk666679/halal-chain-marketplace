import React from 'react';
import Link from 'next/link';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Halal Supply Chain Tracker',
      description: 'Blockchain-based solution for end-to-end halal product traceability.',
      status: 'Active',
      developerCount: 12,
      slug: 'supply-chain',
      imagePath: '/images/projects/supply-chain.png'
    },
    {
      title: 'Certification Verification API',
      description: 'API for verifying halal certifications across multiple jurisdictions.',
      status: 'Planning',
      developerCount: 8,
      slug: 'certification-api',
      imagePath: '/images/projects/certification.png'
    },
    {
      title: 'Consumer Trust Platform',
      description: 'Mobile app for consumers to verify halal products via blockchain.',
      status: 'Completed',
      developerCount: 15,
      slug: 'consumer-trust',
      imagePath: '/images/projects/consumer.png'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Link href="/projects" className="text-green-600 hover:text-green-800 font-medium">
            View All Projects →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;