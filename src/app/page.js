"use client";

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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
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
    </main>
  );
}