export default function sitemap() {
  const baseUrl = 'https://freesip.co.in';

  return [
    {
      url: `${baseUrl}/`,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      priority: 0.8,
    },
  ];
}