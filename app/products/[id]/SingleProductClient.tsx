'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Box, ShieldCheck, Zap, Cog, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/types/products'
import WhatsAppButton from '@/components/products/WhatsAppButton'
import { getOptimizedAirtableImage, generateBlurDataURL } from '@/utils/image-optimizer'

export default function SingleProductClient({ product }: { product: Product }) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
            {/* Background Graphic Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] border border-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] border border-primary/10 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    {/* Navigation & Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="space-y-6">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 text-[10px] text-gray-500 hover:text-primary uppercase tracking-[0.4em] transition-colors group"
                            >
                                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                                Back to Catalog
                            </Link>
                            <div className="space-y-2">
                                <span className="text-[10px] text-primary font-mono tracking-[0.5em] uppercase">
                                    Technical Portfolio // {product.code}
                                </span>
                                <h1 className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tighter uppercase leading-[0.9]">
                                    {product.name.split(' ').map((word, i) => (
                                        <span key={i} className={i === 0 ? 'text-white' : 'text-primary'}>
                                            {word}{' '}
                                        </span>
                                    ))}
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-4">
                            <div className="px-4 py-2 border border-gray-900 bg-dark-light text-[10px] text-gray-400 font-mono tracking-widest uppercase">
                                Status: <span className="text-primary">Certified & Available</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                        {/* Column 1: Visuals & Highlights (7 cols) */}
                        <div className="lg:col-span-7 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative aspect-[16/10] overflow-hidden border border-gray-900 bg-dark-light group"
                            >
                                {product.images && product.images.length > 0 && product.images[0] ? (
                                    <Image
                                        src={getOptimizedAirtableImage(product.images[0])}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 70vw"
                                        className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                                        quality={90}
                                        priority
                                        placeholder="blur"
                                        blurDataURL={generateBlurDataURL()}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-dark-lighter">
                                        <span className="text-sm text-gray-700 uppercase tracking-widest font-mono">No Image Available</span>
                                    </div>
                                )}
                                {/* Visual Overlay - Scanner Effect */}
                                <div className="absolute inset-x-0 h-[2px] bg-primary/40 top-0 animate-[scan_4s_ease-in-out_infinite] pointer-events-none" />
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {product.keySpecs.map((spec, i) => (
                                    <div key={i} className="p-6 border border-gray-900 bg-dark-light/30 backdrop-blur-sm space-y-3">
                                        <Zap className="w-5 h-5 text-primary" />
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Key Param {i + 1}</p>
                                        <p className="text-sm text-white font-medium">{spec}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xs text-primary uppercase tracking-[0.4em] font-mono">Overview</h3>
                                    <div className="h-px flex-grow bg-gray-900" />
                                </div>
                                <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
                                    {product.shortDescription}
                                </p>
                            </div>
                        </div>

                        {/* Column 2: Data & Actions (5 cols) */}
                        <div className="lg:col-span-5 space-y-12">
                            <section className="p-8 md:p-10 border border-gray-900 bg-dark-light relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Cog className="w-32 h-32 animate-spin-slow" />
                                </div>

                                <h3 className="text-[10px] text-gray-500 uppercase tracking-[0.4em] mb-10 font-mono flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                    Technical Datasheet
                                </h3>

                                <div className="space-y-6">
                                    {Object.entries(product.fullSpecs).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-baseline border-b border-gray-800/50 pb-4 group">
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors">{key}</span>
                                            <span className="text-sm md:text-base text-white font-mono">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-12 pt-12 border-t border-gray-800 space-y-6">
                                    <WhatsAppButton
                                        productName={product.name}
                                        productCode={product.code}
                                        className="w-full !py-6 text-sm"
                                    />
                                    <p className="text-[10px] text-center text-gray-600 uppercase tracking-widest">
                                        Average Technical Response: &lt; 2 Hours
                                    </p>
                                </div>
                            </section>

                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xs text-primary uppercase tracking-[0.4em] font-mono">Installation</h3>
                                    <div className="h-px flex-grow bg-gray-900" />
                                </div>
                                <div className="p-8 border-l-2 border-primary/30 bg-primary/5">
                                    <p className="text-sm text-gray-400 leading-relaxed italic">
                                        "{product.installationReqs}"
                                    </p>
                                </div>
                            </section>

                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xs text-primary uppercase tracking-[0.4em] font-mono">Applications</h3>
                                    <div className="h-px flex-grow bg-gray-900" />
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.applications.map((app, i) => (
                                        <span key={i} className="px-5 py-2 border border-gray-800 text-[10px] text-gray-400 uppercase tracking-widest hover:border-primary hover:text-white transition-colors">
                                            {app}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>

                    </div>
                </div>
            </main>

            {/* CSS for scan animation */}
            <style jsx global>{`
        @keyframes scan {
          0%, 100% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
        </div>
    )
}
