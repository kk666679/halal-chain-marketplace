import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import BlockchainSection from '@/components/BlockchainSection';
import AIAgentSection from '@/components/AIAgentSection';
import PortalsSection from '@/components/PortalsSection';
import NeuralInterfaceSection from '@/components/NeuralInterfaceSection';
import QuantumComputingSection from '@/components/QuantumComputingSection';
import SustainabilitySection from '@/components/SustainabilitySection';
import MetaverseSection from '@/components/MetaverseSection';
import CallToAction from '@/components/CallToAction';
import { Suspense } from 'react';
import Loading from './loading';

// Enhanced metadata for the homepage
export const metadata = {
  title: 'HalalChain Marketplace - Blockchain-Powered Halal Certification Platform',
  description: 'Discover the future of halal certification with our blockchain-powered platform featuring AI agents, neural interfaces, and quantum computing technologies.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HalalChain Marketplace - Revolutionary Halal Certification',
    description: 'Discover the future of halal certification with our blockchain-powered platform featuring AI agents, neural interfaces, and quantum computing technologies.',
  }
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Suspense fallback={<Loading />}>
        <HeroSection />
        <FeaturesSection />
        <BlockchainSection />
        <QuantumComputingSection />
        <AIAgentSection />
        <NeuralInterfaceSection />
        <MetaverseSection />
        <SustainabilitySection />
        <PortalsSection />
        <CallToAction />
      </Suspense>
    </main>
  );
}