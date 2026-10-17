// Twitter card uses the same image as Open Graph.
export { default, alt, size, contentType, generateStaticParams } from './opengraph-image'

// Segment config must be declared literally here (Next.js does not allow re-exporting it).
export const dynamicParams = false
