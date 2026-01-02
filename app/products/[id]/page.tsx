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
            return { title: 'Product Not Found' }
        }

        const product = airtableToProduct(record)

        return {
            title: `${product.name} | Technical Specifications | Exact Solutions`,
            description: product.shortDescription,
        }
    } catch (error) {
        return { title: 'Product Not Found' }
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
