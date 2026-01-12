import { Metadata } from 'next'
import { getAirtableClient, airtableToProduct } from '@/lib/airtable'
import SingleProductClient from './SingleProductClient';
import { notFound } from 'next/navigation'

interface Props {
    params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const client = getAirtableClient()
        const record = await client.getProduct(params.id)
        
        if (!record || !record.fields) {
            return { 
                title: 'Product Not Found | Exact Solutions Limited',
                description: 'The requested product could not be found.',
            }
        }

        const product = airtableToProduct(record)
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://exactsolutions.co.ke'
        const productImage = product.images && product.images.length > 0 
            ? (typeof product.images[0] === 'string' ? product.images[0] : product.images[0])
            : '/og-image.jpg'

        return {
            title: `${product.name} | Exact Solutions Limited`,
            description: `${product.name} - ${product.shortDescription || 'Industrial equipment available in Kenya'}. Technical specifications and pricing.`,
            keywords: [
                product.name,
                product.category,
                'industrial equipment Kenya',
                'Nairobi',
                'East Africa'
            ].filter(Boolean).join(', '),
            openGraph: {
                title: `${product.name} | Exact Solutions Limited`,
                description: product.shortDescription || `${product.name} available in Kenya`,
                url: `/products/${params.id}`,
                siteName: 'Exact Solutions Limited',
                locale: 'en_KE',
                type: 'website',
                images: [
                    {
                        url: typeof productImage === 'string' ? productImage : productImage,
                        width: 1200,
                        height: 630,
                        alt: product.name,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: `${product.name} | Exact Solutions Limited`,
                description: product.shortDescription || `${product.name} available in Kenya`,
                images: [typeof productImage === 'string' ? productImage : productImage],
            },
            alternates: {
                canonical: `/products/${params.id}`,
            },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-image-preview': 'large',
                },
            },
        }
    } catch (error) {
        return { 
            title: 'Product Not Found | Exact Solutions Limited',
            description: 'The requested product could not be found.',
        }
    }
}

export default async function ProductPage({ params }: Props) {
    try {
        // Decode the ID in case it's URL encoded
        const productId = decodeURIComponent(params.id)
        console.log('Fetching product with ID:', productId)
        
        const client = getAirtableClient()
        const record = await client.getProduct(productId)
        
        if (!record || !record.fields) {
            console.log('Product not found, trying to fetch all products to find by code...')
            // Fallback: try to find by product code if ID lookup fails
            const allProducts = await client.getProducts({ status: 'Active', limit: 1000 })
            const found = allProducts.records.find(r => 
                r.id === productId || 
                r.fields['Product Code'] === productId ||
                r.fields['Product Code'] === params.id
            )
            
            if (found && found.fields) {
                const product = airtableToProduct(found)
                return <SingleProductClient product={product} />
            }
            
            console.log('Product not found by ID or code')
            notFound()
        }

        const product = airtableToProduct(record)
        return <SingleProductClient product={product} />
    } catch (error: any) {
        console.error('Error fetching product:', error.message, error)
        notFound()
    }
}
