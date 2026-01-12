'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Box, ShieldCheck, Zap, Cog, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { Product } from '@/types/products'
import WhatsAppButton from '@/components/products/WhatsAppButton'
import { getOptimizedAirtableImage, generateBlurDataURL } from '@/utils/image-optimizer'
import { 
  staggerContainer, 
  badgeVariants, 
  heroVariants, 
  fadeInUp, 
  lineReveal,
  slideInLeft,
  slideInRight,
  scaleIn,
  pageDelays,
  viewportOptions 
} from '@/utils/animations'

export default function SingleProductClient({ product }: { product: Product }) {
    const delays = pageDelays.product

    return (
        <div className="min-h-screen bg-light dark:bg-dark text-light-text dark:text-dark-text-primary selection:bg-primary/20 selection:text-light-text dark:selection:text-dark-text-primary">
            {/* Background Graphic Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] border border-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] border border-primary/10 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-20">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto"
                >
                    {/* Navigation & Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <motion.div 
                            variants={slideInLeft}
                            transition={{ delay: delays.badge }}
                            className="space-y-6"
                        >
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 text-[10px] text-light-text-muted dark:text-gray-500 hover:text-primary uppercase tracking-[0.4em] transition-colors group"
                            >
                                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                                Back to Catalog
                            </Link>
                            <div className="space-y-2">
                                <motion.span 
                                    variants={badgeVariants}
                                    transition={{ delay: delays.badge + 0.1 }}
                                    className="text-[10px] text-primary font-mono tracking-[0.5em] uppercase block"
                                >
                                    Technical Portfolio // {product.code}
                                </motion.span>
                                <motion.h1 
                                    variants={heroVariants}
                                    transition={{ delay: delays.title }}
                                    className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tighter uppercase leading-[0.9]"
                                >
                                    {product.name.split(' ').map((word, i) => (
                                        <motion.span 
                                            key={i}
                                            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                                            animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                                            transition={{ delay: delays.title + (i * 0.1), duration: 1.1 }}
                                            className={i === 0 ? 'text-light-text dark:text-dark-text-primary' : 'text-primary'}
                                        >
                                            {word}{' '}
                                        </motion.span>
                                    ))}
                                </motion.h1>
                            </div>
                        </motion.div>

                        <motion.div 
                            variants={slideInRight}
                            transition={{ delay: delays.badge + 0.2 }}
                            className="flex flex-col items-start md:items-end gap-4"
                        >
                            <div className="px-4 py-2 border border-light-border dark:border-dark-border bg-light-lighter dark:bg-dark-light text-[10px] text-light-text-muted dark:text-dark-text-muted font-mono tracking-widest uppercase">
                                Status: <span className="text-primary">{product.availabilityStatus || 'Certified & Available'}</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Layout Grid - 3D TILT EFFECT */}
                    <div 
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
                        style={{ perspective: '1200px' }}
                    >

                        {/* Column 1: Visuals & Highlights (7 cols) - 3D Tilt from Left */}
                        <motion.div 
                            initial={{ 
                                opacity: 0, 
                                rotateX: 25,
                                rotateY: -15,
                                z: -100,
                            }}
                            whileInView={{ 
                                opacity: 1, 
                                rotateX: 0,
                                rotateY: 0,
                                z: 0,
                            }}
                            viewport={viewportOptions}
                            transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            className="lg:col-span-7 space-y-12"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                                viewport={viewportOptions}
                                transition={{ duration: 0.9, delay: 0.3 }}
                                className="relative aspect-[16/10] overflow-hidden border border-light-border dark:border-dark-border bg-light-lighter dark:bg-dark-light group"
                            >
                                {product.images && product.images.length > 0 && product.images[0] ? (
                                    <Image
                                        src={getOptimizedAirtableImage(product.images[0])}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 70vw"
                                        className="object-cover transition-all duration-1000 group-hover:scale-105"
                                        quality={90}
                                        priority
                                        placeholder="blur"
                                        blurDataURL={generateBlurDataURL()}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-light-lighter dark:bg-dark-lighter">
                                        <div className="text-center space-y-4">
                                            <Box className="w-16 h-16 text-primary/30 mx-auto" />
                                            <span className="block text-sm text-light-text-subtle dark:text-gray-700 uppercase tracking-widest font-mono">No Image Available</span>
                                        </div>
                                    </div>
                                )}
                                {/* Visual Overlay - Scanner Effect */}
                                <div className="absolute inset-x-0 h-[2px] bg-primary/40 top-0 animate-[scan_4s_ease-in-out_infinite] pointer-events-none z-10" />
                            </motion.div>

                            <motion.div 
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            >
                                {product.keySpecs.map((spec, i) => (
                                    <motion.div 
                                        key={i} 
                                        variants={fadeInUp}
                                        transition={{ delay: delays.content + 0.2 + (i * 0.05) }}
                                        className="p-6 border border-light-border dark:border-dark-border bg-light-lighter/30 dark:bg-dark-light/30 backdrop-blur-sm space-y-3"
                                    >
                                        <Zap className="w-5 h-5 text-primary" />
                                        <p className="text-[10px] text-light-text-muted dark:text-gray-500 uppercase tracking-widest">Key Param {i + 1}</p>
                                        <p className="text-sm text-light-text dark:text-dark-text-primary font-medium">{spec}</p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div 
                                variants={fadeInUp}
                                transition={{ delay: delays.content + 0.4 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xs text-primary uppercase tracking-[0.4em] font-mono">Overview</h3>
                                    <motion.div 
                                        variants={lineReveal}
                                        className="h-px flex-grow bg-light-border dark:bg-gray-900" 
                                    />
                                </div>
                                <p className="text-xl md:text-2xl font-light text-light-text-muted dark:text-gray-300 leading-relaxed">
                                    {product.shortDescription}
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Column 2: Data & Actions (5 cols) - 3D Tilt from Right */}
                        <motion.div 
                            initial={{ 
                                opacity: 0, 
                                rotateX: -25,
                                rotateY: 15,
                                z: -100,
                            }}
                            whileInView={{ 
                                opacity: 1, 
                                rotateX: 0,
                                rotateY: 0,
                                z: 0,
                            }}
                            viewport={viewportOptions}
                            transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                            className="lg:col-span-5 space-y-12"
                        >
                            <motion.section 
                                initial={{ opacity: 0, y: 30, rotateZ: -2 }}
                                whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
                                viewport={viewportOptions}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="p-8 md:p-10 border border-light-border dark:border-dark-border bg-light-lighter dark:bg-dark-light relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Cog className="w-32 h-32 animate-spin-slow" />
                                </div>

                                <motion.h3 
                                    variants={badgeVariants}
                                    className="text-[10px] text-light-text-muted dark:text-gray-500 uppercase tracking-[0.4em] mb-10 font-mono flex items-center gap-2"
                                >
                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                    Technical Datasheet
                                </motion.h3>

                                <motion.div 
                                    initial="hidden"
                                    animate="visible"
                                    variants={staggerContainer}
                                    className="space-y-6"
                                >
                                    {Object.entries(product.fullSpecs).map(([key, value], i) => (
                                        <motion.div 
                                            key={key} 
                                            variants={fadeInUp}
                                            transition={{ delay: delays.content + 0.3 + (i * 0.02) }}
                                            className="flex justify-between items-baseline border-b border-light-border dark:border-dark-border/50 pb-4 group"
                                        >
                                            <span className="text-[10px] text-light-text-muted dark:text-gray-500 uppercase tracking-widest group-hover:text-light-text dark:group-hover:text-gray-300 transition-colors">{key}</span>
                                            <span className="text-sm md:text-base text-light-text dark:text-dark-text-primary font-mono">{value}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <motion.div 
                                    variants={fadeInUp}
                                    transition={{ delay: delays.content + 0.5 }}
                                    className="mt-12 pt-12 border-t border-light-border dark:border-dark-border space-y-6"
                                >
                                    <WhatsAppButton
                                        productName={product.name}
                                        productCode={product.code}
                                        className="w-full !py-6 text-sm"
                                    />
                                    <p className="text-[10px] text-center text-light-text-subtle dark:text-gray-600 uppercase tracking-widest">
                                        Average Technical Response: &lt; 2 Hours
                                    </p>
                                </motion.div>
                            </motion.section>

                            <motion.section 
                                variants={fadeInUp}
                                transition={{ delay: delays.content + 0.6 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xs text-primary uppercase tracking-[0.4em] font-mono">Installation</h3>
                                    <motion.div 
                                        variants={lineReveal}
                                        className="h-px flex-grow bg-light-border dark:bg-gray-900" 
                                    />
                                </div>
                                <div className="p-8 border-l-2 border-primary/30 bg-primary/5">
                                    <p className="text-sm text-light-text-muted dark:text-gray-400 leading-relaxed italic">
                                        "{product.installationReqs}"
                                    </p>
                                </div>
                            </motion.section>

                            <motion.section 
                                variants={fadeInUp}
                                transition={{ delay: delays.content + 0.7 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xs text-primary uppercase tracking-[0.4em] font-mono">Applications</h3>
                                    <motion.div 
                                        variants={lineReveal}
                                        className="h-px flex-grow bg-gray-900" 
                                    />
                                </div>
                                <motion.div 
                                    initial="hidden"
                                    animate="visible"
                                    variants={staggerContainer}
                                    className="flex flex-wrap gap-3"
                                >
                                    {product.applications.map((app, i) => (
                                        <motion.span 
                                            key={i} 
                                            variants={fadeInUp}
                                            transition={{ delay: delays.content + 0.8 + (i * 0.03) }}
                                            className="px-5 py-2 border border-light-border dark:border-dark-border text-[10px] text-light-text-muted dark:text-dark-text-muted uppercase tracking-widest hover:border-primary hover:text-primary dark:hover:text-primary transition-colors"
                                        >
                                            {app}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </motion.section>
                        </motion.div>

                    </div>
                </motion.div>
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
