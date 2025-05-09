import Image from 'next/image';
import { FaRobot, FaBoxOpen, FaCreditCard, FaCommentDots, FaTruck, FaChartLine } from 'react-icons/fa';

export default function AIAgentSection() {
  const agents = [
    {
      icon: <FaBoxOpen className="text-green-600 text-2xl" />,
      name: "Inventory Agent",
      description: "Monitors stock levels, predicts demand, and automates reordering to prevent stockouts and optimize inventory."
    },
    {
      icon: <FaCreditCard className="text-green-600 text-2xl" />,
      name: "Payment Agent",
      description: "Processes transactions securely, detects fraud patterns, and manages cryptocurrency payments."
    },
    {
      icon: <FaChartLine className="text-green-600 text-2xl" />,
      name: "Recommendation Agent",
      description: "Analyzes customer preferences and behavior to suggest relevant products and personalize shopping experiences."
    },
    {
      icon: <FaCommentDots className="text-green-600 text-2xl" />,
      name: "Chatbot Agent",
      description: "Provides 24/7 customer support, answers product questions, and assists with order tracking and returns."
    },
    {
      icon: <FaTruck className="text-green-600 text-2xl" />,
      name: "Dispatch Agent",
      description: "Coordinates deliveries, assigns optimal carriers, and ensures timely shipment of products."
    },
    {
      icon: <FaRobot className="text-green-600 text-2xl" />,
      name: "Routing Agent",
      description: "Optimizes delivery routes to reduce transit time and costs while maintaining halal product integrity."
    }
  ];

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">AI Multi-Agent System</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our intelligent AI agents work together to optimize every aspect of the marketplace, 
            from inventory management to customer experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Intelligent Automation</h3>
            <p className="text-gray-600 mb-6">
              The HalalChain marketplace leverages cutting-edge artificial intelligence to automate 
              complex processes, reduce human error, and create a seamless experience for both vendors 
              and customers.
            </p>
            <p className="text-gray-600">
              Our multi-agent system consists of specialized AI agents that collaborate to handle 
              different aspects of the marketplace ecosystem. Each agent is trained on halal-specific 
              requirements and continuously learns from marketplace data to improve its performance.
            </p>
          </div>
          
          <div className="relative h-80">
            <Image
              src="/images/ai-agents.png"
              alt="AI Multi-Agent System"
              fill
              style={{objectFit: "contain"}}
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-3">
                  {agent.icon}
                </div>
                <h3 className="text-xl font-semibold">{agent.name}</h3>
              </div>
              <p className="text-gray-600">{agent.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}