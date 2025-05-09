"use client";

import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import BlockchainSection from '@/components/BlockchainSection';
import AIAgentSection from '@/components/AIAgentSection';
import PortalsSection from '@/components/PortalsSection';
import CallToAction from '@/components/CallToAction';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <FeaturesSection />
      <BlockchainSection />
      <AIAgentSection />
      <PortalsSection />
      <CallToAction />
    </main>
  );
}