/**
 * Regional Certification Data
 * 
 * This file contains certification body information for different regions
 * including ASEAN, China, Russia, Australia, UAE/Dubai, and GCC countries.
 */

export const regionalCertificationBodies = {
  // ASEAN Region
  asean: [
    {
      country: 'Indonesia',
      name: 'MUI (Majelis Ulama Indonesia)',
      website: 'https://www.halalmui.org/',
      scope: ['Food', 'Cosmetics', 'Pharmaceuticals', 'Logistics'],
      logo: '/images/certifications/mui-logo.png',
      prefix: 'MUI'
    },
    {
      country: 'Malaysia',
      name: 'JAKIM (Department of Islamic Development Malaysia)',
      website: 'https://www.halal.gov.my/',
      scope: ['Food', 'Cosmetics', 'Pharmaceuticals', 'Logistics', 'Finance'],
      logo: '/images/certifications/jakim-logo.png',
      prefix: 'JAKIM'
    },
    {
      country: 'Thailand',
      name: 'CICOT (Central Islamic Council of Thailand)',
      website: 'https://www.cicot.or.th/',
      scope: ['Food', 'Cosmetics', 'Hospitality'],
      logo: '/images/certifications/cicot-logo.png',
      prefix: 'CICOT'
    },
    {
      country: 'Singapore',
      name: 'MUIS (Islamic Religious Council of Singapore)',
      website: 'https://www.muis.gov.sg/',
      scope: ['Food', 'Cosmetics', 'Pharmaceuticals', 'Logistics'],
      logo: '/images/certifications/muis-logo.png',
      prefix: 'MUIS'
    },
    {
      country: 'Philippines',
      name: 'IDCP (Islamic Da\'wah Council of the Philippines)',
      website: 'https://idcphalal.com/',
      scope: ['Food', 'Cosmetics'],
      logo: '/images/certifications/idcp-logo.png',
      prefix: 'IDCP'
    },
    {
      country: 'Brunei',
      name: 'MUIB (Brunei Islamic Religious Council)',
      website: 'https://www.religiousaffairs.gov.bn/',
      scope: ['Food', 'Cosmetics', 'Pharmaceuticals', 'Logistics'],
      logo: '/images/certifications/muib-logo.png',
      prefix: 'MUIB'
    }
  ],
  
  // China Region
  china: [
    {
      country: 'China',
      region: 'National',
      name: 'China Islamic Association (CIA)',
      website: 'http://www.chinaislam.net.cn/',
      scope: ['Food', 'Cosmetics', 'Hospitality'],
      logo: '/images/certifications/cia-logo.png',
      prefix: 'CIA'
    },
    {
      country: 'China',
      region: 'Ningxia',
      name: 'Ningxia Halal Certification Center',
      website: '#',
      scope: ['Food', 'Cosmetics', 'Pharmaceuticals'],
      logo: '/images/certifications/ningxia-logo.png',
      prefix: 'NHC'
    },
    {
      country: 'China',
      region: 'Xinjiang',
      name: 'Xinjiang Halal Certification Center',
      website: '#',
      scope: ['Food', 'Cosmetics'],
      logo: '/images/certifications/xinjiang-logo.png',
      prefix: 'XHC'
    }
  ],
  
  // Russia Region
  russia: [
    {
      country: 'Russia',
      region: 'National',
      name: 'Halal Standard Committee (HSC) under Russia Muftis Council',
      website: 'https://halalstandard.org/',
      scope: ['Food', 'Cosmetics', 'Pharmaceuticals', 'Logistics'],
      logo: '/images/certifications/hsc-logo.png',
      prefix: 'HSC'
    },
    {
      country: 'Russia',
      region: 'Moscow',
      name: 'International Center for Halal Standardization and Certification',
      website: 'https://www.halalcenter.org/',
      scope: ['Food', 'Cosmetics', 'Finance'],
      logo: '/images/certifications/ichsc-logo.png',
      prefix: 'ICHSC'
    }
  ],
  
  // Australia Region
  australia: [
    {
      country: 'Australia',
      name: 'Australian Federation of Islamic Councils (AFIC)',
      website: 'https://www.afic.com.au/',
      scope: ['Food', 'Meat', 'Poultry', 'Dairy'],
      logo: '/images/certifications/afic-logo.png',
      prefix: 'AFIC'
    },
    {
      country: 'Australia',
      name: 'Halal Certification Authority Australia (HCAA)',
      website: 'https://halalauthority.org/',
      scope: ['Food', 'Cosmetics', 'Pharmaceuticals'],
      logo: '/images/certifications/hcaa-logo.png',
      prefix: 'HCAA'
    },
    {
      country: 'Australia',
      name: 'Islamic Co-ordinating Council of Victoria (ICCV)',
      website: 'https://www.iccv.com.au/',
      scope: ['Food', 'Meat', 'Poultry'],
      logo: '/images/certifications/iccv-logo.png',
      prefix: 'ICCV'
    }
  ],
  
  // UAE/Dubai Region
  uae: [
    {
      country: 'UAE',
      name: 'Emirates Authority for Standardization and Metrology (ESMA)',
      website: 'https://www.esma.gov.ae/',
      scope: ['Food', 'Cosmetics', 'Pharmaceuticals', 'Logistics'],
      logo: '/images/certifications/esma-logo.png',
      prefix: 'ESMA'
    },
    {
      country: 'UAE',
      region: 'Dubai',
      name: 'Dubai Municipality - Food Safety Department',
      website: 'https://www.dm.gov.ae/',
      scope: ['Food', 'Restaurants', 'Catering'],
      logo: '/images/certifications/dubai-municipality-logo.png',
      prefix: 'DMH'
    },
    {
      country: 'UAE',
      name: 'Emirates International Accreditation Centre (EIAC)',
      website: 'https://www.eiac.gov.ae/',
      scope: ['Food', 'Cosmetics', 'Pharmaceuticals'],
      logo: '/images/certifications/eiac-logo.png',
      prefix: 'EIAC'
    }
  ],
  
  // GCC Region
  gcc: [
    {
      country: 'Saudi Arabia',
      name: 'Saudi Food and Drug Authority (SFDA)',
      website: 'https://www.sfda.gov.sa/',
      scope: ['Food', 'Pharmaceuticals', 'Medical Devices'],
      logo: '/images/certifications/sfda-logo.png',
      prefix: 'SFDA'
    },
    {
      country: 'Qatar',
      name: 'Qatar Halal Authority',
      website: 'https://www.moph.gov.qa/',
      scope: ['Food', 'Cosmetics', 'Pharmaceuticals'],
      logo: '/images/certifications/qatar-halal-logo.png',
      prefix: 'QHA'
    },
    {
      country: 'Kuwait',
      name: 'Kuwait Municipality - Food Safety Department',
      website: 'https://www.baladia.gov.kw/',
      scope: ['Food', 'Restaurants'],
      logo: '/images/certifications/kuwait-municipality-logo.png',
      prefix: 'KMH'
    },
    {
      country: 'Bahrain',
      name: 'Bahrain Standards and Metrology Directorate',
      website: 'https://www.moic.gov.bh/',
      scope: ['Food', 'Consumer Products'],
      logo: '/images/certifications/bahrain-standards-logo.png',
      prefix: 'BSMD'
    },
    {
      country: 'Oman',
      name: 'Oman Ministry of Endowments and Religious Affairs',
      website: 'https://www.mara.gov.om/',
      scope: ['Food', 'Cosmetics'],
      logo: '/images/certifications/oman-mera-logo.png',
      prefix: 'OMERA'
    }
  ]
};

