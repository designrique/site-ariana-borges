import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug } from '@/lib/cms';
import { Loader2, ArrowLeft, Calendar, Tag } from 'lucide-react';
import RichText from '@/components/RichText';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    const { data: post, isLoading } = useQuery({
        queryKey: ['post', slug],
        queryFn: () => slug ? getPostBySlug(slug) : null,
        enabled: !!slug
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <Helmet>
                    <title>Post não encontrado | Ariana Borges</title>
                </Helmet>
                <h1 className="font-serif text-3xl mb-4">Post não encontrado</h1>
                <a href="/blog" className="text-brand-lilacDark hover:underline">Voltar para o Blog</a>
            </div>
        );
    }

    return (
        <article className="pt-32 pb-24 min-h-screen bg-white">
            <Helmet>
                <title>{post.title} | Blog Ariana Borges</title>
                <meta name="description" content={post.excerpt || `Leia sobre ${post.title} no blog de Ariana Borges.`} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt || ''} />
                {post.image?.url && <meta property="og:image" content={post.image.url} />}
            </Helmet>

            <div className="max-w-3xl mx-auto px-6">
                <a href="/blog" className="inline-flex items-center text-gray-500 hover:text-brand-dark mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Voltar para o Blog
                </a>

                {post.category && (
                    <div className="flex items-center gap-2 text-brand-gold text-sm font-bold uppercase tracking-wider mb-4">
                        <Tag className="w-4 h-4" />
                        {post.category.name}
                    </div>
                )}

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-6 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center text-gray-400 text-sm mb-12 border-b border-gray-100 pb-8">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.publishedDate).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </div>

                {post.image?.url && (
                    <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={post.image.url}
                            alt={post.image.alt || post.title}
                            className="w-full object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-brand-dark prose-a:text-brand-lilacDark max-w-none text-gray-600 font-sans">
                    <RichText content={post.content} />
                </div>
            </div>
        </article>
    );
};

export default BlogPost;
