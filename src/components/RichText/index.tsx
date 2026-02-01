import React, { Fragment } from 'react'
import escapeHTML from 'escape-html'

interface Props {
    content: any
}

const RichText: React.FC<Props> = ({ content }) => {
    if (!content) {
        return null
    }

    const serialize = (children: any[]): React.ReactNode[] =>
        children.map((node, i) => {
            if (!node) {
                return null
            }

            if (React.isValidElement(node)) {
                return <Fragment key={i}>{node}</Fragment>
            }

            if (node.text !== undefined) {
                let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />

                if (node.bold) {
                    text = <strong key={i}>{text}</strong>
                }

                if (node.code) {
                    text = <code key={i} className="bg-gray-100 rounded px-1">{text}</code>
                }

                if (node.italic) {
                    text = <em key={i}>{text}</em>
                }

                if (node.underline) {
                    text = (
                        <span style={{ textDecoration: 'underline' }} key={i}>
                            {text}
                        </span>
                    )
                }

                if (node.strikethrough) {
                    text = (
                        <span style={{ textDecoration: 'line-through' }} key={i}>
                            {text}
                        </span>
                    )
                }

                return <Fragment key={i}>{text}</Fragment>
            }

            switch (node.type) {
                case 'h1':
                    return (
                        <h1 key={i} className="font-serif text-4xl text-brand-dark mb-4 mt-8">
                            {serialize(node.children)}
                        </h1>
                    )
                case 'h2':
                    return (
                        <h2 key={i} className="font-serif text-3xl text-brand-dark mb-4 mt-8">
                            {serialize(node.children)}
                        </h2>
                    )
                case 'h3':
                    return (
                        <h3 key={i} className="font-serif text-2xl text-brand-dark mb-4 mt-6">
                            {serialize(node.children)}
                        </h3>
                    )
                case 'h4':
                    return (
                        <h4 key={i} className="font-serif text-xl text-brand-dark mb-4 mt-6">
                            {serialize(node.children)}
                        </h4>
                    )
                case 'blockquote':
                    return (
                        <blockquote key={i} className="border-l-4 border-brand-gold pl-4 italic text-gray-600 my-6">
                            {serialize(node.children)}
                        </blockquote>
                    )
                case 'ul':
                    return (
                        <ul key={i} className="list-disc list-inside mb-6 ml-4">
                            {serialize(node.children)}
                        </ul>
                    )
                case 'ol':
                    return (
                        <ol key={i} className="list-decimal list-inside mb-6 ml-4">
                            {serialize(node.children)}
                        </ol>
                    )
                case 'li':
                    return <li key={i} className="mb-2">{serialize(node.children)}</li>
                case 'link':
                    return (
                        <a
                            href={escapeHTML(node.url)}
                            key={i}
                            className="text-brand-lilacDark hover:text-brand-gold underline transition-colors"
                        >
                            {serialize(node.children)}
                        </a>
                    )
                case 'upload':
                    // Handle upload blocks (images mostly)
                    if (node.value?.url) {
                        return (
                            <figure key={i} className="my-8">
                                <img
                                    src={node.value.url}
                                    alt={node.value.alt || ''}
                                    className="rounded-xl w-full max-h-[600px] object-cover"
                                />
                                {node.value.caption && (
                                    <figcaption className="text-center text-sm text-gray-500 mt-2">
                                        {node.value.caption}
                                    </figcaption>
                                )}
                            </figure>
                        )
                    }
                    return null;

                default:
                    return <p key={i} className="mb-6 leading-relaxed">{serialize(node.children)}</p>
            }
        })

    return <div className="rich-text">{serialize(content)}</div>
}

export default RichText
