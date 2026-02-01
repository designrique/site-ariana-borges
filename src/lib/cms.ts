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

export interface Media {
    id: string;
    url: string;
    alt: string;
}

const CMS_URL = import.meta.env.VITE_CMS_URL || 'http://localhost:3000';

export async function getPosts(): Promise<Post[]> {
    try {
        const res = await fetch(`${CMS_URL}/api/posts?limit=100&sort=-publishedDate`);
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        return data.docs;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const res = await fetch(`${CMS_URL}/api/posts?where[slug][equals]=${slug}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const data = await res.json();
        return data.docs[0] || null;
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error);
        return null;
    }
}
