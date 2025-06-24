const nextConfig = {
  images: {
    domains: ["elements-resized.envatousercontent.com", "images.unsplash.com"],
  },
  experimental: {
    // @ts-expect-error: allowedDevOrigins is experimental and not yet in type definitions
    allowedDevOrigins: ['http://192.168.56.1'],
  },
};

export default nextConfig;
