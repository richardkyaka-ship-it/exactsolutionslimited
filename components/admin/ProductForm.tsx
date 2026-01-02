'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, ArrowLeft, Upload, Trash2, Plus, Info, Settings, Image as ImageIcon, Database, ShieldCheck } from 'lucide-react'
import { Product } from '@/types/products'
import { useAdmin } from '@/components/admin/AdminProvider'
import { CATEGORIES } from '@/constants/categories'

interface ProductFormProps {
  initialData?: Product
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const { setIsLoading, showToast } = useAdmin()
  const [loading, setLoading] = useState(false)
  
  // Initialize formData with initialData, ensuring images array is properly set
  const [formData, setFormData] = useState<Partial<Product>>(() => {
    const defaultData = {
      name: '',
      code: '',
      category: 'generators' as const,
      shortDescription: '',
      keySpecs: ['', '', ''],
      fullSpecs: {},
      applications: [''],
      installationReqs: '',
      images: [] as string[],
      availabilityStatus: 'Certified & Available',
      active: true,
      featured: false,
    };
    
    if (initialData) {
      console.log('[ProductForm] Initializing with initialData:', {
        id: initialData.id,
        name: initialData.name,
        imagesCount: initialData.images?.length || 0,
        images: initialData.images,
      });
      
      return {
        ...defaultData,
        ...initialData,
        // Ensure images is always an array
        images: Array.isArray(initialData.images) ? initialData.images : [],
      };
    }
    
    return defaultData;
  })
  
