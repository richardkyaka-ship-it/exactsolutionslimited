import React from 'react'
import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-light text-white uppercase tracking-tight mb-2">
          Register <span className="text-primary">Equipment</span>
        </h1>
        <p className="text-sm text-gray-500 uppercase tracking-widest">Add a new unit to the industrial catalog</p>
      </div>

      <ProductForm />
    </div>
  )
}

