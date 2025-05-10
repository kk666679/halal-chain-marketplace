"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle, FaUsers, FaGlobeAsia, FaAward, FaHandshake } from 'react-icons/fa';

export default function About() {
  const milestones = [
    {
      year: 2024,
      title: "Foundation",
      description: "HalalChain was founded with a vision to revolutionize halal certification through blockchain technology."
    },
    {
      year: 2025,
      title: "Initial Platform Launch",
      description: "Launched the first version of our blockchain-based certification platform with basic supply chain tracking."
    },
    {
      year: 2025,
      title: "AI Integration",
      description: "Introduced our multi-agent AI system to optimize supply chain operations and enhance fraud detection."
    },
    {
      year: 2025,
      title: "Quantum & Neural Expansion",
      description: "Implemented quantum-resistant security and neural interface technology for enhanced product verification."
    }
  ];
  
  const team = [
    {
      name: "Kurnia Kadir",
      title: "CEO & Founder",
      image: "/images/team/kurnia-kadir.jpg",
      bio: "Former tech executive with 15+ years in supply chain management and blockchain technology."
    },
    {
      name: "Vacant",
      title: "Chief Technology Officer",
      image: "/images/team/vacafdj.jpg",
      bio: "Quantum computing expert with a Ph.D. in Computer Science and 10+ years in cryptographic security."
    },
    {
      name: "Vacant",
      title: "Head of Neural Interface Research",
      image: "/images/team/vacanbt.jpg",
      bio: "Neuroscientist and AI researcher specializing in human-computer interaction and sensory interfaces."
    },
    {
      name: "Vacant",
      title: "Chief Compliance Officer",
      image: "/images/team/Vacant.jpg",
      bio: "Expert in international halal standards with 20+ years of experience in certification and compliance."
    }
  ];
  
  const partners = [
    {
      name: "Global Halal Authority",
      logo: "/images/partners/global-halal-authority.png",
      type: "Certification Body"
    },
    {
      name: "QuantumTech Solutions",
      logo: "/images/partners/quantum-tech.png",
      type: "Technology Partner"
    },
    {
      name: "Islamic Development Bank",
      logo: "/images/partners/islamic-development-bank.png",
      type: "Financial Partner"
    },
    {
      name: "World Halal Forum",
      logo: "/images/partners/world-halal-forum.png",
      type: "Industry Association"
    },
    {
      name: "Neural Interfaces Inc.",
      logo: "/images/partners/neural-interfaces.png",
      type: "Technology Partner"
    },
    {
      name: "Sustainable Supply Chain Alliance",
      logo: "/images/partners/sustainable-alliance.png",
      type: "Sustainability Partner"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About HalalChain</h1>
              <p className="text-xl mb-8">
                We're revolutionizing halal certification and supply chain transparency through 
                quantum-secure blockchain technology, neural interfaces, and AI-powered verification.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <FaUsers className="text-xl" />
                  </div>
                  <span className="text-lg">10,000+ Vendors</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <FaGlobeAsia className="text-xl" />
                  </div>
                  <span className="text-lg">37 Countries</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <FaAward className="text-xl" />
                  </div>
                  <span className="text-lg">12 Industry Awards</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-80 w-full">
                <Image
                  src="/images/about-hero.png"
                  alt="HalalChain Team"
                  fill
                  style={{objectFit: "contain"}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At HalalChain, our mission is to create the world's most trusted and transparent halal certification 
                ecosystem, ensuring that consumers worldwide can confidently purchase authentic halal products.
              </p>
              <p className="text-gray-600 mb-6">
                We believe that by combining cutting-edge technology with rigorous halal standards, we can revolutionize 
                the way halal products are certified, tracked, and verified throughout the global supply chain.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3" />
                  <span>Ensure 100% authenticity and transparency in halal certification</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3" />
                  <span>Empower consumers with direct verification capabilities</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3" />
                  <span>Support vendors in maintaining halal compliance</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-600 mt-1 mr-3" />
                  <span>Promote global standardization of halal certification</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative h-80 w-full">
                <Image
                  src="/images/mission.png"
                  alt="Our Mission"
                  fill
                  style={{objectFit: "contain"}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Journey */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>
            
            {/* Milestones */}
            <div className="space-y-24 relative">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2 relative">
                    <div className={`${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-2xl font-bold text-green-600 mb-2">{milestone.year}</h3>
                        <h4 className="text-xl font-semibold mb-3">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Center dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-600 rounded-full border-4 border-white flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  
                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-md transition-transform hover:transform hover:scale-105">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{objectFit: "cover"}}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Our Partners</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We collaborate with leading organizations across the globe to build a robust halal certification ecosystem.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center">
                <div className="relative h-24 w-full mb-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    style={{objectFit: "contain"}}
                  />
                </div>
                <h3 className="text-lg font-bold text-center mb-1">{partner.name}</h3>
                <p className="text-green-600 text-sm text-center">{partner.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join Us */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the HalalChain Revolution</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you're a producer, retailer, certifier, or consumer, become part of our mission to transform 
            the halal industry through technology and transparency.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/vendor/register" className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
              Become a Vendor
            </Link>
            <Link href="/contact" className="bg-transparent hover:bg-green-700 border-2 border-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Leadership Team</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Our diverse team of experts brings together decades of experience in blockchain technology, 
            halal certification, quantum computing, and neural interface research.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="h-64 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{objectFit: "cover"}}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.title}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Our Partners</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We collaborate with leading organizations across the halal ecosystem to ensure the highest 
            standards of certification, technology, and sustainability.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 relative mb-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    style={{objectFit: "contain"}}
                  />
                </div>
                <h3 className="font-medium mb-1">{partner.name}</h3>
                <p className="text-sm text-gray-500">{partner.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join Us */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the HalalChain Ecosystem</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a vendor, certifier, or consumer, there's a place for you in our growing ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/vendor/register" className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300">
              Become a Vendor
            </Link>
            <Link href="/contact" className="bg-transparent hover:bg-green-600 border-2 border-white font-bold py-3 px-6 rounded-lg transition duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}