import { useState } from 'react';
import { FaUser, FaStore, FaCode } from 'react-icons/fa';

export default function IntegrationGuides() {
  const [activeRole, setActiveRole] = useState('customer');
  
  const roles = [
    { id: 'customer', name: 'For Customers', icon: <FaUser /> },
    { id: 'vendor', name: 'For Vendors', icon: <FaStore /> },
    { id: 'developer', name: 'For Developers', icon: <FaCode /> }
  ];
  
  const guides = {
    customer: {
      title: "Customer Integration Guide",
      description: "Learn how to verify halal certifications and track products as a customer.",
      steps: [
        {
          title: "Download the Mobile App",
          content: "Get the HalalChain Verification app from the App Store or Google Play Store to scan and verify products."
        },
        {
          title: "Scan Product QR Codes",
          content: "Use the app to scan QR codes on halal-certified products to verify their authenticity."
        },
        {
          title: "View Supply Chain History",
          content: "Access the complete journey of your product from source to store with blockchain verification."
        },
        {
          title: "Set Up Alerts",
          content: "Configure notifications for product recalls, certification updates, or new products from your favorite vendors."
        }
      ]
    },
    vendor: {
      title: "Vendor Integration Guide",
      description: "Integrate your products and systems with HalalChain to showcase your halal certifications.",
      steps: [
        {
          title: "Register Your Business",
          content: "Create a vendor account and complete the verification process to join the HalalChain ecosystem."
        },
        {
          title: "Connect Your Inventory System",
          content: "Use our APIs or platform connectors to sync your inventory with HalalChain for real-time tracking."
        },
        {
          title: "Apply for Certification",
          content: "Submit your products for halal certification through our streamlined digital process."
        },
        {
          title: "Integrate with Sales Channels",
          content: "Connect your HalalChain account with e-commerce platforms and social media to display certification badges."
        }
      ]
    },
    developer: {
      title: "Developer Integration Guide",
      description: "Build applications and services that leverage the HalalChain ecosystem.",
      steps: [
        {
          title: "Create API Keys",
          content: "Register for a developer account and generate API keys for authentication."
        },
        {
          title: "Choose Your Integration Method",
          content: "Select from REST APIs, SDKs, webhooks, or platform-specific connectors based on your needs."
        },
        {
          title: "Implement Authentication",
          content: "Secure your integration with OAuth 2.0 or API key authentication following our security best practices."
        },
        {
          title: "Test in Sandbox",
          content: "Use our sandbox environment to test your integration with simulated data before going live."
        }
      ]
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Integration Guides</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Follow our step-by-step guides tailored to your specific role in the HalalChain ecosystem.
        </p>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            {roles.map(role => (
              <button
                key={role.id}
                type="button"
                className={`px-5 py-3 text-sm font-medium flex items-center gap-2 ${
                  activeRole === role.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } ${
                  role.id === 'customer' 
                    ? 'rounded-l-lg' 
                    : role.id === 'developer' 
                      ? 'rounded-r-lg' 
                      : ''
                } border border-gray-200`}
                onClick={() => setActiveRole(role.id)}
              >
                {role.icon}
                {role.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-8 shadow-md">
          <h3 className="text-2xl font-bold mb-2">{guides[activeRole].title}</h3>
          <p className="text-gray-600 mb-8">{guides[activeRole].description}</p>
          
          <div className="space-y-6">
            {guides[activeRole].steps.map((step, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
                  <p className="text-gray-600">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <a 
              href={`/docs/guides/${activeRole}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              View Complete Guide
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}