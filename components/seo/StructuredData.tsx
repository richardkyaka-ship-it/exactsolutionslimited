import Script from 'next/script';

export function OrganizationStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://exactsolutions.co.ke';
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Exact Solutions Limited',
    description: 'Industrial solutions provider specializing in equipment, generators, shipping containers, and metal fabrication in Kenya.',
    url: baseUrl,
    logo: `${baseUrl}/icon.svg`,
    foundingDate: '2015',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'KE',
        addressRegion: 'Nairobi',
      },
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254-720-876-787',
      contactType: 'Customer Service',
      email: 'expert@exactsolutions.co.ke',
      availableLanguage: ['English', 'Swahili'],
    },
    sameAs: [
      // Add when you have social media
      // 'https://www.facebook.com/exactsolutions',
      // 'https://twitter.com/exactsolutions',
      // 'https://www.linkedin.com/company/exactsolutions',
    ],
  };

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
