import path from 'path'
import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { Users } from './collections/Users'
import { HeroSection } from './collections/HeroSection'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { Media } from './collections/Media'

// DEBUG LOGS - FORCE VISIBILITY
console.log('--- PAYLOAD CONFIG DEBUG ---')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('PAYLOAD_PUBLIC_SERVER_URL:', process.env.PAYLOAD_PUBLIC_SERVER_URL)
console.log('RAILWAY_SERVICE_ID:', process.env.RAILWAY_SERVICE_ID)
console.log('---------------------------')

export default buildConfig({
    serverURL: (process.env.NODE_ENV === 'production' || process.env.RAILWAY_SERVICE_ID || (process.env.PAYLOAD_PUBLIC_SERVER_URL || '').includes('railway.app'))
        ? 'https://mapc.com.br'
        : (process.env.PAYLOAD_PUBLIC_SERVER_URL || ''),
    admin: {
        user: Users.slug,
        bundler: webpackBundler(),
    },
    // CSRF protection: Allow the Netlify domain
    csrf: [
        'https://mapc.com.br',
        'https://www.mapc.com.br',
    ],
    collections: [
        Users,
        HeroSection,
        Services,
        Testimonials,
        Media,
    ],
    editor: slateEditor({}),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI || '',
        },
        push: true,
    }),
    cors: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:8080',
        'https://registrese.mapc.com.br',
        'https://mapc.com.br',
        'https://www.mapc.com.br',
    ],
})
