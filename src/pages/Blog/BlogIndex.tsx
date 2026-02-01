import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { getPosts, Post } from '@/lib/cms';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogIndex: React.FC = () => {
    const { data: posts, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    });

    return (
        <div className="pt-24 pb-16 min-h-screen">
            <Helmet>
                <title>Blog | Ariana Borges</title>
                <meta name="description" content="Artigos sobre autoconhecimento, espiritualidade e terapias integrativas por Ariana Borges." />
            </Helmet>

            <div className="max-w-6xl mx-auto px-6">
                <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-12 text-center">Blog</h1>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-brand-gold" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts && posts.length > 0 ? (
                            posts.map((post: Post) => (
                                <Link
                                    key={post.id}
                                    to={`/blog/${post.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="aspect-[16/9] bg-brand-lilac/20 relative overflow-hidden">
                                        {post.image?.url ? (
                                            <img
                                                src={post.image.url}
                                                alt={post.image.alt || post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-brand-lilacDark/30">
                                                <span className="font-serif text-4xl">AB</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="text-xs font-bold text-brand-gold uppercase tracking-wider mb-2">
                                            {post.category?.name || 'Artigo'}
                                        </div>
                                        <h2 className="font-serif text-2xl text-brand-dark mb-3 leading-tight group-hover:text-brand-lilacDark transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="font-sans text-gray-500 line-clamp-3 text-sm mb-4">
                                            {post.excerpt || 'Leia mais sobre este assunto...'}
                                        </p>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {new Date(post.publishedDate).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                <p>Nenhum artigo encontrado no momento.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogIndex;
