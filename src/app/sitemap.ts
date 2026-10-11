import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://asifzonebd.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://asifzonebd.com/shop',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.97,
        },
        {
            url: 'https://asifzonebd.com/contact',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.95,
        },
        {
            url: 'https://asifzonebd.com/auth/login',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.90,
        },
        {
            url: 'https://asifzonebd.com/auth/signup',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
        
    ]
}