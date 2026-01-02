'use client'

import Link from 'next/link'

export default function HomeFooter() {
  return (
    <footer className="px-6 md:px-12 lg:px-20 py-12 md:py-16 bg-black border-t border-gray-900/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 md:gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-lg md:text-base font-light tracking-tighter text-white uppercase">
            EXACT<span className="font-normal text-primary">SOLUTIONS</span>
          </span>
          <span className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[0.3em] font-light mt-1">
            Limited
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <Link href="/" className="text-[10px] text-gray-500 uppercase tracking-widest hover:text-white transition-colors">Home</Link>
          <Link href="/contact" className="text-[10px] text-gray-500 uppercase tracking-widest hover:text-white transition-colors">Contact</Link>
          <Link href="/admin/login" className="text-[10px] text-gray-900 uppercase tracking-widest hover:text-gray-700 transition-colors">Admin</Link>
          <span className="text-[10px] text-gray-800 uppercase tracking-widest cursor-not-allowed">Privacy</span>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3 md:gap-2">
          <a href="mailto:expert@exactsolutions.co.ke" className="text-[11px] md:text-xs text-gray-400 hover:text-primary transition-colors font-mono tracking-wider break-all">expert@exactsolutions.co.ke</a>
          <a href="tel:+254720876787" className="text-sm md:text-xs text-white md:text-gray-400 hover:text-primary transition-colors font-mono tracking-wider">+254 720 876 787</a>
        </div>

        <p className="text-[9px] md:text-[10px] text-gray-600 uppercase tracking-widest pt-4 md:pt-0 border-t border-gray-900 md:border-none w-full md:w-auto">
          © 2024 Exact Solutions Limited
        </p>
      </div>
    </footer>
  )
}

