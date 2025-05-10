import { FaCode, FaPlug, FaCloudDownloadAlt, FaRobot, FaShoppingCart, FaShareAlt } from 'react-icons/fa';

export default function IntegrationTabs({ activeTab, setActiveTab }) {
  const integrationTypes = [
    { id: 'api', name: 'REST API', icon: <FaCode /> },
    { id: 'sdk', name: 'SDKs & Libraries', icon: <FaPlug /> },
    { id: 'webhooks', name: 'Webhooks', icon: <FaCloudDownloadAlt /> },
    { id: 'social', name: 'Social Media', icon: <FaShareAlt /> },
    { id: 'ecommerce', name: 'E-Commerce', icon: <FaShoppingCart /> },
    { id: 'neural', name: 'Neural Interface', icon: <FaRobot /> }
  ];
  
  return (
    <section className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-6">
        <div className="flex overflow-x-auto scrollbar-hide">
          {integrationTypes.map(type => (
            <button
              key={type.id}
              className={`flex items-center px-6 py-4 border-b-2 whitespace-nowrap ${
                activeTab === type.id 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(type.id)}
              aria-selected={activeTab === type.id}
              role="tab"
            >
              <span className="mr-2">{type.icon}</span>
              <span>{type.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}