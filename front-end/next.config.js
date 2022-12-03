/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: false,
  experimental:{appDir: true},
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true }};
    // this will just update topLevelAwait property of config.experiments
    config.experiments.topLevelAwait = true 
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://unnitation.com/:path*',
      },
    ]
  },
  
}

module.exports = nextConfig;

//module.exports = nextConfig
