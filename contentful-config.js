module.exports = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
    managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
  };