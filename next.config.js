/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains : ['lh3.googleusercontent.com']
    },
    webpack: (config) => {
        config.resolve.fallback = {
          "mongodb-client-encryption": false ,
          "aws4": false
        };
    
        return config;
      },
    reactStrictMode : false,
}

module.exports = nextConfig