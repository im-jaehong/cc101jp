import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Ensure content directory is accessible at build time
  serverExternalPackages: ['gray-matter'],
}

export default nextConfig
