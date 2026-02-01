import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPostBySlug } from '@/lib/cms';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import escapeHTML from 'escape-html';
import { Text } from 'slate';

// Simple Slate Serializer
const serialize = (children: any[]): React.ReactNode[] =>
    children.map((node, i) => {
        if (Text.isText(node)) {
            let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />

            if ((node as any).bold) {
                text = <strong key={i}>{text}</strong>
            }

            if ((node as any).italic) {
                text = <em key={i}>{text}</em>
            }

            if ((node as any).code) {
                text = <code key={i} className="bg-gray-100 px-1 rounded font-mono text-sm text-brand-lilacDark">{text}</code>
            }

            return <React.Fragment key={i}>{text}</React.Fragment>
        }

        if (!node) {
            return null
        }

        switch (node.type) {
            case 'h1':
                return <h1 key={i} className="font-serif text-3xl md:text-4xl text-brand-dark mt-8 mb-4">{serialize(node.children)}</h1>
            case 'h2':
                return <h2 key={i} className="font-serif text-2xl md:text-3xl text-brand-dark mt-8 mb-4">{serialize(node.children)}</h2>
            case 'h3':
                return <h3 key={i} className="font-serif text-xl md:text-2xl text-brand-dark mt-6 mb-3">{serialize(node.children)}</h3>
            case 'h4':
                return <h4 key={i} className="font-serif text-lg md:text-xl text-brand-dark mt-6 mb-3">{serialize(node.children)}</h4>
            case 'quote':
                return <blockquote key={i} className="border-l-4 border-brand-gold pl-4 italic text-xl text-gray-700 my-6">{serialize(node.children)}</blockquote>
            case 'ul':
                return <ul key={i} className="list-disc list-inside mb-4 ml-4">{serialize(node.children)}</ul>
            case 'ol':
                return <ol key={i} className="list-decimal list-inside mb-4 ml-4">{serialize(node.children)}</ol>
            case 'li':
                return <li key={i} className="mb-2 text-gray-700 font-sans leading-relaxed">{serialize(node.children)}</li>
            case 'link':
                return (
                    <a href={escapeHTML(node.url)} key={i} className="text-brand-lilacDark underline hover:text-brand-lilac transition-colors" target="_blank" rel="noopener noreferrer">
                        {serialize(node.children)}
                    </a>
                )

            case 'table':
                return (
                    <div key={i} className="overflow-x-auto my-8">
                        <table className="min-w-full border-collapse border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                            {serialize(node.children)}
                        </table>
                    </div>
                )
            case 'thead':
                return <thead key={i} className="bg-brand-lilac/10 text-brand-dark uppercase text-sm font-bold tracking-wider">{serialize(node.children)}</thead>
            case 'tbody':
                return <tbody key={i} className="bg-white divide-y divide-gray-100">{serialize(node.children)}</tbody>
            case 'tr':
                return <tr key={i} className="hover:bg-gray-50 transition-colors">{serialize(node.children)}</tr>
            case 'th':
                return <th key={i} className="px-6 py-3 text-left border-b border-gray-200">{serialize(node.children)}</th>
            case 'td':
                return <td key={i} className="px-6 py-4 whitespace-nowrap text-gray-700 border-b border-gray-100">{serialize(node.children)}</td>

            case 'upload':
                return (
                    <div key={i} className="my-8">
                        <img
                            src={node.value?.url}
                            alt={node.value?.alt || ''}
                            className="w-full rounded-xl shadow-md"
                        />
                        {node.value?.caption && (
                            <p className="text-center text-sm text-gray-500 mt-2">{node.value.caption}</p>
                        )}
                    </div>
                )

            default:
                return <p key={i} className="mb-4 text-gray-700 font-sans leading-relaxed text-lg">{serialize(node.children)}</p>
        }
    })


const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: post, isLoading } = useQuery({
        queryKey: ['post', slug],
        queryFn: () => getPostBySlug(slug!),
        enabled: !!slug
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-beige py-24 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-lilac"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-brand-beige py-24 flex flex-col items-center">
                <h1 className="font-serif text-3xl text-brand-dark mb-4">Post não encontrado</h1>
                <Link to="/blog" className="text-brand-lilacDark hover:underline">Voltar para o Blog</Link>
            </div>
        );
    }

    // Construct JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "image": post.image?.url ? [post.image.url] : [],
        "datePublished": post.publishedDate,
        "dateModified": new Date().toISOString(), // In a real scenario, fetch this from CMS
        "author": {
            "@type": "Person",
            "name": "Ariana Borges",
            "url": "https://institutoarianaborges.com.br/sobre"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Instituto Ariana Borges",
            "logo": {
                "@type": "ImageObject",
                "url": "https://institutoarianaborges.com.br/ariana-borges-logo.png"
            }
        },
        "description": post.excerpt || post.title,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://institutoarianaborges.com.br/blog/${post.slug}`
        }
    };

    return (
        <div className="min-h-screen bg-brand-beige pb-20">
            <Helmet>
                <title>{post.title} - Blog Instituto Ariana Borges</title>
                <meta name="description" content={post.excerpt || post.title} />
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>

            {/* Header/Cover */}
            <div className="relative h-[400px] md:h-[500px]">
                <img
                    src={post.image?.url}
                    alt={post.image?.alt || post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-20 px-6">
                    <div className="max-w-4xl mx-auto w-full">
                        {post.category && (
                            <span className="inline-block bg-brand-gold text-brand-dark font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-4">
                                {post.category.name}
                            </span>
                        )}
                        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight drop-shadow-md">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center text-white/90 text-sm md:text-base gap-6">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>Publicado: {new Date(post.publishedDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>Atualizado: {new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 font-bold">
                                <span>Por Ariana Borges</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 -mt-10 relative z-10">
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl">
                    <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-brand-lilacDark mb-8 transition-colors group">
                        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Voltar para o Blog
                    </Link>

                    <div className="prose prose-lg prose-brown max-w-none">
                        {serialize(post.content)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
