export interface Media {
    id: string;
    url: string;
    alt: string;
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    content: any; // Payload Rich Text
    publishedDate: string;
    category?: Category;
    image?: Media;
    excerpt?: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface HeroData {
    id: string;
    title: string;
    subtitle?: string;
    backgroundImage?: Media;
    ctaButtonText?: string;
    stats?: {
        icon?: string;
        value: string;
        label: string;
    }[];
    benefits?: {
        title: string;
        description?: string;
    }[];
}

export interface Service {
    id: string;
    icon?: string; // We'll map string to component in the UI
    title: string;
    description: string;
    link?: string;
    cta?: string;
    features?: {
        feature: string;
    }[];
    order?: number;
    isActive?: boolean;
}

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    order?: number;
}

export interface Testimonial {
    id: string;
    name: string;
    company?: string;
    content: string;
    image?: Media;
    rating?: number;
    order?: number;
}

export interface SiteSettingsData {
    contact?: {
        whatsappRequest?: string;
        email?: string;
    };
    social?: {
        instagram?: string;
        youtube?: string;
    };
    footer?: {
        copyrightText?: string;
    };
}

const CMS_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:3002';

export async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch(`${CMS_URL}/api/posts?limit=100&sort=-publishedDate`);
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Failed to fetch posts: ${res.status} ${text}`);
        }
        const data = await res.json();
        return data.docs;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const query = `where[slug][equals]=${encodeURIComponent(slug)}`;
        const url = `${CMS_URL}/api/posts?${query}`;
        console.log('Fetching post:', url);

        const res = await fetch(url);
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Failed to fetch post: ${res.status} ${text}`);
        }
        const data = await res.json();
        return data.docs[0] || null;
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error);
        return null;
    }
}

export async function getHero(): Promise<HeroData | null> {
    try {
        const res = await fetch(`${CMS_URL}/api/hero-section?limit=1`);
        if (!res.ok) throw new Error('Failed to fetch hero');
        const data = await res.json();
        return data.docs[0] || null;
    } catch (error) {
        console.error('Error fetching hero:', error);
        return null;
    }
}

export async function getServices(): Promise<Service[]> {
    try {
        const res = await fetch(`${CMS_URL}/api/services?limit=100&sort=order&where[isActive][equals]=true`);
        if (!res.ok) throw new Error('Failed to fetch services');
        const data = await res.json();
        return data.docs;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export async function getFAQs(): Promise<FAQItem[]> {
    try {
        const res = await fetch(`${CMS_URL}/api/faq?limit=100&sort=order`);
        if (!res.ok) throw new Error('Failed to fetch FAQs');
        const data = await res.json();
        return data.docs;
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        return [];
    }
}

export async function getTestimonials(): Promise<Testimonial[]> {
    try {
        const res = await fetch(`${CMS_URL}/api/testimonials?limit=100&sort=order&where[isActive][equals]=true`);
        if (!res.ok) throw new Error('Failed to fetch testimonials');
        const data = await res.json();
        return data.docs;
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }
}

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
    try {
        const res = await fetch(`${CMS_URL}/api/globals/site-settings`);
        if (!res.ok) throw new Error('Failed to fetch site settings');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching site settings:', error);
        return null;
    }
}