  // Update formData when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      console.log('[ProductForm] initialData changed, updating formData:', {
        id: initialData.id,
        imagesCount: initialData.images?.length || 0,
        images: initialData.images,
      });
      setFormData(prev => ({
        ...prev,
        ...initialData,
        images: Array.isArray(initialData.images) ? initialData.images : [],
      }));
    }
  }, [initialData?.id, initialData?.images?.length]) // Only update if id or images count changes

  const [currentSpecKey, setCurrentSpecKey] = useState('')
  const [currentSpecValue, setCurrentSpecValue] = useState('')

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setIsLoading(true)

    try {
      const method = initialData ? 'PUT' : 'POST'
      
      // Ensure images array is always included (even if empty) when saving
      const payload = {
        ...formData,
        images: formData.images || [], // Ensure images is always an array
      };
      
      console.log('[ProductForm] Saving product:', {
        method,
        id: formData.id,
        name: formData.name,
        imagesCount: payload.images?.length || 0,
        images: payload.images,
      });
      
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        showToast(initialData ? 'Asset Specifications Revitalized' : 'New Asset Manifested in Registry', 'success')
        router.push('/admin/products')
        router.refresh()
      } else {
        // Get actual error message from response
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }))
        const errorMessage = errorData.error || `Error ${res.status}: ${res.statusText}`
        console.error('Product save error:', errorMessage, errorData)
        
        if (res.status === 401) {
          showToast('Authentication Failed - Please log in again', 'error')
          // Redirect to login after a short delay
          setTimeout(() => {
            window.location.href = '/admin/login'
          }, 2000)
        } else {
          showToast(`Error: ${errorMessage}`, 'error')
        }
      }
    } catch (error) {
      showToast('Transmission Interrupted', 'error')
      console.error('Error saving product:', error)
    } finally {
      setLoading(false)
      setIsLoading(false)
    }
  }

  const addSpec = () => {
    if (!currentSpecKey || !currentSpecValue) return
    setFormData({
      ...formData,
      fullSpecs: { ...formData.fullSpecs, [currentSpecKey]: currentSpecValue }
    })
    setCurrentSpecKey('')
    setCurrentSpecValue('')
  }

  const removeSpec = (key: string) => {
    const newSpecs = { ...formData.fullSpecs }
    delete newSpecs[key]
    setFormData({ ...formData, fullSpecs: newSpecs })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) {
      console.log('[handleImageUpload] No files selected')
      return
    }

    const file = files[0]
    console.log('[handleImageUpload] File selected:', {
      name: file.name,
      size: file.size,
      type: file.type,
    })
    
    if (file.size > 5 * 1024 * 1024) {
      showToast('Payload Exceeds 5MB Limit', 'error')
      return
    }

    // Check if we already have 3 images
    const currentImages = formData.images || []
    if (currentImages.length >= 3) {
      showToast('Maximum 3 images allowed', 'error')
      return
    }

    const formDataUpload = new FormData()
    formDataUpload.append('file', file)
    setIsLoading(true)

    try {
      console.log('[handleImageUpload] Uploading file to /api/admin/upload')
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataUpload,
      })
      
      console.log('[handleImageUpload] Upload response status:', res.status)
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }))
        console.error('[handleImageUpload] Upload failed:', errorData)
        showToast(`Upload Failed: ${errorData.error || res.statusText}`, 'error')
        return
      }
      
      const data = await res.json()
      console.log('[handleImageUpload] Upload response data:', data)
      
      if (data.success && data.url) {
        const newImages = [...currentImages, data.url]
        console.log('[handleImageUpload] Adding image to formData. New images:', newImages)
        setFormData(prev => ({
          ...prev,
          images: newImages
        }))
        showToast('Optical Data Ingested', 'success')
      } else {
        console.error('[handleImageUpload] Upload response missing success or url:', data)
        showToast('Upload Failed: Invalid response', 'error')
      }
    } catch (error: any) {
      console.error('[handleImageUpload] Upload error:', error)
      showToast(`Ingestion Failed: ${error.message || 'Unknown error'}`, 'error')
    } finally {
      setIsLoading(false)
      // Reset the input so the same file can be selected again
      e.target.value = ''
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-12 pb-24">
      {/* Top Bar */}
      <div className="flex items-center justify-between sticky top-0 z-20 bg-black/80 backdrop-blur-md py-4 border-b border-gray-900">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel & Exit
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-4 bg-primary text-white text-xs uppercase tracking-[0.3em] font-medium hover:bg-primary-dark transition-all duration-300 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Main Form Fields (8 cols) */}
        <div className="lg:col-span-8 space-y-12">

          {/* Section 1: Basic Info */}
          <section className="p-8 bg-dark-light border border-gray-900 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
              <Info className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-medium text-white uppercase tracking-widest">Step 1: Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g. 500kVA Diesel Generator"
                  className="w-full bg-black border border-gray-800 focus:border-primary px-4 py-4 text-white text-sm focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Product Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g. GEN-500kVA"
                  className="w-full bg-black border border-gray-800 focus:border-primary px-4 py-4 text-white text-sm focus:outline-none transition-all font-mono"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Short Description *</label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  required
                  rows={3}
                  placeholder="Summarize the product features in 2-3 sentences..."
                  className="w-full bg-black border border-gray-800 focus:border-primary px-4 py-4 text-white text-sm focus:outline-none transition-all resize-none"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Technical Specs */}
          <section className="p-8 bg-dark-light border border-gray-900 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
              <Database className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-medium text-white uppercase tracking-widest">Step 2: Technical Specifications</h2>
            </div>

            <div className="space-y-8">
              {/* Key Specs */}
              <div className="space-y-4">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-medium block">Key Highlights (3 Bullets)</label>
                {formData.keySpecs?.map((spec, i) => (
                  <input
                    key={i}
                    type="text"
                    value={spec}
                    onChange={(e) => {
                      const newSpecs = [...(formData.keySpecs || [])]
                      newSpecs[i] = e.target.value
                      setFormData({ ...formData, keySpecs: newSpecs })
                    }}
                    placeholder={`Spec Highlight ${i + 1}`}
                    className="w-full bg-black border border-gray-800 focus:border-primary px-4 py-3 text-white text-xs focus:outline-none transition-all"
                  />
                ))}
              </div>

              {/* Full Specs Builder */}
              <div className="space-y-4">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-medium block">Full Technical Datasheet</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="PARAMETER (e.g. Engine)"
                    value={currentSpecKey}
                    onChange={(e) => setCurrentSpecKey(e.target.value)}
                    className="bg-black border border-gray-800 px-4 py-3 text-[10px] text-white focus:border-primary focus:outline-none uppercase tracking-widest"
                  />
                  <input
                    type="text"
                    placeholder="VALUE (e.g. Cummins)"
                    value={currentSpecValue}
                    onChange={(e) => setCurrentSpecValue(e.target.value)}
                    className="bg-black border border-gray-800 px-4 py-3 text-[10px] text-white focus:border-primary focus:outline-none uppercase tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={addSpec}
                    className="bg-gray-900 border border-gray-800 text-gray-400 text-[10px] uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-3 h-3" /> Add Spec
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {Object.entries(formData.fullSpecs || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center bg-black border border-gray-900 p-4 group">
                      <div>
                        <span className="text-[9px] text-gray-600 uppercase tracking-widest block">{key}</span>
                        <span className="text-xs text-white font-mono">{value}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpec(key)}
                        className="text-gray-800 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Site & Applications */}
          <section className="p-8 bg-dark-light border border-gray-900 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-medium text-white uppercase tracking-widest">Step 3: Usage & Requirements</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Installation Requirements</label>
                <textarea
                  value={formData.installationReqs}
                  onChange={(e) => setFormData({ ...formData, installationReqs: e.target.value })}
                  rows={3}
                  placeholder="What is needed onsite for this product?"
                  className="w-full bg-black border border-gray-800 focus:border-primary px-4 py-4 text-white text-sm focus:outline-none transition-all resize-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right: Media & Status (4 cols) */}
        <div className="lg:col-span-4 space-y-12">

          {/* Media Section */}
          <section className="p-8 bg-dark-light border border-gray-900 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
              <ImageIcon className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-medium text-white uppercase tracking-widest">Product Media</h2>
            </div>

            <div className="space-y-6">
              {/* Debug info - remove in production */}
              {process.env.NODE_ENV === 'development' && (
                <div className="p-2 bg-gray-900 text-xs text-gray-500 font-mono">
                  Images count: {formData.images?.length || 0} | Images: {JSON.stringify(formData.images || [])}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                {formData.images && formData.images.length > 0 && formData.images.map((img, i) => (
                  <div key={i} className="relative aspect-square border border-gray-800 grayscale hover:grayscale-0 transition-all bg-dark-lighter overflow-hidden">
                    {img && img.trim() !== '' ? (
                      <>
                        <img src={img} alt={`Product image ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const newImgs = (formData.images || []).filter((_, index) => index !== i)
                            console.log('[ProductForm] Removing image at index', i, 'New images:', newImgs)
                            setFormData(prev => ({ ...prev, images: newImgs }))
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-black/80 text-red-500 hover:text-white transition-colors z-10"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[8px] text-gray-700">Invalid image URL</span>
                      </div>
                    )}
                  </div>
                ))}
                {(!formData.images || formData.images.length < 3) && (
                  <label className="aspect-square border-2 border-dashed border-gray-800 flex flex-col items-center justify-center cursor-pointer hover:border-primary/30 hover:bg-primary/5 transition-all group">
                    <Upload className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
                    <span className="text-[8px] text-gray-600 uppercase tracking-widest mt-2">Upload Image</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      disabled={loading}
                    />
                    {loading && (
                      <span className="text-[8px] text-primary mt-1">Uploading...</span>
                    )}
                  </label>
                )}
              </div>
              <p className="text-[9px] text-gray-600 uppercase tracking-widest text-center">
                Max 3 images (JPG/PNG). Recommended square ratio. Current: {formData.images?.length || 0}/3
              </p>
            </div>
          </section>

          {/* Publication Section */}
          <section className="p-8 bg-dark-light border border-gray-900 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h2 className="text-sm font-medium text-white uppercase tracking-widest">Publication Settings</h2>
            </div>

            <div className="space-y-6">
              {/* Category Dropdown - Prominent and Required */}
              <div className="space-y-3 p-6 bg-primary/5 border-2 border-primary/30 rounded-sm">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-primary uppercase tracking-widest font-bold block">
                    Equipment Category <span className="text-red-500">*</span>
                  </label>
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-[8px] uppercase tracking-widest font-mono border border-primary/40">
                    REQUIRED
                  </span>
                </div>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-black border-2 border-primary/50 focus:border-primary px-6 py-5 text-sm font-medium text-white focus:outline-none transition-all appearance-none uppercase tracking-widest hover:border-primary/80 focus:ring-2 focus:ring-primary/30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ED5728' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '3rem',
                  }}
                >
                  <option value="" disabled>-- SELECT CATEGORY --</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <p className="text-[9px] text-gray-500 uppercase tracking-wider">
                  Choose the service line this equipment belongs to
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-black border border-gray-800">
                <span className="text-xs text-white uppercase tracking-widest">Show on Website</span>
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-5 h-5 accent-primary"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black border border-gray-800">
                <span className="text-xs text-white uppercase tracking-widest">Feature on Home</span>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 accent-primary"
                />
              </div>
            </div>
          </section>

        </div>
      </div>
    </form>
  )
}

