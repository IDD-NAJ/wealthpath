/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  serverRuntimeConfig: {
    allowedHosts: ['sb-l86c7b88lmgr.vercel.run', 'localhost', '127.0.0.1'],
  },
}

export default nextConfig