/**
 * Get certification body by ID prefix
 * 
 * @param {string} prefix - The certification ID prefix
 * @returns {Object|null} - The certification body object or null if not found
 */
export function getCertificationBodyByPrefix(prefix) {
  if (!prefix) return null;
  
  const upperPrefix = prefix.toUpperCase();
  
  // Search through all regions
  for (const region in regionalCertificationBodies) {
    const bodies = regionalCertificationBodies[region];
    const found = bodies.find(body => body.prefix === upperPrefix);
    if (found) {
      return { ...found, region };
    }
  }
  
  return null;
}

/**
 * Determine region from certification ID
 * 
 * @param {string} certId - The certification ID
 * @returns {string} - The region code (asean, china, russia, australia, uae, gcc)
 */
export function determineRegionFromCertId(certId) {
  if (!certId) return 'asean'; // Default
  
  const prefix = certId.substring(0, 3).toUpperCase();
  
  // ASEAN prefixes
  if (['MUI', 'JAK', 'CIC', 'MUI', 'IDP', 'MUI'].includes(prefix)) {
    return 'asean';
  }
  
  // China prefixes
  if (['CIA', 'NHC', 'XHC'].includes(prefix)) {
    return 'china';
  }
  
  // Russia prefixes
  if (['HSC', 'ICH'].includes(prefix)) {
    return 'russia';
  }
  
  // Australia prefixes
  if (['AFI', 'HCA', 'ICC'].includes(prefix)) {
    return 'australia';
  }
  
  // UAE prefixes
  if (['ESM', 'DMH', 'EIA'].includes(prefix)) {
    return 'uae';
  }
  
  // GCC prefixes
  if (['SFD', 'QHA', 'KMH', 'BSM', 'OME'].includes(prefix)) {
    return 'gcc';
  }
  
  return 'asean'; // Default
}