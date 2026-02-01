import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPosts, Post } from '@/lib/cms';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Blog: React.FC = () => {
    const { data: posts, isLoading } = useQuery({ queryKey: ['posts'], queryFn: getPosts });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-beige py-24 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-lilac"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-beige">
            <Helmet>
                <title>Blog - Instituto Ariana Borges</title>
                <meta name="description" content="Artigos sobre autoconhecimento, espiritualidade e terapias energéticas." />
            </Helmet>

            <section className="relative py-20 bg-brand-dark text-brand-beige">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl text-brand-gold mb-4">Blog & Artigos</h1>
                    <p className="font-sans text-lg text-gray-300 max-w-2xl mx-auto">
                        Mergulhe em conteúdos sobre expansão da consciência, cura e espiritualidade.
                    </p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-6">
                    {posts && posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post: Post) => (
                                <Link to={`/blog/${post.slug}`} key={post.id} className="group cursor-pointer">
                                    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-100 flex flex-col">
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={post.image?.url}
                                                alt={post.image?.alt || post.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-brand-dark/0 transition-colors"></div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col">
                                            {post.category && (
                                                <span className="text-xs font-bold text-brand-lilacDark uppercase tracking-wider mb-2">
                                                    {post.category.name}
                                                </span>
                                            )}

                                            <h2 className="font-serif text-2xl text-brand-dark mb-3 leading-tight group-hover:text-brand-lilacDark transition-colors">
                                                {post.title}
                                            </h2>

                                            <p className="font-sans text-gray-600 mb-6 line-clamp-3 flex-1">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center text-sm text-gray-400 mt-auto pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-1 mr-4">
                                                    <Calendar size={14} />
                                                    {new Date(post.publishedDate).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <User size={14} />
                                                    Instituto Ariana Borges
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="font-sans text-gray-500 text-lg">Nenhum post encontrado.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blog;
