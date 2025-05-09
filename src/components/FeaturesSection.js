import { FaShieldAlt, FaGlobe, FaUsers, FaChartLine, FaRobot, FaBoxOpen } from 'react-icons/fa';

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaShieldAlt className="text-green-600 text-2xl" />,
      title: "Blockchain Certification",
      description: "Immutable blockchain records ensure the authenticity and traceability of halal certifications. Consumers can verify product certifications with a simple QR code scan."
    },
    {
      icon: <FaGlobe className="text-green-600 text-2xl" />,
      title: "Supply Chain Transparency",
      description: "Track products from source to shelf with complete visibility into every step of the supply chain. Ensure halal compliance throughout the entire production process."
    },
    {
      icon: <FaUsers className="text-green-600 text-2xl" />,
      title: "Multi-Vendor Platform",
      description: "Connect halal product vendors with consumers worldwide through our comprehensive marketplace. Streamlined onboarding and verification for vendors."
    },
    {
      icon: <FaChartLine className="text-green-600 text-2xl" />,
      title: "Sales Analytics",
      description: "Powerful analytics tools help vendors understand their performance, customer preferences, and market trends to optimize their business strategies."
    },
    {
      icon: <FaRobot className="text-green-600 text-2xl" />,
      title: "AI Agent System",
      description: "Intelligent AI agents optimize inventory management, payment processing, customer recommendations, and logistics for maximum efficiency."
    },
    {
      icon: <FaBoxOpen className="text-green-600 text-2xl" />,
      title: "Inventory Tracking",
      description: "Real-time inventory management ensures products are always in stock and helps prevent waste through predictive ordering and stock alerts."
    }
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}