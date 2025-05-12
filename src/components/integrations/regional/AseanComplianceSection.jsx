import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Check, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const aseanMembers = [
  {
    country: 'Brunei Darussalam',
    agency: 'MUIB (Brunei Islamic Religious Council)',
    website: 'https://www.religiousaffairs.gov.bn/',
    logo: '/images/flags/brunei.svg',
    scope: ['Food', 'Cosmetics', 'Pharmaceuticals', 'Logistics'],
    specialRequirements: 'Strict compliance with Shafi\'i school of thought',
    status: 'Fully Integrated'
  },
  {
    country: 'Cambodia',
    agency: 'Cambodian Halal Steering Committee',
    website: 'https://www.cambodiahalal.gov.kh/',
    logo: '/images/flags/cambodia.svg',
    scope: ['Food', 'Tourism'],
    specialRequirements: 'Developing standards aligned with ASEAN guidelines',
    status: 'Partially Integrated'
  },
  {
    country: 'Indonesia',
    agency: 'MUI (Majelis Ulama Indonesia)',
    website: 'https://www.halalmui.org/',
    logo: '/images/flags/indonesia.svg',
    scope: ['Food', 'Cosmetics', 'Pharmaceuticals', 'Logistics', 'Tourism'],
    specialRequirements: 'Mandatory halal certification for all food products since 2019',
    status: 'Fully Integrated'
  },
  {
    country: 'Laos',
    agency: 'Lao Islamic Council',
    website: 'https://www.laoshalal.org/',
    logo: '/images/flags/laos.svg',
    scope: ['Food'],
    specialRequirements: 'Emerging standards with focus on food products',
    status: 'In Progress'
  },
  {
    country: 'Malaysia',
    agency: 'JAKIM (Department of Islamic Development Malaysia)',
    website: 'https://www.halal.gov.my/',
    logo: '/images/flags/malaysia.svg',
    scope: ['Food', 'Cosmetics', 'Pharmaceuticals', 'Logistics', 'Finance', 'Tourism'],
    specialRequirements: 'Comprehensive halal ecosystem with digital traceability requirements',
    status: 'Fully Integrated'
  },
  {
    country: 'Myanmar',
    agency: 'Islamic Religious Affairs Council Myanmar',
    website: 'https://www.myanmarhalal.org/',
    logo: '/images/flags/myanmar.svg',
    scope: ['Food'],
    specialRequirements: 'Developing standards with focus on export products',
    status: 'In Progress'
  },
  {
    country: 'Philippines',
    agency: 'IDCP (Islamic Da\'wah Council of the Philippines)',
    website: 'https://idcphalal.com/',
    logo: '/images/flags/philippines.svg',
    scope: ['Food', 'Cosmetics', 'Tourism'],
    specialRequirements: 'Republic Act 10817 (Halal Export Development and Promotion Act)',
    status: 'Partially Integrated'
  },
  {
    country: 'Singapore',
    agency: 'MUIS (Islamic Religious Council of Singapore)',
    website: 'https://www.muis.gov.sg/',
    logo: '/images/flags/singapore.svg',
    scope: ['Food', 'Cosmetics', 'Pharmaceuticals', 'Logistics'],
    specialRequirements: 'Digital certification system with blockchain verification',
    status: 'Fully Integrated'
  },
  {
    country: 'Thailand',
    agency: 'CICOT (Central Islamic Council of Thailand)',
    website: 'https://www.cicot.or.th/',
    logo: '/images/flags/thailand.svg',
    scope: ['Food', 'Cosmetics', 'Hospitality'],
    specialRequirements: 'Focus on halal food tourism and export standards',
    status: 'Fully Integrated'
  },
  {
    country: 'Vietnam',
    agency: 'Halal Certification Agency Vietnam',
    website: 'https://www.halalfoodvietnam.com/',
    logo: '/images/flags/vietnam.svg',
    scope: ['Food', 'Export Products'],
    specialRequirements: 'Developing standards with focus on export markets',
    status: 'Partially Integrated'
  }
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Fully Integrated':
      return <Badge variant="success">Fully Integrated</Badge>;
    case 'Partially Integrated':
      return <Badge variant="warning">Partially Integrated</Badge>;
    case 'In Progress':
      return <Badge variant="secondary">In Progress</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function AseanComplianceSection() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-6 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4">ASEAN Halal Compliance</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The HalalChain Marketplace supports regional compliance for all ten ASEAN member countries, 
          providing a unified platform for halal certification verification, cross-border trade, 
          and regulatory compliance.
        </p>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {aseanMembers.map((member) => (
            <div key={member.country} className="flex items-center bg-white/80 dark:bg-gray-800/80 rounded-full px-3 py-1.5 text-sm font-medium shadow-sm">
              {member.logo && (
                <div className="w-5 h-5 mr-2 relative overflow-hidden rounded-full">
                  <Image 
                    src={member.logo} 
                    alt={member.country} 
                    width={20} 
                    height={20} 
                    className="object-cover"
                  />
                </div>
              )}
              {member.country}
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Link 
            href="/integrations/regional/compliance?region=asean" 
            className="btn-primary"
          >
            <Check className="mr-2 h-4 w-4" />
            Check Compliance
          </Link>
          <Link 
            href="/integrations/regional/market-insights?region=asean" 
            className="btn-secondary"
          >
            <Info className="mr-2 h-4 w-4" />
            Market Insights
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aseanMembers.map((member) => (
          <Card key={member.country} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {member.logo && (
                    <div className="w-8 h-8 mr-3 relative overflow-hidden rounded-full border border-gray-200">
                      <Image 
                        src={member.logo} 
                        alt={member.country} 
                        width={32} 
                        height={32} 
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardTitle>{member.country}</CardTitle>
                </div>
                {getStatusBadge(member.status)}
              </div>
              <CardDescription className="mt-2">{member.agency}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <div className="text-sm font-medium text-gray-500 mb-1">Certification Scope:</div>
                <div className="flex flex-wrap gap-1">
                  {member.scope.map((item) => (
                    <span key={item} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-500 mb-1">Special Requirements:</div>
                <p className="text-sm">{member.specialRequirements}</p>
              </div>
              
              <Link 
                href={member.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
              >
                Visit Official Website
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">ASEAN Halal Standards Harmonization</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The ASEAN region is working towards harmonizing halal standards to facilitate trade and ensure consistent 
          quality across member countries. HalalChain Marketplace supports this initiative through our blockchain-based 
          verification system.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Key Benefits</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Single verification platform for all ASEAN certifications</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Streamlined cross-border trade compliance</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Real-time updates on regulatory changes</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Blockchain-verified certification authenticity</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Integration Features</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>API connections to national certification databases</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Multi-language documentation support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Automated compliance checking tools</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span>Regional market insights and analytics</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Link 
          href="/download/asean-halal-standards-guide.pdf" 
          className="btn-outline inline-flex items-center"
        >
          <Download className="mr-2 h-4 w-4" />
          Download ASEAN Halal Standards Guide
        </Link>
      </div>
    </div>
  );
}