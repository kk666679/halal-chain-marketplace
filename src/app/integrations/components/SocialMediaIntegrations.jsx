import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaTiktok } from 'react-icons/fa';
import IntegrationCard from './IntegrationCard';

export default function SocialMediaIntegrations() {
  const socialIntegrations = [
    {
      name: "Facebook Integration",
      description: "Connect your HalalChain products and certifications directly to Facebook Business and Marketplace.",
      icon: <FaFacebook className="text-blue-600 text-2xl" />,
      features: [
        "Automatic product listing on Facebook Marketplace",
        "Certification badge display on product listings",
        "Real-time inventory synchronization",
        "Customer engagement analytics"
      ],
      documentation: "/docs/integrations/social/facebook",
      demo: "/demos/facebook-integration",
      version: "v2.4.1"
    },
    {
      name: "Instagram Integration",
      description: "Showcase your halal-certified products on Instagram with shoppable posts and stories.",
      icon: <FaInstagram className="text-pink-600 text-2xl" />,
      features: [
        "Shoppable posts with certification verification",
        "Instagram Shopping catalog integration",
        "Story highlights for certification details",
        "Influencer partnership tracking"
      ],
      documentation: "/docs/integrations/social/instagram",
      demo: "/demos/instagram-integration",
      version: "v2.1.0"
    },
    {
      name: "X (Twitter) Integration",
      description: "Share product updates and certification achievements with your audience on X (formerly Twitter).",
      icon: <FaTwitter className="text-blue-400 text-2xl" />,
      features: [
        "Automated certification announcement tweets",
        "Product launch campaigns",
        "Customer feedback monitoring",
        "Halal trend analysis"
      ],
      documentation: "/docs/integrations/social/twitter",
      version: "v1.8.3"
    },
    {
      name: "LinkedIn Integration",
      description: "Build your B2B halal business network and showcase your certifications to industry professionals.",
      icon: <FaLinkedin className="text-blue-700 text-2xl" />,
      features: [
        "Company page certification badges",
        "B2B lead generation tools",
        "Industry networking suggestions",
        "Professional content distribution"
      ],
      documentation: "/docs/integrations/social/linkedin",
      version: "v1.5.2"
    },
    {
      name: "TikTok Integration",
      description: "Reach younger audiences with engaging content about your halal products and certification journey.",
      icon: <FaTiktok className="text-black text-2xl" />,
      features: [
        "TikTok Shop integration with certification display",
        "Viral content templates for halal products",
        "Influencer collaboration tools",
        "Engagement analytics dashboard"
      ],
      documentation: "/docs/integrations/social/tiktok",
      demo: "/demos/tiktok-integration",
      version: "v1.2.0",
      beta: true
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {socialIntegrations.map((integration, index) => (
        <IntegrationCard key={index} integration={integration} />
      ))}
    </div>
  );
}