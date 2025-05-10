import { FaShieldAlt, FaGlobe, FaUsers, FaChartLine, FaRobot, FaBoxOpen, FaLeaf, FaHandshake } from 'react-icons/fa';

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaShieldAlt className="text-green-600 text-2xl" />,
      title: "Quantum-Secure Certification",
      description: "Post-quantum blockchain records ensure the authenticity and traceability of halal certifications. Consumers can verify products with holographic AR scanning technology."
    },
    {
      icon: <FaGlobe className="text-green-600 text-2xl" />,
      title: "Global Supply Chain Transparency",
      description: "Track products from source to shelf with satellite-enabled IoT sensors providing real-time monitoring of environmental conditions throughout the entire supply chain."
    },
    {
      icon: <FaUsers className="text-green-600 text-2xl" />,
      title: "Multi-Vendor Platform",
      description: "Connect halal product vendors with consumers worldwide through our comprehensive marketplace with integrated neural translation for 95+ languages and cultural adaptation."
    },
    {
      icon: <FaChartLine className="text-green-600 text-2xl" />,
      title: "Predictive Analytics",
      description: "Quantum-enhanced analytics tools help vendors understand market trends up to 18 months in advance, optimizing inventory and pricing strategies with 97% accuracy."
    },
    {
      icon: <FaRobot className="text-green-600 text-2xl" />,
      title: "Neural-Symbolic AI System",
      description: "Our hybrid AI system combines symbolic reasoning with neural networks to optimize operations while maintaining ethical decision-making and halal compliance."
    },
    {
      icon: <FaBoxOpen className="text-green-600 text-2xl" />,
      title: "Autonomous Inventory Management",
      description: "Self-managing inventory systems use drone and robot integration for warehouse operations, with predictive ordering and dynamic pricing optimization."
    },
    {
      icon: <FaLeaf className="text-green-600 text-2xl" />,
      title: "Carbon-Neutral Operations",
      description: "Our platform now operates on 100% renewable energy with carbon capture technology, offering carbon credits to vendors who meet sustainability benchmarks."
    },
    {
      icon: <FaHandshake className="text-green-600 text-2xl" />,
      title: "Community Governance",
      description: "Decentralized autonomous organization (DAO) structure allows stakeholders to participate in platform governance through secure digital voting and proposal systems."
    }
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">2025 Platform Capabilities</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 hover:translate-y-[-5px] transition-transform">
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