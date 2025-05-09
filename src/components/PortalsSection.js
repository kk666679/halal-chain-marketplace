import Link from 'next/link';
import { FaBuilding, FaCode, FaStore } from 'react-icons/fa';

export default function PortalsSection() {
  const portals = [
    {
      icon: <FaBuilding className="text-white text-3xl" />,
      title: "Government Portal",
      description: "Dedicated interface for regulatory authorities to monitor certification compliance, verify vendors, and access real-time supply chain data.",
      color: "bg-blue-600",
      link: "/portals/government"
    },
    {
      icon: <FaCode className="text-white text-3xl" />,
      title: "Developer Hub",
      description: "Comprehensive documentation, APIs, and tools for developers to build applications on top of the HalalChain platform.",
      color: "bg-purple-600",
      link: "/portals/developer"
    },
    {
      icon: <FaStore className="text-white text-3xl" />,
      title: "Vendor Dashboard",
      description: "Powerful management interface for vendors to list products, track sales, manage inventory, and monitor certification status.",
      color: "bg-green-600",
      link: "/portals/vendor"
    }
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Multi-Portal Access</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Specialized interfaces for different stakeholders in the halal certification ecosystem.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {portals.map((portal, index) => (
            <div key={index} className="flex flex-col h-full">
              <div className={`${portal.color} rounded-t-lg p-6 flex justify-center`}>
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
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Each portal is designed with specific user needs in mind, providing tailored functionality 
            and information relevant to different stakeholders in the halal ecosystem.
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