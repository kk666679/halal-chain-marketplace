import Link from 'next/link';
import { FaBuilding, FaCode, FaStore, FaGraduationCap, FaFlask, FaGlobeAmericas } from 'react-icons/fa';

export default function PortalsSection() {
  const portals = [
    {
      icon: <FaBuilding className="text-white text-3xl" />,
      title: "Government Portal",
      description: "Advanced regulatory dashboard with AI-powered compliance monitoring, real-time supply chain visibility, and quantum-secure verification tools.",
      color: "bg-blue-600",
      link: "/portals/government",
      new: false
    },
    {
      icon: <FaCode className="text-white text-3xl" />,
      title: "Developer Hub",
      description: "Next-generation API ecosystem with quantum-resistant authentication, neural interface SDKs, and holographic AR integration tools.",
      color: "bg-purple-600",
      link: "/portals/developer",
      new: false
    },
    {
      icon: <FaStore className="text-white text-3xl" />,
      title: "Vendor Dashboard",
      description: "AI-enhanced management interface with predictive analytics, autonomous inventory optimization, and carbon footprint monitoring.",
      color: "bg-green-600",
      link: "/portals/vendor",
      new: false
    },
    {
      icon: <FaGraduationCap className="text-white text-3xl" />,
      title: "Education Portal",
      description: "Interactive learning platform with AR/VR training modules on halal standards, supply chain management, and blockchain certification.",
      color: "bg-red-600",
      link: "/portals/education",
      new: true
    },
    {
      icon: <FaFlask className="text-white text-3xl" />,
      title: "Research Hub",
      description: "Collaborative platform for halal certification research, with quantum computing resources and AI-assisted analysis tools.",
      color: "bg-yellow-600",
      link: "/portals/research",
      new: true
    },
    {
      icon: <FaGlobeAmericas className="text-white text-3xl" />,
      title: "Global Standards Portal",
      description: "Unified interface for managing compliance with halal standards across 120+ countries with real-time regulatory updates.",
      color: "bg-indigo-600",
      link: "/portals/standards",
      new: true
    }
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Enhanced Multi-Portal Ecosystem</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Specialized interfaces for different stakeholders in the halal certification ecosystem,
            now with neural interfaces and quantum-secure authentication.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portals.map((portal, index) => (
            <div key={index} className="flex flex-col h-full transform hover:scale-105 transition-transform duration-300">
              <div className={`${portal.color} rounded-t-lg p-6 flex justify-center relative`}>
                {portal.new && (
                  <div className="absolute top-2 right-2 bg-white text-xs font-bold text-gray-800 px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  {portal.icon}
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-6 flex-grow shadow-md">
                <h3 className="text-xl font-semibold mb-3">{portal.title}</h3>
                <p className="text-gray-600 mb-6">{portal.description}</p>
                <Link 
                  href={portal.link}
                  className="mt-auto inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded transition duration-300"
                >
                  Access Portal
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Our expanded portal ecosystem now supports neural interfaces, holographic displays, and quantum-secure 
            authentication for a seamless and secure experience across all stakeholder touchpoints.
          </p>
          <Link 
            href="/portals"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
          >
            Explore All Portals
          </Link>
        </div>
      </div>
    </section>
  );
}