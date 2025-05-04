export const certifiedAuthorities = [
    {
      id: 1,
      name: "Islamic Food and Nutrition Council of America",
      region: "Global",
      accreditation: "HACCP Certified"
    },
    // Add more certifiers
  ];
  
  export const verifyCertifier = (certifierId) => {
    return certifiedAuthorities.find(c => c.id === certifierId);
  };